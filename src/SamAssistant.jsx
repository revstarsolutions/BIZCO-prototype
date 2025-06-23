import React, { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import './SamAssistant.css';

// Helper to get platform icon - moved from script.js
const getPlatformIcon = (platform) => {
  const platformIcons = {
    'Google Meet': 'fas fa-video',
    'Zoom': 'fas fa-video',
    'Microsoft Teams': 'fab fa-microsoft',
    'Skype': 'fab fa-skype',
    'WebEx': 'fas fa-video',
    'Slack': 'fab fa-slack',
    'In-Person': 'fas fa-handshake',
    'Phone Call': 'fas fa-phone'
  };
  return platformIcons[platform] || 'fas fa-laptop';
};

// --- Meeting and Contact Modals as React Components ---
const MeetingModal = ({ isOpen, onClose, onSaveMeeting, isDarkMode }) => {
  const [formData, setFormData] = useState({
    platform: '',
    participants: '',
    date: new Date().toISOString().split('T')[0], // Default to today
    time: '',
    title: '',
  });

  useEffect(() => {
    if (!isOpen) {
      // Reset form when closed
      setFormData({
        platform: '',
        participants: '',
        date: new Date().toISOString().split('T')[0],
        time: '',
        title: '',
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveMeeting(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={clsx("modal", { 'active': isOpen })} onClick={onClose}> {/* Clicking overlay closes */}
      <div className={clsx("modal-content", { 'dark-mode-modal': isDarkMode, 'light-mode-modal': !isDarkMode })} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Schedule Meeting</h3>
          <span className="close" onClick={onClose}>&times;</span>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="meetingPlatform">Platform</label>
              <select id="meetingPlatform" value={formData.platform} onChange={handleChange} required>
                <option value="">Select platform</option>
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom">Zoom</option>
                <option value="Microsoft Teams">Microsoft Teams</option>
                <option value="Skype">Skype</option>
                <option value="WebEx">WebEx</option>
                <option value="Slack">Slack</option>
                <option value="In-Person">In-Person</option>
                <option value="Phone Call">Phone Call</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="meetingParticipants">Participants</label>
              <input type="text" id="meetingParticipants" placeholder="Enter participant names" value={formData.participants} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="meetingDate">Date</label>
              <input type="date" id="meetingDate" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="meetingTime">Time</label>
              <input type="time" id="meetingTime" value={formData.time} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="meetingTitle">Meeting Title</label>
              <input type="text" id="meetingTitle" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Schedule Meeting</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ContactModal = ({ isOpen, onClose, onSaveContact, isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  useEffect(() => {
    if (!isOpen) {
      // Reset form when closed
      setFormData({ name: '', email: '', phone: '', company: '' });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveContact(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={clsx("modal", { 'active': isOpen })} onClick={onClose}>
      <div className={clsx("modal-content", { 'dark-mode-modal': isDarkMode, 'light-mode-modal': !isDarkMode })} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Contact</h3>
          <span className="close" onClick={onClose}>&times;</span>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contactName">Name</label>
              <input type="text" id="contactName" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="contactEmail">Email</label>
              <input type="email" id="contactEmail" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="contactPhone">Phone</label>
              <input type="tel" id="contactPhone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="contactCompany">Company</label>
              <input type="text" id="contactCompany" value={formData.company} onChange={handleChange} />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Contact</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Main SamAssistant Component ---
const SamAssistant = ({ isDarkMode }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState('SAM is listening...');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatVoiceRecording, setIsChatVoiceRecording] = useState(false);

  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // CRM Data States (internal to SAM for simplicity, as per original script.js)
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('crm-contacts')) || []);
  const [meetings, setMeetings] = useState(() => JSON.parse(localStorage.getItem('crm-meetings')) || []);

  // SAM Assistant's Position (for drag-and-drop and snapping)
  const [position, setPosition] = useState({ bottom: 30, right: 30 }); // For direct dragging
  const [corner, setCorner] = useState('bottom-right'); // For snapped position
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const assistantRef = useRef(null);
  const recognitionRef = useRef(null); // Main voice recognition
  const chatRecognitionRef = useRef(null); // Chat voice recognition
  const longPressTimerRef = useRef(null);

  const chatMessagesRef = useRef(null); // Ref for scrolling chat messages

  // Scroll to bottom of chat messages
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Meeting scheduling conversation state
  const meetingFlow = useRef({
    isActive: false,
    step: 0,
    data: {
      title: '',
      date: '',
      time: '',
      participants: '',
      platform: '',
    },
    missingFields: []
  });

  // Load initial welcome message
  useEffect(() => {
    const initialMessage = {
      content: `Hello! I'm SAM, your AI CRM assistant. I can help you:
        <ul>
            <li>📅 Schedule meetings</li>
            <li>👥 Manage contacts</li>
            <li>🎤 Voice commands (long press the mic button)</li>
            <li>💬 Chat conversations</li>
        </ul>
        How can I assist you today?`,
      sender: 'sam',
      time: 'Now'
    };
    setChatMessages([initialMessage]);
  }, []);

  // --- Speech Recognition Initialization ---
  const initializeSpeechRecognition = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
        setVoiceText('SAM is listening...');
      };

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
        setVoiceText(finalTranscript || interimTranscript); // Show final or interim
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        const finalTranscript = voiceText.trim(); // Use the last updated voiceText
        if (finalTranscript) {
          if (!isChatOpen) {
            setIsChatOpen(true); // Open chat if not already open
          }
          addMessageToChat(finalTranscript, 'user');
          processChatMessage(finalTranscript);
        }
        setVoiceText('SAM is listening...'); // Reset voice indicator text
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setVoiceText('Error listening. Try again.');
        setTimeout(() => setVoiceText('SAM is listening...'), 2000);
      };
    } else {
      console.warn('Speech recognition not supported in this browser.');
    }
  }, [isChatOpen, voiceText]);

  const initializeChatVoiceRecognition = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      chatRecognitionRef.current = new SpeechRecognition();
      chatRecognitionRef.current.continuous = false;
      chatRecognitionRef.current.interimResults = true;
      chatRecognitionRef.current.lang = 'en-US';

      chatRecognitionRef.current.onstart = () => {
        setIsChatVoiceRecording(true);
      };

      chatRecognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setChatInput(transcript);
      };

      chatRecognitionRef.current.onend = () => {
        setIsChatVoiceRecording(false);
        if (chatInput.trim()) {
          sendMessage(); // Send message after voice input ends
        }
      };

      chatRecognitionRef.current.onerror = (event) => {
        console.error('Chat voice recognition error:', event.error);
        setIsChatVoiceRecording(false);
      };
    }
  }, [chatInput]);

  useEffect(() => {
    initializeSpeechRecognition();
    initializeChatVoiceRecognition();

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) recognitionRef.current.onend = null;
      if (chatRecognitionRef.current) chatRecognitionRef.current.onend = null;
    };
  }, [initializeSpeechRecognition, initializeChatVoiceRecognition]);

  // --- Voice Recording Functions ---
  const startVoiceRecording = () => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.start();
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  // --- Dragging Functionality ---
  const handleDragEnd = useCallback((x, y) => {
    const button = assistantRef.current;
    if (!button) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const newCorner =
      x < centerX && y < centerY ? 'top-left' :
      x >= centerX && y < centerY ? 'top-right' :
      x < centerX && y >= centerY ? 'bottom-left' :
      'bottom-right';

    setCorner(newCorner);
    setPosition({ left: 'auto', top: 'auto', right: 'auto', bottom: 'auto' }); // Clear direct positioning
    setIsDragging(false);
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    const button = assistantRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    let initialMousePos = { x: e.clientX, y: e.clientY };
    let hasMoved = false;

    // Start long press timer
    longPressTimerRef.current = setTimeout(() => {
      if (!hasMoved && !isDragging) {
        startVoiceRecording();
      }
    }, 800);

    const onMouseMove = (moveEvent) => {
      if (longPressTimerRef.current) { // Only track movement if long press timer is active
        const moveDistance = Math.sqrt(
          Math.pow(moveEvent.clientX - initialMousePos.x, 2) +
          Math.pow(moveEvent.clientY - initialMousePos.y, 2)
        );
        if (moveDistance > 10 && !hasMoved) { // Threshold for drag
          hasMoved = true;
          clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
          setIsDragging(true); // Start dragging only if moved significantly
          setCorner(null); // Disable corner snapping during active drag
        }
      }
      if (isDragging) {
        const newX = moveEvent.clientX - dragOffset.current.x;
        const newY = moveEvent.clientY - dragOffset.current.y;
        setPosition({ left: newX, top: newY, bottom: 'auto', right: 'auto' });
      }
    };

    const onMouseUp = (upEvent) => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      clearTimeout(longPressTimerRef.current);

      if (isRecording) {
        stopVoiceRecording();
      } else if (!isDragging && !hasMoved) {
        // This is a click if no drag and no recording started
        toggleSAMChat();
      } else if (isDragging) {
        handleDragEnd(upEvent.clientX, upEvent.clientY);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [isRecording, isDragging, handleDragEnd]);


  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const button = assistantRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    dragOffset.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };

    let initialTouchPos = { x: touch.clientX, y: touch.clientY };
    let hasMoved = false;

    longPressTimerRef.current = setTimeout(() => {
      if (!hasMoved && !isDragging) {
        startVoiceRecording();
      }
    }, 800);

    const onTouchMove = (moveEvent) => {
      const currentTouch = moveEvent.touches[0];
      if (longPressTimerRef.current) {
        const moveDistance = Math.sqrt(
          Math.pow(currentTouch.clientX - initialTouchPos.x, 2) +
          Math.pow(currentTouch.clientY - initialTouchPos.y, 2)
        );
        if (moveDistance > 10 && !hasMoved) {
          hasMoved = true;
          clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
          setIsDragging(true);
          setCorner(null); // Disable corner snapping during active drag
        }
      }
      if (isDragging) {
        const newX = currentTouch.clientX - dragOffset.current.x;
        const newY = currentTouch.clientY - dragOffset.current.y;
        setPosition({ left: newX, top: newY, bottom: 'auto', right: 'auto' });
      }
    };

    const onTouchEnd = (upEvent) => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      clearTimeout(longPressTimerRef.current);

      if (isRecording) {
        stopVoiceRecording();
      } else if (!isDragging && !hasMoved) {
        toggleSAMChat();
      } else if (isDragging) {
        handleDragEnd(upEvent.changedTouches[0].clientX, upEvent.changedTouches[0].clientY);
      }
    };

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  }, [isRecording, isDragging, handleDragEnd]);


  // --- Chat Functions ---
  const toggleSAMChat = () => {
    setIsChatOpen((prev) => !prev);
    if (!isChatOpen) {
      // If opening, focus on input after state update
      setTimeout(() => document.getElementById('chatInput')?.focus(), 0);
    } else {
      // If closing, stop chat voice recording
      if (isChatVoiceRecording) {
        chatRecognitionRef.current?.stop();
        setIsChatVoiceRecording(false);
      }
    }
  };

  const addMessageToChat = (content, sender) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [...prev, { content, sender, time: timeString }]);
  };

  const sendMessage = () => {
    const message = chatInput.trim();
    if (message) {
      addMessageToChat(message, 'user');
      setChatInput('');
      processChatMessage(message);
    }
  };

  const startChatVoiceRecording = () => {
    if (chatRecognitionRef.current && !isChatVoiceRecording) {
      setChatInput(''); // Clear input before recording
      chatRecognitionRef.current.start();
    }
  };

  const stopChatVoiceRecording = () => {
    if (chatRecognitionRef.current && isChatVoiceRecording) {
      chatRecognitionRef.current.stop();
    }
  };

  // --- Auto-close SAM on small screens ---
  useEffect(() => {
    const handleResize = () => {
      // Threshold for phone/tablet view. Typically 768px or 1024px, depending on your design.
      const mobileThreshold = 768;
      if (window.innerWidth <= mobileThreshold && isChatOpen) {
        setIsChatOpen(false); // Close chat if window is small
        if (isChatVoiceRecording) {
          chatRecognitionRef.current?.stop();
          setIsChatVoiceRecording(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Run on mount in case loaded on small screen

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isChatOpen, isChatVoiceRecording]); // Re-run effect if chat state changes


  // --- CRM Data Management & SAM Command Processing ---

  const saveContacts = (updatedContacts) => {
    setContacts(updatedContacts);
    localStorage.setItem('crm-contacts', JSON.stringify(updatedContacts));
  };

  const saveMeetings = (updatedMeetings) => {
    setMeetings(updatedMeetings);
    localStorage.setItem('crm-meetings', JSON.stringify(updatedMeetings));
  };

  const handleSaveMeeting = (newMeetingData) => {
    const newMeeting = {
      id: Date.now(),
      ...newMeetingData,
    };
    saveMeetings([...meetings, newMeeting]);
    setShowMeetingModal(false);
    addMessageToChat(`Meeting "${newMeeting.title}" scheduled successfully!`, 'sam');
  };

  const handleSaveContact = (newContactData) => {
    const newContact = {
      id: Date.now(),
      ...newContactData,
    };
    saveContacts([...contacts, newContact]);
    setShowContactModal(false);
    addMessageToChat(`Contact "${newContact.name}" added successfully!`, 'sam');
  };

  // Utility functions (from script.js, adapted for React)
  const parseDateInput = (input) => {
    const lowerInput = input.toLowerCase().trim();

    if (lowerInput === 'today') {
      return new Date().toISOString().split('T')[0];
    }
    if (lowerInput === 'tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    }

    const datePatterns = [
      /^(\d{4})-(\d{1,2})-(\d{1,2})$/, // YYYY-MM-DD
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, // MM/DD/YYYY
      /^(\d{1,2})-(\d{1,2})-(\d{4})$/, // MM-DD-YYYY
    ];

    for (const pattern of datePatterns) {
      const match = input.match(pattern);
      if (match) {
        let year, month, day;
        if (pattern.source.includes('\\d{4}.*\\d{1,2}.*\\d{1,2}')) { // YYYY-MM-DD
          [, year, month, day] = match;
        } else { // MM/DD/YYYY or MM-DD-YYYY
          [, month, day, year] = match;
        }

        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
      }
    }

    const monthNames = {
      'january': 0, 'jan': 0, 'february': 1, 'feb': 1, 'march': 2, 'mar': 2,
      'april': 3, 'apr': 3, 'may': 4, 'june': 5, 'jun': 5, 'july': 6, 'jul': 6,
      'august': 7, 'aug': 7, 'september': 8, 'sep': 8, 'sept': 8, 'october': 9, 'oct': 9,
      'november': 10, 'nov': 10, 'december': 11, 'dec': 11
    };

    const naturalPattern = /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})/i;
    const naturalMatch = input.match(naturalPattern);

    if (naturalMatch) {
      const monthName = naturalMatch[1].toLowerCase();
      const day = parseInt(naturalMatch[2]);
      const month = monthNames[monthName];
      const currentYear = new Date().getFullYear();

      const date = new Date(Date.UTC(currentYear, month, day));
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    }
    return null;
  };

  const parseTimeInput = (input) => {
    const lowerInput = input.toLowerCase().trim();
    const cleanInput = lowerInput.replace(/\b(at|around|about)\b/g, '').trim();

    const timePatterns = [
      /^(\d{1,2}):(\d{2})\s*(am|pm)?$/i,
      /^(\d{1,2})\s*(am|pm)$/i,
      /^(\d{1,2}):(\d{2})$/i,
      /^(\d{1,2})$/i
    ];

    for (const pattern of timePatterns) {
      const match = cleanInput.match(pattern);
      if (match) {
        let hour = parseInt(match[1]);
        const minute = match[2] ? parseInt(match[2]) : 0;
        const period = match[3] ? match[3].toLowerCase() : null;

        if (period === 'pm' && hour !== 12) {
          hour += 12;
        } else if (period === 'am' && hour === 12) {
          hour = 0;
        } else if (!period && hour >= 1 && hour <= 12) {
          // Simple heuristic: if time is before 8 AM, assume it's AM; otherwise PM (for single number input like "4")
          const now = new Date();
          const currentHour = now.getHours();
          if (hour < currentHour && (currentHour < 12 || hour !== 12)) { // If input hour is less than current hour, assume PM if current hour is past noon or input is not 12
              hour = (hour % 12) + 12; // Convert to PM
          } else if (hour === 12 && currentHour >= 12) { // If 12 and current time is afternoon, assume 12 PM
              hour = 12;
          } else if (hour === 12 && currentHour < 12) { // If 12 and current time is morning, assume 12 AM (midnight)
              hour = 0;
          } else { // Assume AM otherwise
              hour = hour;
          }
        }

        if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
          return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        }
      }
    }
    return null;
  };


  const extractMeetingDetails = (message) => {
    const lowerMessage = message.toLowerCase();
    const details = {
      title: '', date: '', time: '', participants: '', platform: '', hasDetails: false
    };

    const platformPatterns = [
      /(?:a )?(?:google meet|google meeting|google|meet)/i, /(?:a )?(?:zoom|zoom meeting|zoom call)/i,
      /(?:a )?(?:teams|microsoft teams|teams meeting)/i, /(?:a )?(?:skype|skype meeting|skype call)/i,
      /(?:a )?(?:webex|webex meeting)/i, /(?:a )?(?:slack|slack huddle|slack call)/i
    ];
    for (const pattern of platformPatterns) {
      const match = message.match(pattern);
      if (match) {
        const fullMatch = match[0].toLowerCase();
        if (fullMatch.includes('google')) details.platform = 'Google Meet';
        else if (fullMatch.includes('zoom')) details.platform = 'Zoom';
        else if (fullMatch.includes('teams')) details.platform = 'Microsoft Teams';
        else if (fullMatch.includes('skype')) details.platform = 'Skype';
        else if (fullMatch.includes('webex')) details.platform = 'WebEx';
        else if (fullMatch.includes('slack')) details.platform = 'Slack';
        break;
      }
    }

    const titlePatterns = [
      /(?:schedule (?:a )?(?:google meet|zoom|teams|meeting|google|meet|skype|webex|slack)?) (?:with |for |about |regarding )?([^\s][^,]*?)(?:\s+with\s+|\s+on\s+|\s+at\s+|\s+tomorrow|\s+today|\s+this|\s+next|\s*,|$)/i,
      /meeting (?:with |about |for |regarding )?([^\s][^,]*?)(?:\s+with\s+|\s+on\s+|\s+at\s+|\s+tomorrow|\s+today|\s+this|\s+next|\s*,|$)/i
    ];
    for (const pattern of titlePatterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        let title = match[1].trim();
        title = title.replace(/\b(google meet|google meeting|zoom meeting|teams meeting|meeting)\b/gi, '').trim();
        if (title && title.length > 0) { details.title = title; break; }
      }
    }

    const participantPatterns = [/with ([a-zA-Z\s,]+?)(?:at|on|tomorrow|today|this|next|\d|$)/i, /participants?:? ([a-zA-Z\s,]+?)(?:at|on|tomorrow|today|this|next|\d|$)/i];
    for (const pattern of participantPatterns) {
      const match = message.match(pattern);
      if (match && match[1]) { details.participants = match[1].trim(); break; }
    }

    if (lowerMessage.includes('today')) details.date = new Date().toISOString().split('T')[0];
    else if (lowerMessage.includes('tomorrow')) {
      const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); details.date = tomorrow.toISOString().split('T')[0];
    } else {
      const datePatterns = [
        /(\d{1,2})\/(\d{1,2})\/(\d{4})/, /(\d{4})-(\d{1,2})-(\d{1,2})/,
        /on ([a-zA-Z]+ \d{1,2})/, /next (monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i
      ];
      for (const pattern of datePatterns) {
        const match = message.match(pattern);
        if (match) {
          if (pattern.source.includes('next')) {
            const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); details.date = tomorrow.toISOString().split('T')[0];
          } else if (match[1] && match[2] && match[3]) {
            try { const date = new Date(match[0]); if (!isNaN(date.getTime())) details.date = date.toISOString().split('T')[0]; } catch (e) { }
          }
          break;
        }
      }
    }

    const timePatterns = [/at (\d{1,2})(?::(\d{2}))? ?(am|pm|AM|PM)/i, /(\d{1,2}):(\d{2}) ?(am|pm|AM|PM)/i, /(\d{1,2}) ?(am|pm|AM|PM)/i, /(\d{1,2})(?::(\d{2}))?/i];
    for (const pattern of timePatterns) {
      const match = message.match(pattern);
      if (match) {
        let hour = parseInt(match[1]);
        const minute = match[2] ? parseInt(match[2]) : 0;
        const period = match[3] ? match[3].toLowerCase() : '';
        if (period === 'pm' && hour !== 12) hour += 12; else if (period === 'am' && hour === 12) hour = 0;
        if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) { details.time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`; break; }
      }
    }
    if (!details.title && (details.participants || details.date || details.time)) details.title = details.participants ? `Meeting with ${details.participants}` : 'Scheduled Meeting';
    details.hasDetails = !!(details.title || details.participants || details.date || details.time);
    return details;
  };

  const extractContactDetails = (message) => {
    const details = { name: '', email: '', phone: '', company: '', hasDetails: false };
    const namePatterns = [/add contact (?:for )?([a-zA-Z\s]+?)(?:email|phone|company|at|$)/i, /contact (?:named |called )?([a-zA-Z\s]+?)(?:email|phone|company|at|$)/i];
    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match && match[1]) { details.name = match[1].trim(); break; }
    }
    const emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
    const emailMatch = message.match(emailPattern);
    if (emailMatch) { details.email = emailMatch[1]; }
    const phonePatterns = [/phone:? ?([\d\s\-\(\)\+]{10,})/i, /number:? ?([\d\s\-\(\)\+]{10,})/i];
    for (const pattern of phonePatterns) {
      const match = message.match(pattern);
      if (match && match[1]) { details.phone = match[1].trim(); break; }
    }
    const companyPatterns = [/company:? ?([a-zA-Z\s]+?)(?:email|phone|$)/i, /works? at ([a-zA-Z\s]+?)(?:email|phone|$)/i, /from ([a-zA-Z\s]+?)(?:email|phone|$)/i];
    for (const pattern of companyPatterns) {
      const match = message.match(pattern);
      if (match && match[1]) { details.company = match[1].trim(); break; }
    }
    details.hasDetails = !!(details.name || details.email || details.phone || details.company);
    return details;
  };

  const askForMissingField = (field) => {
    switch (field) {
      case 'platform': return '\n\nWhich platform?';
      case 'participants': return '\n\nWho should attend this meeting?';
      case 'date': return '\n\nWhat date should this be scheduled?';
      case 'time': return '\n\nWhat time?';
      case 'title': return '\n\nWhat should the meeting title be?';
      default: return '\n\nWhat additional details do you need to provide?';
    }
  };

  const handleSmartMeetingFlow = useCallback((message) => {
    const trimmedMessage = message.trim();

    if (trimmedMessage.toLowerCase() === 'cancel' || trimmedMessage.toLowerCase() === 'stop') {
      cancelMeetingFlow();
      return;
    }

    const currentField = meetingFlow.current.missingFields[meetingFlow.current.step - 1];

    switch (currentField) {
      case 'platform':
        meetingFlow.current.data.platform = trimmedMessage;
        break;
      case 'participants':
        meetingFlow.current.data.participants = trimmedMessage;
        break;
      case 'date':
        const parsedDate = parseDateInput(trimmedMessage);
        if (parsedDate) {
          meetingFlow.current.data.date = parsedDate;
        } else {
          addMessageToChat(`I couldn't understand that date. Please try again with:\n• "today" or "tomorrow"\n• "June 25" or "December 15"\n• "2025-06-25" format\n\nWhat date would you like?`, 'sam');
          return;
        }
        break;
      case 'time':
        const parsedTime = parseTimeInput(trimmedMessage);
        if (parsedTime) {
          meetingFlow.current.data.time = parsedTime;
        } else {
          addMessageToChat(`I couldn't understand that time. Please try again with:\n• "2pm" or "14:00"\n• "9:30am" or "09:30"\n• "10:15" or "22:45"\n\nWhat time would you like?`, 'sam');
          return;
        }
        break;
      case 'title':
        meetingFlow.current.data.title = trimmedMessage;
        break;
    }

    meetingFlow.current.step++;

    if (meetingFlow.current.step <= meetingFlow.current.missingFields.length) {
      const nextField = meetingFlow.current.missingFields[meetingFlow.current.step - 1];
      let acknowledgment = 'Perfect!';

      switch (currentField) {
        case 'platform': acknowledgment = `Platform set: ${meetingFlow.current.data.platform}`; break;
        case 'participants': acknowledgment = `Participants: ${meetingFlow.current.data.participants}`; break;
        case 'date': acknowledgment = `Date set to: ${meetingFlow.current.data.date}`; break;
        case 'time': acknowledgment = `Time set to: ${meetingFlow.current.data.time}`; break;
        case 'title': acknowledgment = `Title: ${meetingFlow.current.data.title}`; break;
      }

      const response = `${acknowledgment}${askForMissingField(nextField)}`;
      addMessageToChat(response, 'sam');
    } else {
      createMeetingFromFlow();
    }
  }, []);

  const createMeetingFromFlow = useCallback(() => {
    if (!meetingFlow.current.data.title) {
      meetingFlow.current.data.title = meetingFlow.current.data.participants ?
        `Meeting with ${meetingFlow.current.data.participants}` :
        'Scheduled Meeting';
    }

    const newMeeting = {
      id: Date.now(),
      title: meetingFlow.current.data.title,
      date: meetingFlow.current.data.date,
      time: meetingFlow.current.data.time,
      participants: meetingFlow.current.data.participants,
      platform: meetingFlow.current.data.platform,
    };

    saveMeetings([...meetings, newMeeting]);

    meetingFlow.current.isActive = false;
    meetingFlow.current.step = 0;
    meetingFlow.current.missingFields = [];

    let response = `**Meeting scheduled successfully!**\n\n**Meeting Details:**\n• **Platform:** ${newMeeting.platform || 'Not specified'}\n• **Participants:** ${newMeeting.participants}\n• **Date:** ${newMeeting.date}\n• **Time:** ${newMeeting.time}\n• **Title:** ${newMeeting.title}`;
    response += '\n\nThe meeting has been added to your calendar!';
    addMessageToChat(response, 'sam');
  }, [meetings]);

  const cancelMeetingFlow = useCallback(() => {
    meetingFlow.current.isActive = false;
    meetingFlow.current.step = 0;
    meetingFlow.current.data = { platform: '', participants: '', date: '', time: '', title: '' };
    addMessageToChat('Meeting scheduling cancelled. How else can I help you?', 'sam');
  }, []);

  const processChatMessage = useCallback((message) => {
    const lowerMessage = message.toLowerCase();
    let response = '';

    if (meetingFlow.current.isActive) {
      handleSmartMeetingFlow(message);
      return;
    }

    if ((lowerMessage.includes('schedule') || lowerMessage.includes('create')) && (lowerMessage.includes('meeting') || lowerMessage.includes('meet') || lowerMessage.includes('appointment') || lowerMessage.includes('google') || lowerMessage.includes('zoom') || lowerMessage.includes('teams'))) {
      const meetingDetails = extractMeetingDetails(message);

      meetingFlow.current.data = {
        title: meetingDetails.title || '',
        date: meetingDetails.date || '',
        time: meetingDetails.time || '',
        participants: meetingDetails.participants || '',
        platform: meetingDetails.platform || '',
      };

      const missingFields = [];
      if (!meetingFlow.current.data.platform) missingFields.push('platform');
      if (!meetingFlow.current.data.participants) missingFields.push('participants');
      if (!meetingFlow.current.data.date) missingFields.push('date');
      if (!meetingFlow.current.data.time) missingFields.push('time');
      if (!meetingFlow.current.data.title) missingFields.push('title');

      if (missingFields.length === 0) {
        createMeetingFromFlow();
      } else {
        meetingFlow.current.isActive = true; // Activate flow for smart conversation
        meetingFlow.current.missingFields = missingFields;
        meetingFlow.current.step = 1;

        let extracted = [];
        if (meetingFlow.current.data.platform) extracted.push(`Platform: ${meetingFlow.current.data.platform}`);
        if (meetingFlow.current.data.participants) extracted.push(`Participants: ${meetingFlow.current.data.participants}`);
        if (meetingFlow.current.data.date) extracted.push(`Date: ${meetingFlow.current.data.date}`);
        if (meetingFlow.current.data.time) extracted.push(`Time: ${meetingFlow.current.data.time}`);
        if (meetingFlow.current.data.title) extracted.push(`Title: ${meetingFlow.current.data.title}`);

        let flowResponse = `Great! I understood:\n${extracted.join('\n')}\n\nI need a few more details to complete the meeting:`;
        flowResponse += askForMissingField(missingFields[0]);
        addMessageToChat(flowResponse, 'sam');
      }
      return;
    }

    if (lowerMessage.includes('add contact') || lowerMessage.includes('new contact')) {
      const contactDetails = extractContactDetails(message);
      if (contactDetails.hasDetails) {
        handleSaveContact(contactDetails);
        response = `I've added a new contact: ${contactDetails.name || 'Unnamed'}.`;
      } else {
        response = 'Let me help you add a new contact! What is the contact\'s name, email, or phone number?';
      }
      setShowContactModal(true); // Always open modal to allow user to fill missing fields
    }
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = 'Hello! How can I assist you with your CRM today? I can help you schedule meetings, manage contacts, or navigate your dashboard.';
    }
    else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      response = `I can help you with:
• 📅 Schedule meetings - just say "schedule a meeting"
• 👥 Add contacts - say "add a contact"
• 🎤 Voice commands - long press the microphone button
• 💬 Chat like we're doing now!

Try asking me naturally, like "schedule a meeting with John tomorrow at 2pm"`;
    }
    else {
      response = `I understand you said: "${message}"

I can help you with:
• Scheduling meetings
• Managing contacts

Try saying something like "schedule a meeting" or "add a contact"!`;
    }

    addMessageToChat(response, 'sam');
  }, [handleSmartMeetingFlow, createMeetingFromFlow, contacts, meetings]);


  // Determine the dynamic style for the assistant button
  const assistantButtonDynamicStyle = isDragging ? position : {};
  const chatModalDynamicClass = `sam-chat-content-${corner}`;


  // --- Render ---
  return (
    <>
      <div
        className={clsx("ai-assistant", corner, { 'dragging': isDragging })}
        ref={assistantRef}
        style={assistantButtonDynamicStyle}
      >
        <div
          className={clsx("assistant-button", { 'recording': isRecording })}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="sam-avatar">
            <svg className="sam-network-logo" width="60" height="60" viewBox="0 0 120 120">
              <g className="network-connections">
                <line x1="60" y1="20" x2="60" y2="100" stroke="#3B5998" strokeWidth="1.5" opacity="0.6" />
                <line x1="20" y1="60" x2="100" y2="60" stroke="#3B5998" strokeWidth="1.5" opacity="0.6" />
                <line x1="30" y1="30" x2="90" y2="90" stroke="#3B5998" strokeWidth="1.5" opacity="0.6" />
                <line x1="90" y1="30" x2="30" y2="90" stroke="#3B5998" strokeWidth="1.5" opacity="0.6" />
                <line x1="60" y1="20" x2="90" y2="30" stroke="#3B5998" strokeWidth="1" opacity="0.4" />
                <line x1="90" y1="30" x2="100" y2="60" stroke="#3B5998" strokeWidth="1" opacity="0.4" />
                <line x1="100" y1="60" x2="90" y2="90" stroke="#3B5998" strokeWidth="1" opacity="0.4" />
                <line x1="90" y1="90" x2="60" y2="100" stroke="#3B5998" strokeWidth="1" opacity="0.4" />
                <line x1="60" y1="100" x2="30" y2="90" stroke="#3B5998" strokeWidth="1" opacity="0.4" />
                <line x1="30" y1="90" x2="20" y2="60" stroke="#3B5998" strokeWidth="1" opacity="0.4" />
                <line x1="20" y1="60" x2="30" y2="30" stroke="#3B5998" strokeWidth="1" opacity="0.4" />
                <line x1="30" y1="30" x2="60" y2="20" stroke="#3B5998" strokeWidth="1" opacity="0.4" />
                <line x1="45" y1="45" x2="60" y2="60" stroke="#3B5998" strokeWidth="1" opacity="0.5" />
                <line x1="75" y1="45" x2="60" y2="60" stroke="#3B5998" strokeWidth="1" opacity="0.5" />
                <line x1="75" y1="75" x2="60" y2="60" stroke="#3B5998" strokeWidth="1" opacity="0.5" />
                <line x1="45" y1="75" x2="60" y2="60" stroke="#3B5998" strokeWidth="1" opacity="0.5" />
              </g>
              <g className="network-nodes">
                <circle cx="60" cy="20" r="4" fill="#3B5998" stroke="white" strokeWidth="1.5" />
                <circle cx="90" cy="30" r="3.5" fill="#3B5998" stroke="white" strokeWidth="1.5" />
                <circle cx="100" cy="60" r="4" fill="#3B5998" stroke="white" strokeWidth="1.5" />
                <circle cx="90" cy="90" r="3.5" fill="#3B5998" stroke="white" strokeWidth="1.5" />
                <circle cx="60" cy="100" r="4" fill="#3B5998" stroke="white" strokeWidth="1.5" />
                <circle cx="30" cy="90" r="3.5" fill="#3B5998" stroke="white" strokeWidth="1.5" />
                <circle cx="20" cy="60" r="4" fill="#3B5998" stroke="white" strokeWidth="1.5" />
                <circle cx="30" cy="30" r="3.5" fill="#3B5998" stroke="white" strokeWidth="1.5" />
                <circle cx="45" cy="45" r="3" fill="#3B5998" stroke="white" strokeWidth="1" />
                <circle cx="75" cy="45" r="3" fill="#3B5998" stroke="white" strokeWidth="1" />
                <circle cx="75" cy="75" r="3" fill="#3B5998" stroke="white" strokeWidth="1" />
                <circle cx="45" cy="75" r="3" fill="#3B5998" stroke="white" strokeWidth="1" />
              </g>
              <g className="central-eye">
                <ellipse cx="60" cy="60" rx="18" ry="12" fill="none" stroke="#3B5998" strokeWidth="2" />
                <circle cx="60" cy="60" r="8" fill="#3B5998" />
                <circle cx="60" cy="60" r="4" fill="#1A2C5B" />
                <ellipse cx="62" cy="58" rx="2" ry="1.5" fill="white" opacity="0.8" />
              </g>
            </svg>
          </div>
        </div>
        <div className={clsx("voice-indicator", { 'active': isRecording || voiceText !== 'SAM is listening...' })}>
          <div className="voice-text">{voiceText}</div>
          <div className="voice-animation">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        </div>
      </div>

      {/* SAM Chat Modal */}
      {/* The main modal container handles the overlay and general positioning */}
      <div className={clsx("modal", { 'active': isChatOpen })} id="samChatModal" onClick={toggleSAMChat}>
        {/* The actual chat content box, positioned by its own classes */}
        <div className={clsx("modal-content sam-chat-content", chatModalDynamicClass, { 'dark-mode-chat-modal': isDarkMode, 'light-mode-chat-modal': !isDarkMode })} onClick={(e) => e.stopPropagation()}>
          <div className="modal-header sam-chat-header">
            <div className="sam-chat-title">
              <div className="sam-mini-avatar">
                <svg className="sam-network-logo-mini" width="32" height="32" viewBox="0 0 120 120">
                  <g className="network-connections">
                    <line x1="60" y1="25" x2="60" y2="95" stroke="#3B5998" strokeWidth="2" opacity="0.6" />
                    <line x1="25" y1="60" x2="95" y2="60" stroke="#3B5998" strokeWidth="2" opacity="0.6" />
                    <line x1="35" y1="35" x2="85" y2="85" stroke="#3B5998" strokeWidth="1.5" opacity="0.5" />
                    <line x1="85" y1="35" x2="35" y2="85" stroke="#3B5998" strokeWidth="1.5" opacity="0.5" />
                  </g>
                  <g className="network-nodes">
                    <circle cx="60" cy="25" r="3" fill="#3B5998" stroke="white" strokeWidth="1" />
                    <circle cx="95" cy="60" r="3" fill="#3B5998" stroke="white" strokeWidth="1" />
                    <circle cx="60" cy="95" r="3" fill="#3B5998" stroke="white" strokeWidth="1" />
                    <circle cx="25" cy="60" r="3" fill="#3B5998" stroke="white" strokeWidth="1" />
                    <circle cx="35" cy="35" r="2.5" fill="#3B5998" stroke="white" strokeWidth="1" />
                    <circle cx="85" cy="35" r="2.5" fill="#3B5998" stroke="white" strokeWidth="1" />
                    <circle cx="85" cy="85" r="2.5" fill="#3B5998" stroke="white" strokeWidth="1" />
                    <circle cx="35" cy="85" r="2.5" fill="#3B5998" stroke="white" strokeWidth="1" />
                  </g>
                  <g className="central-eye">
                    <ellipse cx="60" cy="60" rx="15" ry="10" fill="none" stroke="#3B5998" strokeWidth="2" />
                    <circle cx="60" cy="60" r="6" fill="#3B5998" />
                    <circle cx="60" cy="60" r="3" fill="#1A2C5B" />
                    <ellipse cx="61" cy="59" rx="1.5" ry="1" fill="white" opacity="0.8" />
                  </g>
                </svg>
              </div>
              <h3>SAM Assistant</h3>
            </div>
          <span className="close" onClick={toggleSAMChat}>&times;</span>
          </div>
          <div className="sam-chat-body">
            <div className="chat-messages" ref={chatMessagesRef}>
              {chatMessages.map((msg, index) => (
                <div key={index} className={clsx("message", `${msg.sender}-message`)}>
                  <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.content }}></div>
                  <div className="message-time">{msg.time}</div>
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <div className="chat-input-wrapper">
                <input
                  type="text"
                  id="chatInput"
                  placeholder="Type your message...."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => { if (e.key === 'Enter') sendMessage(); }}
                />
                <button className="send-btn" onClick={sendMessage}>
                  <i className="fas fa-paper-plane"></i>
                </button>
                <button
                  className={clsx("voice-btn", { 'recording': isChatVoiceRecording })}
                  title="Hold to record voice message"
                  onMouseDown={startChatVoiceRecording}
                  onMouseUp={stopChatVoiceRecording}
                  onMouseLeave={stopChatVoiceRecording}
                  onTouchStart={startChatVoiceRecording}
                  onTouchEnd={stopChatVoiceRecording}
                >
                  <i className="fas fa-microphone"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meeting and Contact Modals */}
      <MeetingModal isOpen={showMeetingModal} onClose={() => setShowMeetingModal(false)} onSaveMeeting={handleSaveMeeting} isDarkMode={isDarkMode} />
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} onSaveContact={handleSaveContact} isDarkMode={isDarkMode} />
    </>
  );
};

export default SamAssistant;
