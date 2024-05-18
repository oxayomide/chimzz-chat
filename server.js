require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./src/config/datab'); // Adjust the path if necessary
const Message = require('./src/model/Message'); // Ensure you have defined Sequelize models
const User = require('./src/model/User'); // Assuming you have a User model
const authRoutes = require('./src/routes/authRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://127.0.0.1:5500', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

// Enable CORS for all origins
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to Postgres with Sequelize
connectDB()

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

const users = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      socket.broadcast.emit('userDisconnected', user);
      delete users[socket.id];
    }
    console.log('User disconnected');
  });

  socket.on('join', (user) => {
    users[socket.id] = user;
    socket.broadcast.emit('userConnected', user);
    console.log(`${user.username} joined`);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping');
  });

  socket.on('sendMessage', async (data) => {
    try {
      const { username, content } = data;

      // Emit the message to all connected clients
      io.emit('message', { username, content });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
