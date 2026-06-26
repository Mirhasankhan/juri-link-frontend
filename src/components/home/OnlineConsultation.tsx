import Container from "@/utils/Container";
import { useRouter } from "next/navigation";

const steps = [
  {
    number: 1,
    title: "Book Your Consultation",
    description:
      "Choose an experienced lawyer and schedule a Zoom meeting at a time that suits you.",
  },
  {
    number: 2,
    title: "Meet on Zoom",
    description:
      "Discuss your legal matter privately with your lawyer through a secure online consultation.",
  },
  {
    number: 3,
    title: "Get Clear Legal Direction",
    description:
      "Receive practical legal advice, recommended next steps, and answers to your questions.",
  },
  {
    number: 4,
    title: "Take Action",
    description:
      "Use your lawyer's advice to confidently make informed legal decisions.",
  },
];

const OnlineConsultation = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/lawyers?serviceType=Online");
  };

  return (
    <Container>
      <section className="text-center py-16">
        <span className="uppercase tracking-widest text-sm text-primary font-semibold">
          ONLINE LEGAL CONSULTATION
        </span>

        <h2 className="text-3xl md:text-4xl font-bold mb-3 mt-3">
          Expert Legal Advice, Wherever You Are
        </h2>

        <p className="text-gray-500 text-base md:text-lg mb-12 max-w-2xl mx-auto">
          Connect with experienced lawyers through secure Zoom consultations.
          Get trusted legal advice from the comfort of your home.
        </p>

        <div className="relative max-w-5xl mx-auto mb-12">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[18px] left-[60px] right-[60px] h-px bg-gray-600" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0">
            {steps.map((step) => (
              <div key={step.number} className="relative z-10 px-3">
                <div className="w-9 h-9 rounded-full bg-[#1a1a1a] border-2 border-gray-500 text-white flex items-center justify-center mx-auto mb-4 font-semibold text-sm">
                  {step.number}
                </div>

                <p className="font-semibold text-base mb-1">{step.title}</p>

                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNavigate}
          className="bg-primary/10 mt-6 font-medium text-secondary py-2 px-5 rounded-[5px]"
        >
          View Online Lawyers
        </button>
      </section>
    </Container>
  );
};

export default OnlineConsultation;
