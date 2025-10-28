/**
 * @overview Custom Error Handling Middleware
 * @description This file contains middleware for handling 404 Not Found errors and other general server errors.
 *
 * @author sumayaabdirizak
 * @created 2025-10-26
 */

/**
 * 404 Not Found Handler
 * This middleware is triggered when a request is made to a route that does not exist.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
export const notFound = (req, res, next) => {
    // Create a new error object for the non-existent route.
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404); // Set the HTTP status to 404 Not Found.
    next(error); // Pass the error to the next error handler in the stack.
};

/**
 * General Error Handler
 * This middleware catches all errors that occur in the application.
 * It ensures that a clean, JSON-formatted error message is sent to the client.
 * @param {Error} err - The error object.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
export const errorHandler = (err, req, res, next) => {
    // Sometimes an error might come through with a 200 OK status code.
    // If so, we default to a 500 Internal Server Error.
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Send a structured JSON response with the error details.
    // In a production environment, you might want to hide the `stack` trace.
    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};