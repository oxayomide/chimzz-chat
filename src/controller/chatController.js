// controllers/chatController.js

const Message = require('../models/Message');

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('sender', 'username');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

const sendMessage = async (req, res) => {
  const { sender, content } = req.body;

  try {
    // Create a new message
    const newMessage = new Message({ sender, content });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message' });
  }
};

module.exports = {
  getAllMessages,
  sendMessage,
};
