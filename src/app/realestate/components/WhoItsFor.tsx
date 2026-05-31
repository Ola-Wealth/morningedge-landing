import FadeIn from "../../components/FadeIn";

const personas = [
  {
    role: "The Independent Realtor",
    body: "You're building your own book, one deal at a time. AI helps you write like a copywriter, follow up like a full-time assistant, and market properties like an agency — all by yourself.",
  },
  {
    role: "The Property Agent",
    body: "You're juggling multiple listings, clients, and follow-ups across sites. AI becomes your admin team, writing staff, and research engine — without the payroll.",
  },
  {
    role: "The Estate Developer",
    body: "You have projects to sell and buyers to convert. AI builds your brand presence, generates marketing content, and compresses your sales cycle from first enquiry to closing.",
  },
  {
    role: "The Real Estate Firm Lead",
    body: "Your agents need to move faster and look more professional. This programme raises the standard across every person on your roster — in one structured training.",
  },
];

export default function WhoItsFor() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-[40px] leading-[1.1] font-semibold text-navy text-center mb-16">
            Built for four kinds of property professionals.
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {personas.map((p, i) => (
            <FadeIn key={p.role} delay={i * 0.1}>
              <div
                className="rounded-xl p-8 border border-[#e0e0e8] transition-transform duration-300 hover:-translate-y-1"
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
