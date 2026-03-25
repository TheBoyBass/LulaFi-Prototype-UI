import { useState } from "react";
import StatusBar from "@/components/lulafi/StatusBar";
import BackButton from "@/components/lulafi/BackButton";
import { Send, Paperclip, Lock, MessageCircle, CheckCheck } from "lucide-react";

interface Message {
  text: string;
  outgoing: boolean;
  time: string;
}

const ChatConvoScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { text, outgoing: true, time }]);
    setInput("");
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });
      setMessages(prev => [...prev, { text: "Thanks for reaching out! A representative will assist you shortly.", outgoing: false, time: replyTime }]);
    }, 1000);
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-bg-primary">
      <StatusBar />
      <div className="flex items-center px-6 pb-4 border-b border-border shrink-0">
        <BackButton to="chat" />
        <div className="w-[38px] h-[38px] rounded-full bg-destructive flex items-center justify-center text-foreground text-[13px] font-semibold ml-3">TS</div>
        <div className="flex-1 pl-2">
          <div className="text-sm font-medium text-text-primary">TechNova Solutions</div>
          <div className="text-[11px] text-success flex items-center gap-1"><Lock size={10} /> End-to-end encrypted</div>
        </div>
      </div>
      <div className="flex-1 px-6 py-4 flex flex-col overflow-y-auto hide-scrollbar">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-bg-tertiary border border-border flex items-center justify-center">
              <MessageCircle size={26} className="text-text-muted" />
            </div>
            <div>
              <div className="text-lg font-medium text-text-primary mb-2">No messages yet</div>
              <div className="text-sm text-text-secondary max-w-[200px] mx-auto">Send your first message to TechNova Solutions</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className="flex flex-col">
                <div className={`max-w-[76%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                  m.outgoing
                    ? "bg-brand text-primary-foreground self-end rounded-br-md"
                    : "bg-bg-tertiary text-text-primary self-start border border-border rounded-bl-md"
                }`}>
                  {m.text}
                </div>
                <div className={`text-[11px] text-text-muted mt-0.5 ${m.outgoing ? "text-right" : ""}`}>
                  {m.time}{m.outgoing ? <span className="inline-flex ml-1"><CheckCheck size={12} /></span> : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-bg-secondary border-t border-border px-4 py-3 pb-4 flex items-center gap-3 shrink-0">
        <Paperclip size={18} className="text-text-muted cursor-pointer" />
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-bg-tertiary border border-border rounded-full px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-brand transition-colors"
        />
        <button onClick={sendMessage} className="w-[38px] h-[38px] rounded-full bg-brand flex items-center justify-center cursor-pointer shrink-0 border-none hover:bg-brand-hover transition-colors">
          <Send size={16} className="text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};

export default ChatConvoScreen;
