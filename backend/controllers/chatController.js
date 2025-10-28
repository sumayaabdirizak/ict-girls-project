/**
 * @overview WebSocket Chat Controller
 * @description Handles business logic for WebSocket messages like fetching history and broadcasting new messages.
 * @last-modified 2025-10-26 - Improved error messaging in handleNewChatMessage.
 */

import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { broadcastMessage } from '../server.js';

/**
 * Handles the 'FETCH_HISTORY' message type from a client.
 */
export const handleFetchHistory = async (payload, ws) => {
    const { category_id } = payload;
    if (!category_id) {
        return ws.send(JSON.stringify({
            type: 'ERROR',
            payload: { message: 'Cannot fetch history: category_id is required.' }
        }));
    }

    try {
        const query = `
            SELECT m.id, m.content, m.category_id, m.created_at, u.id as author_id, u.full_name as author_name
            FROM messages m
            JOIN users u ON m.author_id = u.id
            WHERE m.category_id = ?
            ORDER BY m.created_at ASC
        `;
        const [messages] = await pool.execute(query, [category_id]);
        ws.send(JSON.stringify({ type: 'MESSAGE_HISTORY', payload: messages }));

    } catch (error) {
        console.error(`❌ Database error while fetching history for category ${category_id}:`, error);
        ws.send(JSON.stringify({
            type: 'ERROR',
            payload: { message: 'Failed to fetch history.' }
        }));
    }
};

/**
 * Handles the 'SEND_MESSAGE' message type from a client.
 */
export const handleNewChatMessage = async (payload, ws) => {
    const { token, content, category_id } = payload;

    // --- THIS IS THE UPDATE ---
    // Instead of one generic check, we now check each property individually
    // and send a specific error message back to the frontend.
    if (!token) {
        return ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'Message rejected: Authentication token is missing.' } }));
    }
    if (!content) {
        return ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'Message rejected: Content is empty.' } }));
    }
    if (!category_id) {
        return ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'Message rejected: Channel ID is missing.' } }));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const author_id = decoded.userId;

        if (!author_id) {
            return ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'Invalid token: User ID not found.' } }));
        }

        const [result] = await pool.execute(
            'INSERT INTO messages (author_id, content, category_id) VALUES (?, ?, ?)',
            [author_id, content, category_id]
        );

        const newMessageQuery = `
            SELECT 
                m.id, m.content, m.category_id, m.created_at,
                u.id as author_id, u.full_name as author_name
            FROM messages m
            JOIN users u ON m.author_id = u.id
            WHERE m.id = ?
        `;
        const [newMessages] = await pool.execute(newMessageQuery, [result.insertId]);
        const newMessage = newMessages[0];
        
        if (newMessage) {
            broadcastMessage({
                type: 'NEW_MESSAGE',
                payload: newMessage
            });
        }

    } catch (error) {
        console.error('❌ Error handling new chat message:', error);
        ws.send(JSON.stringify({
            type: 'ERROR',
            payload: { message: 'Failed to send message. The token might be invalid or expired.' }
        }));
    }
};