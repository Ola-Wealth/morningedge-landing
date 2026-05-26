import FadeIn from "./FadeIn";

export default function Guarantee() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            {/* Shield badge */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-36 h-36 rounded-full bg-[rgba(30,30,180,0.07)] border-2 border-[rgba(30,30,180,0.2)] flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-brand-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <p className="text-brand-blue text-xs font-semibold uppercase tracking-widest mt-4 text-center">
                Money-Back
                <br />
                Guarantee
              </p>
            </div>

            {/* Copy */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[1.5px] text-brand-blue mb-4">
                Zero risk. Seriously.
              </p>
              <h2 className="text-[32px] leading-[1.15] font-semibold text-navy mb-5">
                If you&apos;re not sharper after
                <br />3 sessions, you pay nothing.
              </h2>
              <p className="text-muted-text text-lg leading-relaxed mb-6">
                We are so confident in what this programme delivers that we back
                every engagement with a full money-back guarantee. If after your
                first 3 sessions you don&apos;t feel meaningfully more capable,
                more confident, and more equipped with AI — we will refund every
                kobo. No questions asked. No awkward conversation.
              </p>

              <div className="flex flex-col gap-3">
                {[
                  "No hoops to jump through",
                  "No &ldquo;terms and conditions&rdquo; small print",
                  "Just results — or your money back",
                ].map((line) => (
                  <div key={line} className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-brand-blue flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span
                      className="text-navy text-[15px]"
                      dangerouslySetInnerHTML={{ __html: line }}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
