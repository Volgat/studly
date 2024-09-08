import React, { useState } from 'react';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { type: 'user', content: input }]);
      // Simulate AI response
      setTimeout(() => {
        setMessages(msgs => [...msgs, { type: 'ai', content: `Voici une réponse à "${input}"` }]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-80">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Chat IA</h3>
            <button onClick={() => setIsOpen(false)}>&times;</button>
          </div>
          <div className="h-80 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded ${msg.type === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="border-t p-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              className="w-full p-2 border rounded"
            />
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg"
        >
          Chat IA
        </button>
      )}
    </div>
  );
};

export default AIChat;
