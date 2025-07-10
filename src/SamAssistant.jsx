import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, X, Calendar, User, MessageCircle, Volume2 } from 'lucide-react';
import './SamAssistant.css';

function SamAssistant({ isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Sam, your AI assistant. I can help you schedule meetings, answer questions, and more!", sender: 'sam', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentRecordingText, setCurrentRecordingText] = useState('');
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const longPressTimerRef = useRef(null);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Always update the current recording text with the full transcript
        const fullTranscript = finalTranscript + interimTranscript;
        setCurrentRecordingText(fullTranscript);
        
        // For final transcripts, also update the recorded text
        if (finalTranscript) {
          setRecordedText(prev => {
            const newText = prev + finalTranscript;
            console.log('Final transcript captured:', finalTranscript);
            console.log('Total recorded text:', newText);
            return newText;
          });
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };
    }
  }, []);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseDown = () => {
    longPressTimerRef.current = setTimeout(() => {
      startRecording();
    }, 300); // 300ms for long press
  };

  const handleMouseUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    if (isRecording) {
      stopRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setIsListening(true);
    setCurrentRecordingText('');
    setRecordedText('');
    
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    // Wait a bit for the final transcript to be processed, then send the message
    setTimeout(() => {
      // Try to get the best available transcript
      const finalText = recordedText.trim();
      const currentText = currentRecordingText.trim();
      const textToSend = finalText || currentText;
      
      console.log('=== Voice Message Debug ===');
      console.log('Final recorded text:', finalText);
      console.log('Current recording text:', currentText);
      console.log('Text to send:', textToSend);
      console.log('========================');
      
      if (textToSend) {
        sendMessage(textToSend);
        // Open the chatbox to show the sent message
        setIsOpen(true);
      } else {
        console.log('No text captured from voice recording');
      }
      
      // Reset all recording states
      setIsRecording(false);
      setIsListening(false);
      setRecordedText('');
      setCurrentRecordingText('');
    }, 500); // Give more time for final transcript processing
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate Sam's response
    setTimeout(() => {
      const samResponse = generateSamResponse(text);
      const samMessage = {
        id: messages.length + 2,
        text: samResponse,
        sender: 'sam',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, samMessage]);
    }, 1000);
  };

  const generateSamResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('schedule') || lowerText.includes('meeting')) {
      return "I'd be happy to help you schedule a meeting! What date and time works best for you? Also, who would you like to invite?";
    } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
      return "Hello! How can I assist you today? I can help with scheduling meetings, answering questions, or any other tasks you need.";
    } else if (lowerText.includes('thanks') || lowerText.includes('thank you')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I understand you're asking about: \"" + userText + "\". Let me help you with that. Could you provide more details about what you need?";
    }
  };

  const handleSendMessage = () => {
    sendMessage(inputText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="sam-assistant">
      {/* Recording Status Box */}
      {isRecording && (
        <div className="recording-status">
          <div className="recording-content">
            <div className="recording-indicator">
              <div className="pulse-dot"></div>
              <span>Sam is listening...</span>
            </div>
            <div className="recording-text">
              {currentRecordingText || 'Start speaking...'}
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className={`sam-chatbox ${isDarkMode ? 'dark' : ''}`}>
          <div className="chat-header">
            <div className="chat-title">
              <div className="sam-avatar">
                <div className="sam-eye left-eye"></div>
                <div className="sam-eye right-eye"></div>
              </div>
              <div>
                <h3>Sam Assistant</h3>
                <span className="status">Online</span>
              </div>
            </div>
            <button className="close-btn" onClick={handleToggleOpen}>
              <X size={20} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="timestamp">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message or schedule a meeting..."
              className="message-input"
            />
            <button onClick={handleSendMessage} className="send-btn">
              <Send size={18} />
            </button>
          </div>

          <div className="quick-actions">
            <button className="quick-action" onClick={() => sendMessage('Schedule a meeting')}>
              <Calendar size={16} />
              Schedule Meeting
            </button>
            <button className="quick-action" onClick={() => sendMessage('Show my calendar')}>
              <User size={16} />
              My Calendar
            </button>
          </div>
        </div>
      )}

      {/* Sam Button */}
      <button 
        className={`sam-button ${isRecording ? 'recording' : ''}`}
        onClick={handleToggleOpen}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <div className="neural-network">
          {/* Neurons */}
          {[...Array(8)].map((_, i) => (
            <div className="neuron" key={`neuron-${i}`} style={{
              top: `${25 + 20 * Math.cos(2 * Math.PI * i / 8)}px`,
              left: `${25 + 20 * Math.sin(2 * Math.PI * i / 8)}px`
            }}></div>
          ))}
          
          {/* Connections */}
          <div className="connection" style={{top: '20px', left: '25px', width: '15px', height: '1px', transform: 'rotate(45deg)'}}></div>
          <div className="connection" style={{top: '30px', left: '35px', width: '12px', height: '1px', transform: 'rotate(-30deg)'}}></div>
          <div className="connection" style={{top: '40px', left: '20px', width: '18px', height: '1px', transform: 'rotate(60deg)'}}></div>
          <div className="connection" style={{top: '15px', left: '40px', width: '14px', height: '1px', transform: 'rotate(-45deg)'}}></div>
        </div>
        <div className="central-eye"></div>
      </button>
    </div>
  );
}

export default SamAssistant;
