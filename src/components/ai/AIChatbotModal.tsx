import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, RefreshCw, HelpCircle, Check, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../../types';

interface AIChatbotModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  inline?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_init',
    sender: 'assistant',
    text: "Hello! I'm Stitchy, your AI StitchHub Assistant! 🪡✨\n\nI can help you with:\n- Booking bespoke tailors & custom orders\n- Entering & saving body measurements\n- Doorstep fabric pickup & courier tracking\n- Fabric suggestions & fitting guidance\n\nWhat can I assist you with today?",
    timestamp: 'Just now'
  }
];

const QUICK_PROMPTS = [
  "How do I upload my measurements?",
  "How does doorstep fabric pickup work?",
  "How to track my stitching order?",
  "What is the best fabric for a summer gown?",
  "How to choose the right tailor?"
];

export const AIChatbotModal: React.FC<AIChatbotModalProps> = ({ isOpen = true, onClose, inline = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          messages: messages.concat(userMsg).map(m => ({
            role: m.sender,
            content: m.text
          }))
        })
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'assistant',
        text: data.reply || "I'm sorry, I couldn't process your request. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: data.isFallback
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Error fetching chat response:', err);
      const fallbackMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'assistant',
        text: "To place an order or track fabric pickup, navigate to **Browse Tailors** or **My Orders** in your dashboard. You can also save custom measurements under **Profile > Measurements**!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: true
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!inline && !isOpen) return null;

  const content = (
    <div className={`flex flex-col bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden ${inline ? 'h-[650px] w-full max-w-4xl mx-auto' : 'h-[580px] w-full sm:w-[420px]'}`}>
      
      {/* Chatbot Header */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 p-4 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm">Stitchy AI Assistant</h3>
              <span className="text-[10px] font-semibold bg-emerald-400/30 text-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Gemini AI
              </span>
            </div>
            <p className="text-[11px] text-purple-100">Tailoring, Order & Fit Guide</p>
          </div>
        </div>

        {!inline && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            title="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-purple-600'
                  : 'bg-gradient-to-tr from-pink-500 to-purple-600'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[82%] space-y-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-purple-100 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-slate-400 px-1">
                <span>{msg.timestamp}</span>
                {msg.isFallback && (
                  <span className="text-amber-600 font-medium">(Offline assistant mode)</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-purple-100 p-3 rounded-2xl rounded-tl-none text-xs text-purple-600 flex items-center gap-2 shadow-xs">
              <Sparkles className="w-4 h-4 animate-pulse text-pink-500" />
              <span>Stitchy is crafting an answer...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-2 bg-purple-50/60 border-t border-purple-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <HelpCircle className="w-3.5 h-3.5 text-purple-500 shrink-0" />
        {QUICK_PROMPTS.map((promptText, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(promptText)}
            disabled={isLoading}
            className="text-[11px] font-medium text-purple-700 bg-white border border-purple-200 px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-purple-600 hover:text-white transition-colors shrink-0 shadow-2xs"
          >
            {promptText}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-purple-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Stitchy about orders, measurements, tailors..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity shrink-0 shadow-md shadow-purple-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );

  if (inline) return content;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      {content}
    </div>
  );
};
