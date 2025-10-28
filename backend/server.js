/**
 * @overview Main Server File
 * @description This file initializes the Express server, the WebSocket server, and connects all the routes and middleware.
 *
 * @author sumayaabdirizak
 * @created 2025-10-26
 * @last-modified 2025-10-26
 */

import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';

// --- Route Imports ---
import userRoutes from './routes/userRoutes.js';
// import postRoutes from './routes/postRoutes.js'; // <-- REMOVED
import categoryRoutes from './routes/categoryRoutes.js';
import adminRoutes from './routes/admin.js';
import blogRoutes from './routes/blogRoutes.js';

// --- Middleware & Controller Imports ---
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { handleNewChatMessage, handleFetchHistory } from './controllers/chatController.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// --- Core Middleware ---
app.use(cors());
app.use(express.json());

// --- REST API Route Definitions ---
app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes); // <-- REMOVED
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/posts', blogRoutes);
// --- Custom Error Handling Middleware ---
app.use(notFound);
app.use(errorHandler);

// --- HTTP and WebSocket Server Setup ---
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const clients = new Set();

// --- WebSocket Connection Logic ---
wss.on('connection', (ws) => {
  console.log('✅ WebSocket client connected');
  clients.add(ws);

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'FETCH_HISTORY':
        handleFetchHistory(data.payload, ws);
        break;
      case 'SEND_MESSAGE':
        handleNewChatMessage(data.payload, ws);
        break;
      default:
        console.warn(`⚠️ Received unknown WebSocket message type: ${data.type}`);
    }
  });

  ws.on('close', () => {
    console.log('❌ WebSocket client disconnected');
    clients.delete(ws);
  });
});

/**
 * Broadcasts a message object to all currently connected WebSocket clients.
 * @param {object} message - The message object to be sent.
 */
export const broadcastMessage = (message) => {
  const data = JSON.stringify(message);
  for (const client of clients) {
    if (client.readyState === client.OPEN) {
      client.send(data);
    }
  }
};

const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔌 WebSocket server is ready`);
});