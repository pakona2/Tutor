
import React, { useState, useEffect } from 'react';

const Messages = ({ tutorId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Load messages for this tutor from localStorage
    const key = tutorId ? `messages_${tutorId}` : 'messages';
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    setMessages(stored);
  }, [tutorId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now(),
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleString()
    };
    const updated = [...messages, msg];
    setMessages(updated);
    const key = tutorId ? `messages_${tutorId}` : 'messages';
    localStorage.setItem(key, JSON.stringify(updated));
    setNewMessage('');
  };

  // WhatsApp-like full screen chat UI with tutor profile card
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#f0f2f5',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
      {/* Tutor profile card at top right */}
      <div style={{
        position: 'absolute',
        top: 24,
        right: 32,
        background: '#fff',
        borderRadius: 14,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        padding: '18px 24px',
        minWidth: 220,
        textAlign: 'center',
        zIndex: 1100,
      }}>
        <img
          src={`https://ui-avatars.com/api/?name=Tutor+${tutorId}`}
          alt="Avatar"
          style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: 8 }}
        />
        <div style={{fontWeight:'bold', color:'#2563eb', fontSize:'1.1rem'}}>Tutor {tutorId}</div>
        <div style={{color:'#888', fontSize:'0.95rem'}}>Online</div>
      </div>
      {/* Chat header */}
      <div style={{width:'100%', maxWidth:600, padding: '16px 16px 8px 16px', borderBottom: '1px solid #e5e7eb', background:'#2563eb', color:'#fff', fontWeight:'bold', fontSize:'1.1rem', position:'relative'}}>
        {tutorId ? `Chat with Tutor ${tutorId}` : 'Messages'}
      </div>
      {/* Chat messages */}
      <div style={{flex:1, width:'100%', maxWidth:600, overflowY:'auto', padding:'24px 16px 100px 16px', background:'#f0f2f5'}}>
        {messages.length === 0 ? (
          <p style={{color:'#888'}}>No messages yet.</p>
        ) : (
          messages.map(msg => (
            <div key={msg.id} style={{
              display:'flex',
              flexDirection:'column',
              alignItems: msg.sender === 'You' ? 'flex-end' : 'flex-start',
              marginBottom: 12
            }}>
              <div style={{
                background: msg.sender === 'You' ? '#dcf8c6' : '#fff',
                color:'#222',
                borderRadius:'18px',
                padding:'10px 16px',
                maxWidth:'70%',
                boxShadow:'0 1px 4px rgba(0,0,0,0.07)',
                fontSize:'1rem',
                wordBreak:'break-word',
              }}>
                {msg.message}
              </div>
              <div style={{fontSize: '0.85rem', color: '#999', marginTop:4}}>{msg.timestamp}</div>
            </div>
          ))
        )}
      </div>
      {/* Input bar fixed at bottom */}
      <div style={{
        width:'100%',
        maxWidth:600,
        display:'flex',
        alignItems:'center',
        padding:'16px',
        borderTop:'1px solid #e5e7eb',
        background:'#fff',
        position:'fixed',
        bottom:0,
        left:'50%',
        transform:'translateX(-50%)',
      }}>
        <input
          type="text"
          className="input"
          placeholder="Type a message..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          style={{flex:1, marginRight:8, borderRadius:24, padding:'10px 16px', border:'1px solid #cbd5e1', fontSize:'1rem', background:'#f3f4f6'}}
        />
        <button
          className="button"
          style={{background:'#25d366', color:'#fff', borderRadius:'50%', width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', marginRight:8, border:'none', boxShadow:'0 2px 8px rgba(37,99,235,0.08)'}}
          onClick={handleSendMessage}
        >
          &#9658;
        </button>
        <button
          className="button"
          style={{background:'#128c7e', color:'#fff', borderRadius:'50%', width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', border:'none', boxShadow:'0 2px 8px rgba(37,99,235,0.08)'}}
          title="Record (not implemented)"
        >
          <span role="img" aria-label="mic">🎤</span>
        </button>
      </div>
    </div>
  );
};

    
const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  messageBox: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sender: {
    fontWeight: 'bold',
  },
  message: {
    marginVertical: 4,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  };

export default Messages;
   /*{/* const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/messages', {
        content: newMessage,
      });
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Messages</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};*/

