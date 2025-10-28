// backend/controllers/contactController.js
import ContactMessage from "../models/ContactMessage.js";

/**
 * POST /api/contact
 * Public: create a contact message
 */
export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: "Please provide name, email and message" });

    const contact = new ContactMessage({ name, email, message });
    await contact.save();
    return res.status(201).json({ message: "Message received" });
  } catch (err) {
    console.error("createContact error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/contact
 * Protected: admin
 */
export const getContacts = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.json(messages);
  } catch (err) {
    console.error("getContacts error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/contact/:id
 * Protected: admin
 */
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await ContactMessage.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: "Message not found" });
    return res.json({ message: "Message deleted" });
  } catch (err) {
    console.error("deleteContact error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
