import React, { useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../store';

const ChatModal = () => {
    const [message, setMessage] = useState('');
    const { state, dispatch } = useContext(StoreContext);
    const { conversationHistory, error } = state;
  
    const handleMessageChange = (event) => {
      setMessage(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post(
          'https://jsonplaceholder.typicode.com/posts',
          { message }
        );
  
        const botReply = response.data.title;
  
        dispatch({ type: 'ADD_MESSAGE', payload: { message, botReply } });
  
        setMessage('');
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            placeholder="Type your question..."
            className="border border-gray-300 rounded p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
          >
            Send
          </button>
        </form>
        {conversationHistory.map((entry, index) => (
          <div key={index} className="mb-2">
            <strong>You:</strong> {entry.message}<br />
            <strong>ChatGPT:</strong> {entry.botReply}
          </div>
        ))}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    );
  };
  
  export default ChatModal;
