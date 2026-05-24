import { useState, useRef, useEffect } from 'react';
import { vocabulary, processMessage, CULTURAL } from '../data/vocabulary.js';
import './ChatBot.css';

const INITIAL_MESSAGES = [
  {
    id: 0,
    from: 'bot',
    text: "Naggangbi! (Hello!) I'm your Dharawal language guide.\n\nI can translate English words and simple phrases into Dharawal, or look up any Dharawal word.\n\nTry:\n• \"translate kangaroo\"\n• \"what does buru mean?\"\n• \"show me animal words\"\n• \"tell me the Whale Dreaming story\"\n• \"how do you say sun?\"\n\nType any English or Dharawal word and I'll look it up.",
    time: new Date(),
  },
];

export default function ChatBot({ onBack }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), from: 'user', text, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processMessage(text, vocabulary);
      const botMsg = {
        id: Date.now() + 1,
        from: 'bot',
        text: response || "I'm not sure about that. Try asking me to translate a word!",
        time: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function formatText(text) {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  }

  function formatTime(date) {
    return date.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
  }

  const quickSuggestions = [
    'translate kangaroo',
    'show me animal words',
    'what does buru mean?',
    'Whale Dreaming story',
    'show me body words',
    'translate hello dog',
  ];

  return (
    <div className="chat">
      <div className="chat__header">
        <button className="chat__back" onClick={onBack} aria-label="Back">
          ‹
        </button>
        <div className="chat__header-info">
          <div className="chat__avatar-sm">D</div>
          <div>
            <h2 className="chat__header-title">Dharawal Translator</h2>
            <p className="chat__header-sub">Ngayagang Dharawal</p>
          </div>
        </div>
      </div>

      <div className="chat__disclaimer">
        <p>Limited educational vocabulary. Dharawal language and culture belong to Dharawal people.</p>
      </div>

      <div className="chat__messages">
        <div className="chat__date-label">Today</div>

        {messages.map(msg => (
          <div key={msg.id} className={`chat__msg chat__msg--${msg.from}`}>
            {msg.from === 'bot' && (
              <div className="chat__avatar">D</div>
            )}
            <div className="chat__bubble">
              <p className="chat__text">{formatText(msg.text)}</p>
              <span className="chat__time">{formatTime(msg.time)}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat__msg chat__msg--bot">
            <div className="chat__avatar">D</div>
            <div className="chat__bubble chat__bubble--typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className="chat__suggestions">
          {quickSuggestions.map(s => (
            <button key={s} className="chat__suggestion" onClick={() => setInput(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="chat__input-row">
        <input
          ref={inputRef}
          type="text"
          className="chat__input"
          placeholder="Write your message here"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          maxLength={200}
        />
        <button
          className="chat__send"
          onClick={sendMessage}
          disabled={!input.trim()}
          aria-label="Send"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
