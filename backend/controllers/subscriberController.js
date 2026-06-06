import Subscriber from "../models/Subscriber.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: "Email is required." });

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({ success: true, message: "You're already subscribed!", data: existing });
    }

    const subscriber = await Subscriber.create({ email });
    res.status(201).json({ success: true, message: "Subscribed successfully!", data: subscriber });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
