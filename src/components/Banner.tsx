import Link from "next/link";

export default function Banner() {
  return (
    <section
      className="relative flex min-h-[500px] items-center justify-center bg-cover bg-center px-4 py-20"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920&auto=format&fit=crop')",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Banner Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-pink-300">
          Welcome to SalonBook
        </p>

        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
          Your Beauty, Our Passion
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg">
          Discover the best salons and professional beauty services. Book your
          appointment easily and enjoy a relaxing salon experience.
        </p>

        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-full bg-pink-600 px-8 py-3.5 font-semibold text-white transition hover:bg-pink-700"
        >
          Explore Salon Services
        </Link>
      </div>
    </section>
  );
}
