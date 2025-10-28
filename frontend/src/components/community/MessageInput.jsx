/**
 * @overview MessageInput Component
 * @description This component renders a form with a single text input for users to type and send chat messages.
 * It is a "controlled component," meaning its internal state is managed by React.
 *
 * @author sumayaabdirizak
 * @created 2025-10-26
 */

import React, { useState } from 'react';

/**
 * A controlled input component for sending messages.
 * @param {object} props - The component's props.
 * @param {function(string): void} props.onSendMessage - A callback function that is invoked with the message text when the user submits the form.
 */
const MessageInput = ({ onSendMessage }) => {
  // `useState` hook to manage the text inside the input field.
  // The `text` variable holds the current value, and `setText` is the function to update it.
  const [text, setText] = useState('');

  /**
   * Handles the form submission event.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = (e) => {
    // Prevent the default browser behavior of reloading the page on form submission.
    e.preventDefault();

    // Check if the input text is not just empty spaces before sending.
    if (text.trim()) {
      // Call the `onSendMessage` function passed down from the parent component,
      // sending the current text value as the message.
      onSendMessage(text);

      // Reset the input field to be empty after the message has been sent.
      setText('');
    }
  };

  return (
    // A container div for styling and layout.
    <div className="p-4 bg-white border-t border-gray-200">
      {/* The form element that triggers the `handleSubmit` function on submission. */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          // The value of the input is directly controlled by the `text` state variable.
          value={text}
          // The `onChange` event fires on every keystroke, updating the `text` state.
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jazeera-gold"
          autoComplete="off" // Good practice for chat inputs to prevent suggestions.
        />
      </form>
    </div>
  );
};

export default MessageInput;