import { FileText, Clock, Users, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

const LegalIntakeHero = () => {
  const steps = [
    {
      label: "Step 01",
      title: "Describe your issue",
      description:
        "Explain your legal need in plain language. No forms or legal jargon required.",
      icon: FileText,
      active: false,
    },
    {
      label: "Step 02",
      title: "Set urgency and mode",
      description:
        "Choose how fast you need help and whether you'd rather connect online or in person.",
      icon: Clock,
      active: false,
    },
    {
      label: "Step 03",
      title: "Lawyers reach out",
      description:
        "Verified lawyers contact you directly with guidance or an offer to help.",
      icon: Users,
      active: true,
    },
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      {/* Eyebrow + headline */}
      <div className="mb-8 text-center">
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-medium text-teal-900">
          <Zap className="h-3.5 w-3.5" />
          No searching. No endless calls.
        </span>

        <h1 className="mb-4 font-serif text-3xl font-medium leading-tight tracking-tight text-gray-900 sm:text-4xl">
          File your legal need.
          <br />
          Let <span className="text-teal-800">verified lawyers</span> respond.
        </h1>

        <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-gray-600">
          Describe your issue, set urgency, and choose online or in-person help.
          Qualified lawyers reach out directly, so you compare real responses
          instead of chasing profiles.
        </p>
      </div>

      {/* Docket panel */}
      <div className="relative mb-7 rounded-xl border border-gray-200 bg-gray-50 px-6 pb-6 pt-7">
        <ol className="relative pl-11">
          <div className="absolute left-3.5 top-8 bottom-8 w-px bg-gray-300" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
            return (
              <li
                key={step.label}
                className={isLast ? "relative" : "relative pb-6"}
              >
                <div
                  className={`absolute -left-11 top-0 flex h-7 w-7 items-center justify-center rounded-full ${
                    step.active ? "bg-teal-800" : "bg-teal-50"
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${
                      step.active ? "text-teal-50" : "text-teal-800"
                    }`}
                  />
                </div>
                <p className="mb-1 font-mono text-[11px] text-gray-400">
                  {step.label}
                </p>
                <p className="mb-1 text-[15px] font-medium text-gray-900">
                  {step.title}
                </p>
                <p className="text-[13px] leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/create-post">
          {" "}
          <button
            type="button"
            className="mx-auto flex w-full max-w-xs items-center justify-center gap-2 rounded-[9px] bg-teal-800 px-7 py-3.5 text-[15px] font-medium text-white transition hover:bg-teal-900"
          >
            Post your legal need
            <ArrowRight className="h-4 w-4" />
          </button>{" "}
        </Link>
      </div>
    </section>
  );
};

export default LegalIntakeHero;
