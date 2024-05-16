const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./src/config/db');
const Message = require('./src/model/Message');
const authRoutes = require('./src/routes/authRoutes');
const chatRoutes = require('./src/routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('sendMessage', async (data) => {
    try {
      const { sender, content } = data;

      // Create a new message
      const newMessage = new Message({ sender, content });
      await newMessage.save();

      // Broadcast the new message to all connected clients
      io.emit('message', newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
