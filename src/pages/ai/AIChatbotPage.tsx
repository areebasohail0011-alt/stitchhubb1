import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Scissors, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const AIChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hello! I'm Stitchy, your dedicated StitchHub AI Fashion & Tailoring Assistant. Ask me anything about taking accurate measurements, suit fabrics, doorstep pickup, or custom stitching!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "How do I take accurate chest & waist measurements?",
    "What fabric is best for an outdoor summer suit?",
    "How does doorstep courier fabric pickup work?",
    "What is StitchHub's 100% Fit Guarantee?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (queryToSend?: string) => {
    const text = queryToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryToSend) setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || "I'm Stitchy, your tailoring assistant. I can help with measurements, fabrics, or order status!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "Stitchy AI: For bespoke tailoring, we recommend selecting your tailor first, then specifying your body measurements. How else may I assist you with your order?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      
      {/* Header */}
      <div className="card-gradient text-white py-8 px-4 sm:px-6 lg:px-8 shadow-xl shadow-purple-500/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight">Stitchy AI Assistant</h1>
                <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md border border-white/30 text-white px-2.5 py-0.5 rounded-full">
                  Gemini API Powered
                </span>
              </div>
              <p className="text-xs text-purple-100">24/7 Expert Tailoring & Style Advice</p>
            </div>
          </div>

          <Link
            to="/customer"
            className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl border border-white/20 transition-all flex items-center gap-1.5 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Chat Window Box */}
        <div className="glass rounded-[32px] border border-white/60 shadow-xl flex flex-col h-[600px] overflow-hidden">
          
          {/* Quick Prompts Pills */}
          <div className="p-3 bg-white/30 backdrop-blur-md border-b border-white/40 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-bold text-purple-900 uppercase shrink-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Quick Prompts:
            </span>
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp)}
                className="text-[11px] font-semibold glass-card text-purple-900 px-3.5 py-1.5 rounded-full border border-white/80 hover:bg-purple-600 hover:text-white transition-all shrink-0 shadow-2xs"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 font-bold text-xs shadow-xs ${
                    msg.sender === 'user' ? 'bg-purple-600 text-white' : 'card-gradient text-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-3xl text-xs space-y-1 shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-white/70 backdrop-blur-md text-slate-800 rounded-tl-none border border-white/80'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <span className={`text-[9px] block text-right font-medium ${msg.sender === 'user' ? 'text-purple-200' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-purple-700 font-semibold p-3 glass-dark rounded-2xl max-w-xs border border-white/50 animate-pulse">
                <Bot className="w-4 h-4 text-pink-500 animate-spin" />
                <span>Stitchy is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-4 bg-white/20 backdrop-blur-md border-t border-white/40 flex items-center gap-3"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask Stitchy about measurements, fabrics, or orders..."
              className="flex-1 glass-input rounded-2xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="px-5 py-3 rounded-2xl card-gradient text-white text-xs font-bold shadow-md hover:scale-105 transition-transform disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
