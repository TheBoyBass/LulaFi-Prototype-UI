import { useEffect, useMemo, useRef, useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import AppHeader from "@/components/lulafi/AppHeader";
import { useApp } from "@/context/AppContext";
import { getProvider } from "@/data/providers";
import { statusStyles } from "@/data/lulasem";
import { findClientThread, ClientMessage } from "@/data/clientConversations";
import {
  ChevronLeft,
  Paperclip,
  Mic,
  Send,
  CheckCheck,
  MessageCircle,
  FileText,
  Lock,
} from "lucide-react";

const ChatConvoScreen = () => {
  const { activeClientConvoId, activeProviderId, navigate } = useApp();
  const provider = getProvider(activeProviderId);

  const thread = useMemo(() => findClientThread(activeClientConvoId), [activeClientConvoId]);
  const { row, group } = thread;

  // A conversation started from a provider detail page has no seeded thread
  const adHoc = !activeClientConvoId;
  const partnerName = adHoc ? provider?.name ?? "New conversation" : group.name;
  const isForm = !adHoc && row.kind === "form";
  const Icon = isForm ? FileText : MessageCircle;

  const [messages, setMessages] = useState<ClientMessage[]>(adHoc ? [] : thread.messages);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(adHoc ? [] : thread.messages);
    setDraft("");
  }, [thread, adHoc]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [
      ...prev,
      { id: `s${prev.length + 1}`, author: "You", side: "out", text, time, delivered: true },
    ]);
    setDraft("");
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages(prev => [
        ...prev,
        {
          id: `s${prev.length + 1}`,
          author: partnerName,
          side: "in",
          text: isForm
            ? "Thanks, we have added this to the form record and will update the status."
            : "Thanks for reaching out! A representative will assist you shortly.",
          time: replyTime,
        },
      ]);
    }, 1000);
  };

  const composer = (
    <div className="px-6 pt-2 pb-3">
      <form
        onSubmit={e => {
          e.preventDefault();
          send();
        }}
        className="flex items-center gap-2 rounded-full border border-border-primary bg-bg-secondary px-4 py-2.5"
      >
        <Paperclip size={16} className="shrink-0 text-text-muted" />
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="Type a message"
          className="min-w-0 flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted"
        />
        <Mic size={16} className="shrink-0 text-text-muted" />
        <button
          type="submit"
          aria-label="Send message"
          className="w-9 h-9 shrink-0 rounded-full bg-brand flex items-center justify-center text-bg-primary cursor-pointer"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );

  return (
    <ScreenLayout
      activeTab={adHoc ? "discover" : "services"}
      header={<AppHeader title="Conversation" />}
      footer={composer}
    >
      <div className="flex min-h-full flex-col px-6 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(adHoc && provider ? "org" : "svc")}
            aria-label="Back"
            className="w-[34px] h-[34px] shrink-0 rounded-lg bg-bg-tertiary border border-border-primary flex items-center justify-center cursor-pointer text-text-primary"
          >
            <ChevronLeft size={18} />
          </button>
          <div
            className={`w-9 h-9 shrink-0 rounded-md flex items-center justify-center ${
              isForm ? "bg-info/10" : "bg-brand/10"
            }`}
          >
            <Icon size={16} className={isForm ? "text-info" : "text-brand"} />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold text-text-primary">
              {adHoc ? partnerName : `${group.name} · ${row.title}`}
            </h1>
            <div className="truncate text-[11px] text-text-secondary">
              {adHoc ? "General conversation" : isForm ? row.ref : group.type}
            </div>
          </div>
          <span className="shrink-0 rounded-sm border border-brand/30 bg-brand/10 px-2 py-0.5 text-[9px] font-semibold text-brand">
            {isForm ? "FORM" : "GENERAL"}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1 text-[10px] text-success">
          <Lock size={10} /> End-to-end encrypted
        </div>

        {isForm && (
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-border-primary bg-bg-secondary p-3">
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm text-text-primary">
                {row.title} · {row.ref}
              </div>
              {row.status && (
                <div className={`text-[10px] font-semibold ${statusStyles[row.status] ?? "text-text-muted"}`}>
                  {row.status}
                </div>
              )}
            </div>
            <button
              onClick={() => navigate("mf")}
              className="shrink-0 rounded-md border border-border-primary px-3 py-1.5 text-xs font-medium text-text-primary cursor-pointer hover:border-brand transition-colors"
            >
              View form
            </button>
          </div>
        )}

        <div className="mt-5 flex flex-1 flex-col gap-4">
          {messages.length === 0 && (
            <div className="mt-8 text-center text-sm text-text-muted">
              No messages yet. Send your first message to {partnerName}.
            </div>
          )}
          {messages.map(m =>
            m.system ? (
              <div key={m.id} className="self-center text-center text-[10px] text-text-muted">
                {m.text}
              </div>
            ) : (
              <div key={m.id} className={m.side === "out" ? "self-end" : "self-start"}>
                {m.side === "in" && (
                  <div className="mb-1 text-[10px] font-medium text-text-secondary">{m.author}</div>
                )}
                <div
                  className={`max-w-[260px] rounded-xl px-3.5 py-2.5 text-sm ${
                    m.side === "out" ? "bg-brand/10 text-text-primary" : "bg-bg-tertiary text-text-primary"
                  }`}
                >
                  {m.text}
                </div>
                <div
                  className={`mt-1 flex items-center gap-1 text-[10px] text-text-muted ${
                    m.side === "out" ? "justify-end" : ""
                  }`}
                >
                  {m.delivered && <span>Delivered ·</span>}
                  {m.time}
                  {m.delivered && <CheckCheck size={12} className="text-brand" />}
                </div>
              </div>
            )
          )}
          <div ref={endRef} />
        </div>
      </div>
    </ScreenLayout>
  );
};

export default ChatConvoScreen;
