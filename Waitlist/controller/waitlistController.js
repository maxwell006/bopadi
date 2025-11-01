const Waitlist = require("../models/WaitList");
const { sendWelcomeEmail, sendBroadcastEmail } = require("../utils/mailer");

exports.joinWaitlist = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res
      .status(400)
      .json({ message: "Name, email, and phone are required" });

  try {
    const existing = await Waitlist.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Already joined the waitlist" });

    const newEntry = await Waitlist.create({ name, email, phone });
    await sendWelcomeEmail(name, email);

    res.status(200).json({ message: "Joined successfully", user: newEntry });
  } catch (error) {
    console.error("❌ Error joining waitlist:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllWaitlist = async (req, res) => {
  try {
    const users = await Waitlist.find().sort({ dateJoined: -1 });
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    console.error("❌ Error fetching waitlist:", error);
    res.status(500).json({ message: "Failed to fetch waitlist", error });
  }
};

exports.broadcastMessage = async (req, res) => {
  const { subject, message } = req.body;
  if (!subject || !message)
    return res.status(400).json({ message: "Subject and message required" });

  try {
    const users = await Waitlist.find();
    await sendBroadcastEmail(subject, message, users);
    res.status(200).json({ message: "Broadcast sent successfully" });
  } catch (error) {
    console.error("❌ Broadcast error:", error);
    res.status(500).json({ message: "Failed to send broadcast", error });
  }
};
