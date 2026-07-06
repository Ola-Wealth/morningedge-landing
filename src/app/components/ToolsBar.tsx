const tools = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Microsoft Copilot",
  "Perplexity",
  "Notion AI",
  "Canva AI",
  "Otter.ai",
];

export default function ToolsBar() {
  const row = [...tools, ...tools];
  return (
    <section className="bg-white border-y border-line py-8 overflow-hidden">
      <p className="text-center text-[12px] font-bold uppercase tracking-[2px] text-muted-text mb-5">
        The tools you&apos;ll command by week six
      </p>
      <div className="marquee-mask">
        <div className="marquee-track flex items-center gap-14 w-max">
          {row.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="text-navy/70 text-xl font-extrabold tracking-tight whitespace-nowrap"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
