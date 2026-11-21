import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Haircut & Styling",
    description: "Trendy haircuts and beautiful hairstyles.",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600",
    slug: "haircut-styling",
  },
  {
    name: "Hair Coloring",
    description: "Give your hair a fresh and vibrant look.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600",
    slug: "hair-coloring",
  },
  {
    name: "Hair Treatment",
    description: "Nourish and restore your beautiful hair.",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600",
    slug: "hair-treatment",
  },
  {
    name: "Facial & Skincare",
    description: "Refresh your skin with expert skincare.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600",
    slug: "facial-skincare",
  },
  {
    name: "Makeup",
    description: "Look stunning for every special occasion.",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600",
    slug: "makeup",
  },
  {
    name: "Manicure & Pedicure",
    description: "Pamper your hands and feet with care.",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600",
    slug: "manicure-pedicure",
  },
  {
    name: "Spa & Massage",
    description: "Relax, refresh, and enjoy peaceful moments.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600",
    slug: "spa-massage",
  },
];

export default function ServiceCategories() {
  return (
    <section className="bg-gray-50 px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-pink-600">
            Explore Our Services
          </p>

          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Salon Service Categories
          </h2>

          <p className="mx-auto max-w-2xl text-gray-600">
            Discover a wide range of beauty and wellness services. Choose your
            favorite category and find the perfect salon for you.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/services?category=${category.slug}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-pink-600">
                  {category.name}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-gray-500">
                  {category.description}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600">
                  Explore Services
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
