import FadeIn from "./FadeIn";

const personas = [
  {
    role: "The Corporate Professional",
    body: "Team lead, department head, senior manager — the demands on you are real. AI sharpens your decision-making, cuts meeting prep in half, and helps you show up to every room as the most prepared person in it.",
  },
  {
    role: "The Executive Admin",
    body: "You handle more than most people see. AI helps you draft faster, summarise instantly, document processes, and bring the kind of polish that gets noticed.",
  },
  {
    role: "The Small Business Owner",
    body: "You are the team. AI becomes your copywriter, researcher, customer service rep, and operations manager — without the payroll.",
  },
  {
    role: "The AI Enthusiast",
    body: "You've dabbled. You know it's powerful. You want to go from curious user to confident practitioner with a real system behind your use.",
  },
];

export default function WhoItsFor() {
  return (
    <section className="bg-white py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-[44px] leading-[1.05] text-navy text-center mb-4">
            Built for four kinds of professionals.
          </h2>
          <p className="text-muted-text text-center text-lg mb-16 max-w-xl mx-auto">
            You&apos;ll learn alongside a cohort of people who lead, manage, and run things.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {personas.map((p, i) => (
            <FadeIn key={p.role} delay={i * 0.1}>
              <div
                className="rounded-xl p-8 border border-[#e0e0e8] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-navy/10 hover:border-[#c0c0d8]"
                style={{ borderTop: "3px solid #1e1eb4" }}
              >
                <h3 className="text-navy text-lg font-semibold mb-4">
                  {p.role}
                </h3>
                <p className="text-muted-text text-[15px] leading-relaxed">
                  {p.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
