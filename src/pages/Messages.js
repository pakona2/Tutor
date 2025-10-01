
import React, { useState, useEffect } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Load messages from localStorage
    const stored = JSON.parse(localStorage.getItem('messages') || '[]');
    setMessages(stored);
  }, []);

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
    localStorage.setItem('messages', JSON.stringify(updated));
    setNewMessage('');
  };

  return (
    <div className="card" style={{marginTop: 24}}>
      <h2 style={{marginBottom: 16}}>Messages</h2>
      <div style={{maxHeight: 200, overflowY: 'auto', marginBottom: 16}}>
        {messages.length === 0 ? (
          <p style={{color:'#888'}}>No messages yet.</p>
        ) : (
          messages.map(msg => (
            <div key={msg.id} style={{marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8}}>
              <strong>{msg.sender}:</strong> <span>{msg.message}</span>
              <div style={{fontSize: '0.85rem', color: '#999'}}>{msg.timestamp}</div>
            </div>
          ))
        )}
      </div>
      <input
        type="text"
        className="input"
        placeholder="Type a message..."
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        style={{marginBottom: 8}}
      />
      <button className="button" style={{width: 'auto', padding: '8px 20px'}} onClick={handleSendMessage}>Send</button>
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

