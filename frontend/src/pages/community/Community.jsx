/**
 * @overview Community Chat Page
 * @description This component manages the main chat interface, including channel list, messages, and WebSocket communication.
 */

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useWebSocket } from '../../hooks/useWebSocket';

// Import child components
import CommunitySidebar from '../../components/community/CommunitySidebar';
import ChannelHeader from '../../components/community/ChannelHeader';
import MessageList from '../../components/community/MessageList';
import MessageInput from '../../components/community/MessageInput';

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

const Community = () => {
  const { user, isAuthenticated, getWebSocketUrl } = useAuth();
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [webSocketMessages, setWebSocketMessages] = useState([]);
  
  const messagesEndRef = useRef(null);
  const previousChannelRef = useRef(null);

  // Get authenticated WebSocket URL
  const webSocketUrl = getWebSocketUrl();
  
  // Use your custom WebSocket hook
  const { messages: rawMessages, sendMessage, isConnected, clearMessages } = useWebSocket(webSocketUrl);

  // Process WebSocket messages
  useEffect(() => {
    if (rawMessages.length > 0) {
      const latestMessage = rawMessages[rawMessages.length - 1];
      console.log('📨 Processing WebSocket message:', latestMessage);

      switch (latestMessage.type) {
        case 'MESSAGE_HISTORY':
          setWebSocketMessages(latestMessage.payload || []);
          setLoading(false);
          break;
        case 'NEW_MESSAGE':
          if (latestMessage.payload?.category_id === activeChannel?.id) {
            setWebSocketMessages(prev => [...prev, latestMessage.payload]);
          }
          break;
        case 'ERROR':
          console.error('WebSocket Error:', latestMessage.payload?.message);
          if (latestMessage.payload?.message?.includes('authentication') || latestMessage.payload?.message?.includes('token')) {
            console.error('Authentication error - consider logging out');
          }
          break;
        default:
          console.log('Unknown message type:', latestMessage.type);
      }
    }
  }, [rawMessages, activeChannel]);

  // Fetch channels on component mount
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setChannels(response.data);
        if (response.data.length > 0 && !activeChannel) {
          setActiveChannel(response.data[0]);
        }
      } catch (error) { 
        console.error("Failed to fetch channels:", error); 
      } finally {
        setLoading(false);
      }
    };
    
    if (isAuthenticated()) {
      fetchChannels();
    }
  }, [isAuthenticated]);

  // Fetch message history when active channel changes
  useEffect(() => {
    if (activeChannel && isConnected) {
      setLoading(true);
      
      // Clear messages when switching channels
      if (previousChannelRef.current !== activeChannel.id) {
        setWebSocketMessages([]);
        previousChannelRef.current = activeChannel.id;
      }

      const message = {
        type: 'FETCH_HISTORY',
        payload: { 
          category_id: activeChannel.id
        }
      };
      console.log('📤 Requesting message history for channel:', activeChannel.id);
      sendMessage(message);
    }
  }, [activeChannel, isConnected, sendMessage]);

  const handleSendMessage = (messageText) => {
    if (!isConnected) {
      alert("Connection is not open. Please wait...");
      return;
    }

    if (!messageText.trim()) {
      alert("Message cannot be empty");
      return;
    }

    const message = {
      type: 'SEND_MESSAGE',
      payload: {
        content: messageText.trim(),
        category_id: activeChannel?.id 
      }
    };
    console.log('📦 Sending message to server:', message.payload);
    const success = sendMessage(message);
    
    if (!success) {
      alert('Failed to send message. Please check your connection.');
    }
  };
  
  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [webSocketMessages]);

  // Show connection status
  const getConnectionStatusText = () => {
    if (!isAuthenticated()) return '🔐 Please log in';
    if (!isConnected) return '🔴 Connecting...';
    return '🟢 Connected';
  };

  if (!isAuthenticated()) {
    return (
      <div className="pt-16 flex items-center justify-center h-screen bg-primary-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
          <p>Please log in to access the community chat.</p>
        </div>
      </div>
    );
  }

  if (loading && !activeChannel) {
    return (
      <div className="pt-16 flex items-center justify-center h-screen bg-primary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading Community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-primary-50">
      <div className="flex h-[calc(100vh-4rem)] font-sans">
        <CommunitySidebar
          channels={channels}
          activeChannel={activeChannel}
          onChannelChange={setActiveChannel}
          connectionStatus={getConnectionStatusText()}
        />
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <ChannelHeader 
            channel={activeChannel} 
            connectionStatus={getConnectionStatusText()}
          />
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
                Loading messages...
              </div>
            ) : (
              <MessageList messages={webSocketMessages} />
            )}
            <div ref={messagesEndRef} />
          </div>
          <MessageInput 
            onSendMessage={handleSendMessage}
            disabled={!isConnected || loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Community;