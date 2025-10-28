import { useEffect, useRef, useState, useCallback } from 'react';

export const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const ws = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const intentionalClose = useRef(false);

  const connect = useCallback(() => {
    if (!url) {
      console.log('No WebSocket URL provided');
      return;
    }

    // Reset intentional close flag for new connection
    intentionalClose.current = false;

    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        setIsConnected(true);
        setReconnectAttempts(0);
        console.log('✅ WebSocket connected');
      };

      ws.current.onclose = (event) => {
        setIsConnected(false);
        console.log('❌ WebSocket disconnected:', event.code, event.reason);

        // Only attempt reconnect if it wasn't an intentional close
        if (!intentionalClose.current && reconnectAttempts < 5) {
          reconnectTimeoutRef.current = setTimeout(() => {
            setReconnectAttempts(prev => prev + 1);
            console.log(`🔄 Reconnect attempt ${reconnectAttempts + 1}`);
            connect();
          }, 3000);
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setMessages(prev => [...prev, data]);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
    }
  }, [url, reconnectAttempts]);

  useEffect(() => {
    connect();

    return () => {
      // Mark as intentional close and clean up
      intentionalClose.current = true;
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (ws.current) {
        ws.current.close(1000, 'Component unmounting');
      }
    };
  }, [connect]);

  const sendMessage = useCallback((message) => {
    if (ws.current && isConnected) {
      ws.current.send(JSON.stringify(message));
      return true;
    } else {
      console.warn('WebSocket not connected, cannot send message');
      return false;
    }
  }, [isConnected]);

  const disconnect = useCallback(() => {
    intentionalClose.current = true;
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (ws.current) {
      ws.current.close(1000, 'Manual disconnect');
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return { 
    messages, 
    sendMessage, 
    isConnected,
    reconnectAttempts,
    disconnect,
    clearMessages
  };
};