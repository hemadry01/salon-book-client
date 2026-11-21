import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const serviceLinks = [
    "Haircut & Styling",
    "Hair Coloring",
    "Facial & Skincare",
    "Makeup",
    "Manicure & Pedicure",
    "Spa & Massage",
  ];

  return (
    <footer className="border-t border-rose-100 bg-[#fffafa] text-gray-700">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Salon<span className="text-rose-500">Book</span>
              </h2>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-500">
              Your beauty, our passion. Discover professional salon services and
              book your favorite treatments with ease. Experience beauty,
              elegance, and confidence with SalonBook.
            </p>

            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-100 text-gray-600 transition hover:border-rose-500 hover:bg-rose-500 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.6V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.2v3h2.8v8h3.5Z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-100 text-gray-600 transition hover:border-rose-500 hover:bg-rose-500 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-100 text-gray-600 transition hover:border-rose-500 hover:bg-rose-500 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M23 7a3 3 0 0 0-2.1-2.1C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7a31 31 0 0 0-.5 5 31 31 0 0 0 .5 5 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0 0 23 17a31 31 0 0 0 .5-5 31 31 0 0 0-.5-5ZM9.7 15.5v-7l6 3.5-6 3.5Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-gray-900">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition hover:pl-1 hover:text-rose-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-gray-900">
              Our Services
            </h3>

            <ul className="space-y-4">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-gray-500 transition hover:pl-1 hover:text-rose-500"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Opening Hours */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-gray-900">
              Contact Information
            </h3>

            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-rose-500" />
                <div>
                  <p className="font-semibold text-gray-800">Our Address</p>
                  <p className="mt-1 leading-6 text-gray-500">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-rose-500" />
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <a
                    href="tel:+8801700000000"
                    className="mt-1 block text-gray-500 hover:text-rose-500"
                  >
                    +880 1700-000000
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-rose-500" />
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <a
                    href="mailto:info@salonbook.com"
                    className="mt-1 block text-gray-500 hover:text-rose-500"
                  >
                    info@salonbook.com
                  </a>
                </div>
              </li>
            </ul>

            {/* Opening Hours */}
            <div className="mt-7">
              <div className="mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-rose-500" />
                <h3 className="font-bold text-gray-900">Opening Hours</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-gray-500">Sat - Thu</span>
                  <span className="font-medium text-gray-800">
                    10 AM - 9 PM
                  </span>
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-gray-500">Friday</span>
                  <span className="font-medium text-gray-800">2 PM - 9 PM</span>
                </div>
              </div>
            </div>

            <Button
              className="mt-6 w-full rounded-full bg-rose-500 hover:bg-rose-600"
            >
              <Link href="/services">
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom Footer */}
        <Separator className="my-10 bg-rose-100" />

        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-sm text-gray-500">
            © 2026 SalonBook. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy-policy"
              className="text-gray-500 transition hover:text-rose-500"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-gray-500 transition hover:text-rose-500"
            >
              Terms & Conditions
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            Made with <span className="text-rose-500">♥</span> for beauty.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
