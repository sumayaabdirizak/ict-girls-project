import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import CommunitySidebar from '../../components/community/CommunitySidebar';
import ChannelHeader from '../../components/community/ChannelHeader';
import MessageList from '../../components/community/MessageList';
import MessageInput from '../../components/community/MessageInput';
import MembersSidebar from '../../components/community/MembersSidebar';

const Community = () => {
  const { user } = useAuth();
  const [activeChannel, setActiveChannel] = useState('general-chat');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const messagesEndRef = useRef(null);
  
  const [channels] = useState([
    { 
      id: 'courses-help', 
      name: 'courses-help', 
      displayName: 'Courses Help',
      icon: '📚', 
      unread: 3,
      description: 'Get help with your courses and assignments'
    },
    { 
      id: 'project-teams', 
      name: 'project-teams', 
      displayName: 'Project Teams',
      icon: '👥', 
      unread: 0,
      description: 'Collaborate on projects and find team members'
    },
    { 
      id: 'internships-jobs', 
      name: 'internships-jobs', 
      displayName: 'Internships & Jobs',
      icon: '💼', 
      unread: 5,
      description: 'Share internship and job opportunities'
    },
    { 
      id: 'study-groups', 
      name: 'study-groups', 
      displayName: 'Study Groups',
      icon: '🔬', 
      unread: 2,
      description: 'Find and organize study groups'
    },
    { 
      id: 'general-chat', 
      name: 'general-chat', 
      displayName: 'General Chat',
      icon: '💬', 
      unread: 0,
      description: 'General discussions and community chat'
    }
  ]);

  const [onlineUsers] = useState([
    { id: 1, name: 'Salma Adam', status: 'online', major: 'Computer Science', avatar: 'SA' },
    { id: 2, name: 'Aisha Mohamed', status: 'online', major: 'Information Technology', avatar: 'AM' },
    { id: 3, name: 'Fatima Hassan', status: 'away', major: 'Software Engineering', avatar: 'FH' },
    { id: 4, name: 'Khadija Ali', status: 'online', major: 'Cybersecurity', avatar: 'KA' },
    { id: 5, name: 'Mariam Omar', status: 'busy', major: 'Data Science', avatar: 'MO' }
  ]);

  const [studyGroups] = useState([
    { id: 1, name: 'Web Dev Study Group', members: 8, topic: 'React & Node.js', nextSession: 'Tomorrow 3 PM' },
    { id: 2, name: 'Database Study Group', members: 5, topic: 'SQL & MongoDB', nextSession: 'Friday 2 PM' },
    { id: 3, name: 'AI/ML Study Group', members: 12, topic: 'Python & TensorFlow', nextSession: 'Today 6 PM' }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const channelMessages = {
      'general-chat': [
        { 
          id: 1, 
          user: 'Salma Adam', 
          message: 'Welcome to our ICT Girls community! 🎉 This is the perfect place to connect with fellow students and grow together.', 
          time: '8:27 PM', 
          date: 'Today',
          reactions: { '👍': 3, '❤️': 2 },
          avatar: 'SA'
        },
        { 
          id: 2, 
          user: 'Aisha Mohamed', 
          message: 'Has anyone started the Web Development project? I need some help with React components and state management.', 
          time: '8:45 PM', 
          date: 'Today',
          reactions: { '👀': 1 },
          avatar: 'AM'
        }
      ],
      'courses-help': [
        { 
          id: 1, 
          user: 'Khadija Ali', 
          message: 'Can someone help me with database normalization? I\'m stuck on 3NF.', 
          time: '2:30 PM', 
          date: 'Today',
          reactions: {},
          avatar: 'KA'
        }
      ],
      'internships-jobs': [
        { 
          id: 1, 
          user: 'Fatima Hassan', 
          message: 'There\'s a great internship opportunity at TechCorp for 3rd year students! They\'re looking for frontend developers with React experience.', 
          time: '9:15 AM', 
          date: 'Today',
          reactions: { '👍': 5, '💼': 2 },
          avatar: 'FH'
        }
      ]
    };

    setMessages(channelMessages[activeChannel] || []);
  }, [activeChannel]);

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now(),
      user: user?.full_name || 'You',
      message: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today',
      reactions: {},
      avatar: user?.full_name?.split(' ').map(n => n[0]).join('') || 'Y',
      isCurrentUser: true
    };
    setMessages([...messages, newMessage]);
    simulateTyping();
  };

  const simulateTyping = () => {
    const typingUsers = onlineUsers.filter(u => u.status === 'online' && u.name !== user?.full_name);
    if (typingUsers.length > 0) {
      const randomUser = typingUsers[Math.floor(Math.random() * typingUsers.length)];
      setIsTyping(true);
      setTypingUser(randomUser.name);
      
      setTimeout(() => {
        setIsTyping(false);
        setTypingUser('');
      }, 2000);
    }
  };

  const handleChannelChange = (channelId) => {
    setActiveChannel(channelId);
    setIsTyping(false);
    setTypingUser('');
  };

  const getCurrentChannel = () => {
    return channels.find(channel => channel.id === activeChannel) || channels[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16"> {/* pt-16 for header spacing */}
      <div className="h-[calc(100vh-4rem)]"> {/* Adjust height for header */}
        <div className="flex h-full bg-white border border-gray-200">
          
          {/* Left Sidebar */}
          <CommunitySidebar
            channels={channels}
            activeChannel={activeChannel}
            onChannelChange={handleChannelChange}
            onlineUsers={onlineUsers}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Channel Header */}
            <ChannelHeader 
              channel={getCurrentChannel()} 
              onlineCount={onlineUsers.filter(u => u.status === 'online').length}
            />

            <div className="flex-1 flex overflow-hidden">
              
              {/* Messages Area */}
              <div className="flex-1 flex flex-col min-w-0">
             

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto bg-gray-50">
                  <div className="min-h-full">
                    <MessageList messages={messages} currentUser={user?.full_name} />
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="px-4 py-2">
                        <div className="flex items-center space-x-2 text-gray-500 text-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span>{typingUser} is typing...</span>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message Input */}
                <MessageInput 
                  onSendMessage={handleSendMessage} 
                  channel={getCurrentChannel().name}
                />
              </div>

              {/* Right Sidebar */}
              <MembersSidebar 
                onlineUsers={onlineUsers}
                studyGroups={studyGroups}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;