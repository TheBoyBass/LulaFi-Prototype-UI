import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  body?: string;
  id?: string;
  align?: "left" | "center";
  className?: string;
}

/** Shared heading block so every landing page uses the same rhythm and scale. */
export default function SectionHeading({
  eyebrow,
  title,
  body,
  id,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>
      )}
      <h2 id={id} className={cn("text-3xl font-bold tracking-tight sm:text-4xl", eyebrow && "mt-3")}>
        {title}
      </h2>
      {body && <p className="mt-4 text-lg leading-relaxed text-text-secondary">{body}</p>}
    </div>
  );
}
