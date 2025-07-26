import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Mic, Camera, Phone, Video, MoreVertical, Paperclip, Check, CheckCheck, Clock, Smile } from 'lucide-react';

type Language = 'te' | 'hi' | 'en';
type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
  type: 'text' | 'voice' | 'image' | 'file';
  status?: MessageStatus;
  fileName?: string;
  fileSize?: string;
  duration?: string; // for voice messages
}

interface ChatScreenProps {
  onBack: () => void;
  language: Language;
  contactName: string;
  contactType: 'worker' | 'employer';
  userId?: string;
  contactId?: string;
}

const EnhancedChatScreen: React.FC<ChatScreenProps> = ({ 
  onBack, 
  language, 
  contactName, 
  contactType,
  userId = 'user1',
  contactId = 'contact1'
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I saw your job posting for farm work. I'm interested.",
      sender: 'other',
      timestamp: '10:30 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: 2,
      text: "Great! Can you come tomorrow at 6 AM?",
      sender: 'user',
      timestamp: '10:32 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: 3,
      text: "Yes, I'll be there. What's the exact location?",
      sender: 'other',
      timestamp: '10:35 AM',
      type: 'text',
      status: 'read'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const content = {
    en: {
      typing: "Type a message...",
      online: "Online",
      offline: "Last seen recently",
      send: "Send",
      record: "Record voice message",
      camera: "Take photo",
      call: "Voice call",
      videoCall: "Video call",
      attachFile: "Attach file",
      isTyping: "is typing...",
      recording: "Recording...",
      today: "Today",
      yesterday: "Yesterday"
    },
    hi: {
      typing: "संदेश टाइप करें...",
      online: "ऑनलाइन",
      offline: "हाल ही में देखा गया",
      send: "भेजें",
      record: "आवाज संदेश रिकॉर्ड करें",
      camera: "फोटो लें",
      call: "आवाज कॉल",
      videoCall: "वीडियो कॉल",
      attachFile: "फाइल संलग्न करें",
      isTyping: "टाइप कर रहा है...",
      recording: "रिकॉर्डिंग...",
      today: "आज",
      yesterday: "कल"
    },
    te: {
      typing: "సందేశం టైప్ చేయండి...",
      online: "ఆన్‌లైన్",
      offline: "ఇటీవల చూశారు",
      send: "పంపండి",
      record: "వాయిస్ మెసేజ్ రికార్డ్ చేయండి",
      camera: "ఫోటో తీయండి",
      call: "వాయిస్ కాల్",
      videoCall: "వీడియో కాల్",
      attachFile: "ఫైల్ జోడించండి",
      isTyping: "టైప్ చేస్తున్నారు...",
      recording: "రికార్డింగ్...",
      today: "ఈరోజు",
      yesterday: "నిన్న"
    }
  };

  const currentContent = content[language];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (message.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Simulate other user typing
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setOtherUserTyping(true);
        setTimeout(() => setOtherUserTyping(false), 2000);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: message.trim(),
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        status: 'sending'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Simulate message status updates
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        ));
      }, 500);

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        ));
      }, 1000);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newMessage: Message = {
        id: Date.now(),
        text: `📎 ${file.name}`,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'file',
        status: 'sending',
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(1) + ' KB'
      };
      
      setMessages(prev => [...prev, newMessage]);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        const voiceMessage: Message = {
          id: Date.now(),
          text: "🎵 Voice message",
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'voice',
          status: 'sent',
          duration: '0:15'
        };
        setMessages(prev => [...prev, voiceMessage]);
        setIsRecording(false);
      }, 3000);
    }
  };

  const getMessageStatusIcon = (status?: MessageStatus) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3" />;
      case 'sent':
        return <Check className="w-3 h-3" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      default:
        return null;
    }
  };

  const MessageBubble = ({ msg }: { msg: Message }) => (
    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        msg.sender === 'user'
          ? 'bg-green-600 text-white rounded-br-md'
          : 'bg-white text-gray-800 shadow-sm rounded-bl-md'
      }`}>
        {msg.type === 'voice' && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 h-2 bg-green-200 rounded-full">
              <div className="h-2 bg-green-500 rounded-full w-3/4"></div>
            </div>
            <span className="text-xs">{msg.duration}</span>
          </div>
        )}
        
        {msg.type === 'file' && (
          <div className="flex items-center space-x-2 mb-2">
            <Paperclip className="w-4 h-4" />
            <div>
              <div className="text-sm font-medium">{msg.fileName}</div>
              <div className="text-xs opacity-75">{msg.fileSize}</div>
            </div>
          </div>
        )}
        
        <p className="text-sm">{msg.text}</p>
        
        <div className={`flex items-center justify-end space-x-2 mt-2 ${
          msg.sender === 'user' ? 'text-green-100' : 'text-gray-500'
        }`}>
          <span className="text-xs">{msg.timestamp}</span>
          {msg.sender === 'user' && getMessageStatusIcon(msg.status)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center relative">
            <span className="text-white font-bold text-lg">
              {contactName.charAt(0)}
            </span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-800">
              {contactName}
            </h1>
            <p className="text-sm text-green-600">
              {otherUserTyping ? `${currentContent.isTyping}` : currentContent.online}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Phone className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Video className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="text-center mb-4">
          <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
            {currentContent.today}
          </span>
        </div>
        
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        
        {otherUserTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors">
            <Camera className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={currentContent.typing}
              className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full">
              <Smile className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {message.trim() ? (
            <button
              onClick={handleSendMessage}
              className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={toggleRecording}
              className={`p-3 rounded-full transition-colors ${
                isRecording
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>

        {isRecording && (
          <div className="mt-3 flex items-center justify-center space-x-2 text-red-600">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">{currentContent.recording}</span>
            <span className="text-sm">0:03</span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,application/pdf,.doc,.docx"
        />
      </div>
    </div>
  );
};

export default EnhancedChatScreen;
