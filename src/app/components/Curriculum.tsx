import FadeIn from "./FadeIn";

type Session = {
  num: string;
  type: "build" | "hotseat";
  label: string;
  title: string;
  promise: string;
  bullets: string[];
  outcome: string;
};

const sessions: Session[] = [
  {
    num: "01",
    type: "build",
    label: "Build Session",
    title: "Meet your unfair advantage",
    promise:
      "Most people open ChatGPT and freeze. By the end of session one, you won't.",
    bullets: [
      "The four AI tools that matter, and the dozens you can ignore",
      "Set up your accounts the safe way, and what to never paste into a chatbot",
      "The shift that changes everything: from AI as a tool to AI as a thinking partner",
      "Your first real win, live: a task from your actual job, done in minutes",
    ],
    outcome: "You open any AI tool and get a useful answer on the first try.",
  },
  {
    num: "02",
    type: "build",
    label: "Build Session",
    title: "The skill that separates dabblers from pros",
    promise:
      "AI isn't the problem. Prompting is. This is the session that changes every result you will ever get.",
    bullets: [
      "The anatomy of a prompt that works: role, context, task, format",
      "Context is everything: feed AI your role, your data, and your standards so the answer fits",
      "The five prompt patterns you'll reuse for the rest of your career",
      "How to steer a wrong answer back on track, in one line",
      "Build three reusable prompts for the work you repeat every week",
    ],
    outcome: "You get first-draft-quality output from any AI, every time.",
  },
  {
    num: "03",
    type: "hotseat",
    label: "Hot-Seat Review",
    title: "Bring your real work. Watch it transform.",
    promise:
      "Theory ends here. You bring a live task from your job. We rebuild it together, on screen, in front of the cohort.",
    bullets: [
      "Live hot-seats: real tasks from real members, solved in the room",
      "See how your peers are applying AI, and take what works",
      "Fix what isn't clicking yet, with direct feedback",
      "Lock in the habits that outlast week six",
    ],
    outcome:
      "You walk away with a real task, now done in a fraction of the time.",
  },
  {
    num: "04",
    type: "build",
    label: "Build Session",
    title: "Turn AI into your daily operating system",
    promise:
      "One-off prompts are a party trick. Workflows are the edge. This is where AI moves into your week.",
    bullets: [
      "Email and comms: sharper writing, faster, without sounding like a robot",
      "Data and analysis: read a spreadsheet, spot the trend, turn raw numbers into a clear story",
      "Decks and briefings: turn rough notes into a board-ready presentation",
      "Meetings and research: notes, summaries, and action items that write themselves",
    ],
    outcome: "You run your core weekly work with AI woven through it.",
  },
  {
    num: "05",
    type: "build",
    label: "Build Session",
    title: "Build your own AI assistant. No code. Promise.",
    promise: "You've been a user. This is where you become a builder.",
    bullets: [
      "Custom assistants that already know your role, your data, and your rules",
      "Build a context library, so you stop re-explaining yourself to AI every time",
      "Chain tasks into light automations, your first taste of building, zero code",
      "Your role playbook: the exact AI moves for finance, executives, operations, and owners",
      "The leap from execution to thinking partner: pressure-test decisions, not just draft after",
    ],
    outcome: "You hand your repetitive work to an assistant you built yourself.",
  },
  {
    num: "06",
    type: "hotseat",
    label: "Hot-Seat + Capstone",
    title: "Ship it. Then show it off.",
    promise: "You don't leave with notes. You leave with proof.",
    bullets: [
      "Capstone showcase: every member presents the workflow they shipped",
      "Final feedback, plus the advanced tweaks to take it further",
      "Your keep-forever kit: prompt library, templates, recordings, certificate",
      "Your ninety-day plan to keep compounding the edge",
    ],
    outcome:
      "You leave with a working AI system, a certificate, and a cohort that stays.",
  },
];

const ACCENT = { build: "#1e1eb4", hotseat: "#f5a623" } as const;

export default function Curriculum() {
  return (
    <section id="curriculum" className="bg-white py-32">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <p className="text-xs font-bold uppercase tracking-[2px] text-brand-blue mb-6 text-center">
            The curriculum
          </p>
          <h2 className="text-[40px] md:text-[48px] leading-[1.05] text-navy text-center mb-5">
            Six sessions.
            <br />
            <span className="serif-i text-bright">One transformation.</span>
          </h2>
          <p className="text-muted-text text-lg leading-relaxed text-center mb-16 max-w-xl mx-auto">
            Four build sessions to teach you. Two hot-seat reviews to prove it.
            You start using AI to get tasks done. You finish using it as a
            thinking partner.
          </p>
        </FadeIn>

        <div className="flex flex-col gap-6">
          {sessions.map((s, i) => {
            const accent = ACCENT[s.type];
            return (
              <FadeIn key={s.num} delay={i * 0.06}>
                <div
                  className="relative bg-light-bg border border-line rounded-2xl p-7 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(10,10,46,0.09)] hover:bg-white"
                  style={{ borderLeft: `3px solid ${accent}` }}
                >
                  {/* Big faint number */}
                  <span
                    className="absolute top-5 right-6 text-6xl font-bold select-none leading-none pointer-events-none"
                    style={{ color: "rgba(10,10,46,0.06)" }}
                  >
                    {s.num}
                  </span>

                  <div
                    className="text-[11px] font-semibold uppercase tracking-[1.5px] mb-2"
                    style={{ color: accent }}
                  >
                    {s.label} · {s.num}
                  </div>
                  <h3 className="text-navy text-xl md:text-2xl font-bold mb-3 pr-12">
                    {s.title}
                  </h3>
                  <p className="text-[#3a3a55] text-[15px] leading-relaxed mb-6">
                    {s.promise}
                  </p>

                  <div className="flex flex-col gap-3 mb-6">
                    {s.bullets.map((b) => (
                      <div key={b} className="flex gap-3 items-start">
                        <svg
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={accent}
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-muted-text text-[14px] leading-relaxed">
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-3 border-t border-line pt-4">
                    <span
                      className="text-[10px] font-bold uppercase tracking-[1.5px] mt-1 flex-shrink-0"
                      style={{ color: accent }}
                    >
                      Outcome
                    </span>
                    <span className="text-navy text-[14px] leading-relaxed font-semibold">
                      {s.outcome}
                    </span>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.15}>
          <div className="text-center mt-14">
            <p className="text-navy text-lg font-semibold mb-6">
              That is the map. <span className="serif-i text-bright">Your capstone is the proof.</span>
            </p>
            <a
              href="#register"
              className="inline-block cta-grad text-white font-bold text-[15px] px-8 py-4 rounded-full shadow-[0_18px_40px_rgba(255,106,61,0.35)] hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(255,106,61,0.45)]"
            >
              Save your cohort seat →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
