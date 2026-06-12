import User from "../models/user.model.js";
import FileModel from "../models/file.model.js";
import { createClientFolders, uploadToFolder, folderIdForType } from "../utils/googleDrive.js";

// Make sure a client has their Drive folders; create + save them if missing.
export const ensureClientFolders = async (user) => {
  if (user.driveFolders && user.driveFolders.root) return user.driveFolders;
  const businessName = user.company || user.name || "Client";
  const folders = await createClientFolders(user._id.toString(), businessName);
  user.driveFolders = folders;
  await user.save();
  return folders;
};

// Shared: upload a file into a given client's Drive folder
const doUpload = async ({ clientUserId, file, folderType, uploadedBy }) => {
  const type = ["logo", "brand", "product", "other"].includes(folderType) ? folderType : "other";
  const user = await User.findById(clientUserId);
  if (!user) throw new Error("Client not found");

  const folders = await ensureClientFolders(user);
  const targetFolder = folderIdForType(folders, type);
  const driveFile = await uploadToFolder(targetFolder, file);

  return FileModel.create({
    client: user._id,
    fileId: driveFile.id,
    fileName: driveFile.name,
    folderType: type,
    webViewLink: driveFile.webViewLink || driveFile.webContentLink || "",
    mimeType: driveFile.mimeType || file.mimetype,
    uploadedBy,
  });
};

// CLIENT: upload to their own folder
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: "No file uploaded" });
    const record = await doUpload({
      clientUserId: req.user.id,
      file: req.file,
      folderType: req.body.folderType,
      uploadedBy: "client",
    });
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// STAFF: upload to a specific client's folder (manager only for their clients)
export const uploadFileForClient = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: "No file uploaded" });
    if (req.user.role === "manager") {
      const c = await User.findById(req.params.clientId).select("assignedManager");
      if (!c || String(c.assignedManager) !== String(req.user.id)) {
        return res.status(403).json({ success: false, error: "Not your client" });
      }
    }
    const record = await doUpload({
      clientUserId: req.params.clientId,
      file: req.file,
      folderType: req.body.folderType,
      uploadedBy: "admin",
    });
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// CLIENT: list only my files
export const getMyFiles = async (req, res) => {
  try {
    const files = await FileModel.find({ client: req.user.id }).sort({ uploadedAt: -1 });
    res.json({ success: true, data: files });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// STAFF: list files — admin sees all; manager sees only their clients' files
export const getAllFiles = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === "manager") {
      const myClients = await User.find({ role: "client", assignedManager: req.user.id }).select("_id");
      filter = { client: { $in: myClients.map((c) => c._id) } };
    }
    const files = await FileModel.find(filter)
      .sort({ uploadedAt: -1 })
      .populate("client", "name email company");
    res.json({ success: true, data: files });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
