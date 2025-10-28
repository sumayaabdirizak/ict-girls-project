/**
 * @overview Authentication Middleware
 * @description This file contains middleware for verifying JSON Web Tokens (JWT) to protect API routes.
 */

import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate a user by verifying their JWT.
 * It expects the token to be in the 'Authorization' header in the format: "Bearer [token]".
 */
// THIS IS THE FIX: Using "export const" makes it a named export.
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        // No token provided
        return res.status(401).json({ error: 'Authentication required: No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Token is invalid or expired
            return res.status(403).json({ error: 'Authentication failed: Invalid or expired token.' });
        }
        
        // Token is valid, attach user payload to the request object
        req.user = user;
        
        // Proceed to the next middleware or route handler
        next();
    });
};