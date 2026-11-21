import { CalendarCheck, ShieldCheck, Sparkles, Clock } from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Easy Online Booking",
    description:
      "Book your favorite salon services anytime, anywhere with just a few clicks.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Salons",
    description:
      "Discover trusted salons and enjoy a comfortable and reliable beauty experience.",
  },
  {
    icon: Sparkles,
    title: "Professional Stylists",
    description:
      "Get expert beauty care from skilled and experienced salon professionals.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Choose an appointment time that perfectly matches your daily schedule.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-pink-600">
            Why SalonBook
          </p>

          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Why Choose SalonBook?
          </h2>

          <p className="mx-auto max-w-2xl text-gray-600">
            We make your beauty journey simple, convenient, and enjoyable.
            Discover a better way to book your favorite salon services.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-gray-100 bg-gray-50 p-7 text-center transition duration-300 hover:-translate-y-2 hover:border-pink-200 hover:bg-white hover:shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 transition duration-300 group-hover:bg-pink-600 group-hover:text-white">
                  <Icon size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mb-3 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-gray-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
