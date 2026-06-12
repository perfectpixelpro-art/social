import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

let driveClient = null;

function getDrive() {
  if (driveClient) return driveClient;
  const keyPath = path.resolve(process.env.GOOGLE_SERVICE_ACCOUNT_PATH || "./config/google-service-account.json");
  if (!fs.existsSync(keyPath)) {
    throw new Error(`Google service account file not found at ${keyPath}`);
  }
  const credentials = JSON.parse(fs.readFileSync(keyPath, "utf-8"));
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  driveClient = google.drive({ version: "v3", auth });
  return driveClient;
}

// Find a folder by name under a parent, or create it. Returns the folder id.
async function ensureFolder(name, parentId) {
  const drive = getDrive();
  const safeName = name.replace(/'/g, "\\'");
  const q = `mimeType='application/vnd.google-apps.folder' and name='${safeName}' and '${parentId}' in parents and trashed=false`;
  const list = await drive.files.list({
    q, fields: "files(id,name)", spaces: "drive",
    supportsAllDrives: true, includeItemsFromAllDrives: true,
  });
  if (list.data.files && list.data.files.length) return list.data.files[0].id;

  const created = await drive.files.create({
    requestBody: { name, mimeType: "application/vnd.google-apps.folder", parents: [parentId] },
    fields: "id",
    supportsAllDrives: true,
  });
  return created.data.id;
}

// Create the full folder structure for a client. Returns all folder ids.
export async function createClientFolders(clientId, businessName) {
  const root = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
  if (!root) throw new Error("GOOGLE_DRIVE_ROOT_FOLDER_ID is not set");

  // Verify the service account can actually reach the root folder
  try {
    await getDrive().files.get({ fileId: root, fields: "id", supportsAllDrives: true });
  } catch {
    throw new Error(
      "Google Drive root folder is not accessible. Share the folder with the service account email (Editor)."
    );
  }

  // The configured root folder is already the "TheSocial99_Clients" container,
  // so create each client's folder directly inside it.
  const safeBiz = (businessName || "Client").replace(/[\\/]/g, "-");
  const clientFolder = await ensureFolder(`${clientId}_${safeBiz}`, root);

  const [logos, brandGuide, productImages, other] = await Promise.all([
    ensureFolder("Logos", clientFolder),
    ensureFolder("Brand_Guide", clientFolder),
    ensureFolder("Product_Images", clientFolder),
    ensureFolder("Other", clientFolder),
  ]);

  return { root: clientFolder, logos, brandGuide, productImages, other };
}

// Upload a file buffer to a folder. Returns drive metadata.
export async function uploadToFolder(folderId, { buffer, originalname, mimetype }) {
  const drive = getDrive();
  const created = await drive.files.create({
    requestBody: { name: originalname, parents: [folderId] },
    media: { mimeType: mimetype, body: Readable.from(buffer) },
    fields: "id,name,webViewLink,webContentLink,mimeType,createdTime",
    supportsAllDrives: true,
  });

  // make it viewable via the link
  try {
    await drive.permissions.create({
      fileId: created.data.id,
      requestBody: { role: "reader", type: "anyone" },
      supportsAllDrives: true,
    });
  } catch { /* ignore if already shared */ }

  return created.data;
}

// Map a folderType to the matching folder id from a user's saved folders
export function folderIdForType(driveFolders, folderType) {
  const map = {
    logo: driveFolders.logos,
    brand: driveFolders.brandGuide,
    product: driveFolders.productImages,
    other: driveFolders.other,
  };
  return map[folderType] || driveFolders.other;
}
