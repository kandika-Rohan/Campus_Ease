
// import './ChatBox.css';
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io("http://localhost:4000", {
//   transports: ["polling", "websocket"]
// });

// function ChatBox({ productId, sellerId }) {
//   const [message, setMessage] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);

//   useEffect(() => {
//     // Join the chat room for this product
//     socket.emit('join_chat', { productId, sellerId });

//     // Fetch the chat history
//     socket.emit("fetch_chat_history", productId);

//     // Listen for the chat history and new messages
//     socket.on("chat_history", (history) => {
//       setChatMessages(history);  // Set the chat history
//     });

//     socket.on('receive_message', (data) => {
//       setChatMessages((prevMessages) => [...prevMessages, data.message]);  // Add new message to chat history
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, [productId, sellerId]);

//   const sendMessage = () => {
//     if (message.trim() !== "") {
//       socket.emit('send_message', { productId, message, sellerId });
//       setMessage("");  // Clear the input field
//     }
//   };

//   return (
//     <div className="chatbox">
//       <div className="chatbox-header">
//         <h4>Chat with Seller</h4>
//       </div>
//       <div className="chatbox-messages">
//         {chatMessages.map((msg, index) => (
//           <div key={index} className="chatbox-message">
//             {/* Render the message, you can customize it with more details */}
//             <strong>{msg.sellerId}</strong>: {msg.message}
//             <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
//           </div>
//         ))}
//       </div>
//       <div className="chatbox-input">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message"
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default ChatBox;


import './ChatBox.css';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

const socket = io("http://localhost:4000", {
  transports: ["polling", "websocket"]
});

function ChatBox({ productId, sellerId }) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.emit('join_chat', { productId, sellerId });
    socket.emit("fetch_chat_history", productId);

    socket.on("chat_history", (history) => {
      setChatMessages(history);
    });

    socket.on('receive_message', (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [productId, sellerId]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit('send_message', { productId, message, sellerId });
      setMessage("");
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">Chat with Seller</div>
      <div className="chatbox-messages">
        {chatMessages.map((msg, index) => (
          <div 
            key={index} 
            className={`chatbox-message ${msg.senderId === sellerId ? 'seller-message' : 'user-message'}`}
          >
            <strong>{msg.senderName}</strong>: {msg.message}
            <small>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
          </div>
        ))}
      </div>
      <div className="chatbox-input">
        <InputGroup>
          <FormControl
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
          />
          <Button variant="primary" onClick={sendMessage}>
            <FaPaperPlane />
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}

export default ChatBox;
