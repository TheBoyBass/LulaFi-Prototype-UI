import { useEffect, useMemo, useRef, useState } from "react";
import ProviderLayout from "@/components/lulafi/ProviderLayout";
import { useApp } from "@/context/AppContext";
import { getSubmissionByRef, semStatusStyles } from "@/data/provider";
import { findSemThread, kindLabel, SemMessage, SemMember } from "@/data/semConversations";
import {
  ChevronLeft,
  Paperclip,
  Mic,
  Send,
  CheckCheck,
  Users,
  FileText,
  MessageCircle,
  AtSign,
  Lock,
} from "lucide-react";

/** Renders @handles inside a message body as brand-coloured chips */
const MessageBody = ({ text, members }: { text: string; members: SemMember[] }) => {
  const handles = new Set(members.map(m => m.handle));
  return (
    <>
      {text.split(/(@[a-z0-9_]+)/gi).map((part, i) => {
        const isMention = part.startsWith("@") && handles.has(part.slice(1).toLowerCase());
        return isMention ? (
          <span key={i} className="font-semibold text-brand">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
};

const ProviderConvoScreen = () => {
  const { activeSemThreadId, navigateProvider, openSubmission } = useApp();
  const thread = useMemo(() => findSemThread(activeSemThreadId), [activeSemThreadId]);
  const { row, group, members, submissionRef } = thread;

  const [messages, setMessages] = useState<SemMessage[]>(thread.messages);
  const [draft, setDraft] = useState("");
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(thread.messages);
    setDraft("");
    setMentionQuery(null);
  }, [thread]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

  const submission = getSubmissionByRef(submissionRef);
  const isGroup = row.kind === "GROUP";
  const isForm = row.kind === "FORM";
  const Icon = isForm ? FileText : isGroup ? Users : MessageCircle;

  const suggestions = useMemo(() => {
    if (mentionQuery === null) return [];
    const q = mentionQuery.toLowerCase();
    return members
      .filter(m => !q || m.handle.includes(q) || m.name.toLowerCase().includes(q))
      .slice(0, 5);
  }, [mentionQuery, members]);

  const onDraftChange = (value: string) => {
    setDraft(value);
    const match = /(?:^|\s)@([a-z0-9_]*)$/i.exec(value);
    setMentionQuery(match ? match[1] : null);
  };

  const applyMention = (member: SemMember) => {
    const next = draft.replace(/@([a-z0-9_]*)$/i, `@${member.handle} `);
    setDraft(next);
    setMentionQuery(null);
    inputRef.current?.focus();
  };

  const mentionedNames = (text: string) =>
    members.filter(m => new RegExp(`@${m.handle}\\b`, "i").test(text)).map(m => m.name);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const mentions = mentionedNames(text);
    setMessages(prev => [
      ...prev,
      {
        id: `m${prev.length + 1}`,
        author: "You",
        authorInitials: "MD",
        side: "out",
        text,
        time,
        delivered: true,
      },
      ...(isGroup && mentions.length
        ? [
            {
              id: `m${prev.length + 2}`,
              author: "System",
              authorInitials: "",
              side: "in" as const,
              system: true,
              text: `Notified ${mentions.join(", ")}`,
              time,
            },
          ]
        : []),
    ]);
    setDraft("");
    setMentionQuery(null);
  };

  return (
    <ProviderLayout
      title="Conversation"
      activeTab="sem"
      hideBanner
      footer={
      <div className="relative px-6 pt-2 pb-3">
        {suggestions.length > 0 && (
          <div className="absolute bottom-full mb-2 w-full overflow-hidden rounded-xl border border-border-primary bg-bg-secondary shadow-lg">
            {suggestions.map((m, i) => (
              <button
                key={m.id}
                onClick={() => applyMention(m)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left cursor-pointer hover:bg-brand/[0.06] ${
                  i > 0 ? "border-t border-border-primary" : ""
                }`}
              >
                <span className="w-7 h-7 shrink-0 rounded-full bg-bg-tertiary border border-border-primary flex items-center justify-center text-[9px] font-semibold text-text-secondary">
                  {m.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-medium text-text-primary">{m.name}</span>
                  <span className="block truncate text-[10px] text-text-muted">{m.role}</span>
                </span>
                <span className="shrink-0 text-[10px] text-brand">@{m.handle}</span>
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={e => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-2 rounded-full border border-border-primary bg-bg-secondary px-4 py-2.5"
        >
          <Paperclip size={16} className="shrink-0 text-text-muted" />
          <input
            ref={inputRef}
            value={draft}
            onChange={e => onDraftChange(e.target.value)}
            placeholder={isGroup ? "Message the team, use @ to mention" : "Type a message"}
            className="min-w-0 flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted"
          />
          <button
            type="button"
            aria-label="Mention someone"
            onClick={() => onDraftChange(`${draft}${draft && !draft.endsWith(" ") ? " " : ""}@`)}
            className="shrink-0 text-text-muted cursor-pointer hover:text-brand transition-colors"
          >
            <AtSign size={16} />
          </button>
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
      }
    >
      <div className="flex min-h-full flex-col px-6 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateProvider("psem")}
            aria-label="Back to LulaSEM"
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
              {isGroup ? row.name : `${group.name} · ${row.name}`}
            </h1>
            <div className="truncate text-[11px] text-text-secondary">
              {isGroup ? `${members.length - 1} members` : row.subtitle}
            </div>
          </div>
          <span className="shrink-0 rounded-sm border border-brand/30 bg-brand/10 px-2 py-0.5 text-[9px] font-semibold text-brand">
            {kindLabel(row.kind)}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1 text-[10px] text-success">
          <Lock size={10} /> End-to-end encrypted
        </div>

        {isForm && (
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-border-primary bg-bg-secondary p-3">
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm text-text-primary">
                {row.name} · {submissionRef}
              </div>
              {row.status && (
                <div className={`text-[10px] font-semibold ${semStatusStyles[row.status] ?? "text-text-muted"}`}>
                  {row.status}
                </div>
              )}
            </div>
            <button
              onClick={() => submission && openSubmission(submission.id)}
              disabled={!submission}
              className="shrink-0 rounded-md border border-border-primary px-3 py-1.5 text-xs font-medium text-text-primary cursor-pointer hover:border-brand transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              View Submission
            </button>
          </div>
        )}

        {isGroup && (
          <div className="mt-3 rounded-lg border border-border-primary bg-bg-secondary p-3">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-text-muted">
              <Users size={12} /> Team members
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {members
                .filter(m => m.handle !== "team")
                .map(m => (
                  <button
                    key={m.id}
                    onClick={() => onDraftChange(`${draft}${draft && !draft.endsWith(" ") ? " " : ""}@${m.handle} `)}
                    className="flex items-center gap-1.5 rounded-full border border-border-primary bg-bg-tertiary px-2.5 py-1 text-[11px] text-text-secondary cursor-pointer hover:border-brand transition-colors"
                  >
                    <span className="text-[9px] font-semibold text-text-primary">{m.initials}</span>
                    @{m.handle}
                  </button>
                ))}
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-1 flex-col gap-4">
          {messages.length === 0 && (
            <div className="mt-8 text-center text-sm text-text-muted">
              No messages yet in this conversation.
            </div>
          )}
          {messages.map(m =>
            m.system ? (
              <div key={m.id} className="self-center text-center text-[10px] text-text-muted">
                {m.text}
              </div>
            ) : (
              <div key={m.id} className={m.side === "out" ? "self-end" : "self-start"}>
                {isGroup && m.side === "in" && (
                  <div className="mb-1 text-[10px] font-medium text-text-secondary">{m.author}</div>
                )}
                <div
                  className={`max-w-[260px] rounded-xl px-3.5 py-2.5 text-sm ${
                    m.side === "out"
                      ? "bg-brand/10 text-text-primary"
                      : "bg-bg-tertiary text-text-primary"
                  }`}
                >
                  <MessageBody text={m.text} members={members} />
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
    </ProviderLayout>
  );
};

export default ProviderConvoScreen;
