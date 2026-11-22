"use client";

import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const router = useRouter();

  const { data: sesion } = authClient.useSession();
  const user = sesion?.user;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Services", path: "/services" },
  ];

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.add({
          type: "error",
          title: "Sign out failed!",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        });
        return;
      }

      toast.add({
        title: "success",
        description: "Successfully sign out!.",
      });

      router.push("/");

    } catch (error) {
      toast.add({
        type: "error",
        title: "Something went wrong!",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-100/80 bg-white/90 shadow-sm shadow-rose-100/30 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-rose-50 transition group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="SalonBook Logo"
              width={34}
              height={34}
              priority
              className="object-contain"
            />
          </div>

          <div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              Salon<span className="text-rose-500">Book</span>
            </span>
            <p className="-mt-1 text-[10px] font-medium tracking-[2px] text-gray-400">
              BEAUTY & ELEGANCE
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 rounded-full border border-rose-100 bg-rose-50/50 p-1.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                pathname === link.path
                  ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                  : "text-gray-600 hover:bg-white hover:text-rose-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                <div className="flex items-center gap-2">
                  <Avatar className="h-9 w-9 border-2 border-rose-200">
                    <AvatarImage
                      src={user?.image || ""}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="bg-rose-100 font-bold text-rose-600">
                      {user?.name?.charAt(0).toUpperCase() || "SB"}
                    </AvatarFallback>
                  </Avatar>
                  {/* <span className="max-w-28 truncate text-sm font-semibold text-gray-700">
                    {user?.name || "User"}
                  </span> */}
                </div>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="w-56 rounded-xl border-rose-100 p-3 shadow-xl"
              >
                <PopoverHeader>
                  <PopoverTitle className="text-gray-900">
                    {user?.name || "User"}
                  </PopoverTitle>
                </PopoverHeader>

                <div className="flex flex-col gap-1 py-3">
                  <Link
                    href="/dashboard/admin/overview"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    Dashboard
                  </Link>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full rounded-lg"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-semibold text-gray-700 transition hover:text-rose-600"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="flex items-center gap-2 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-600 hover:shadow-rose-300"
              >
                <Sparkles size={16} />
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-rose-100 bg-rose-50 p-2.5 text-rose-600 transition hover:bg-rose-100 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute left-0 top-full w-full border-t border-rose-100 bg-white p-5 shadow-xl shadow-rose-100/40 md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    pathname === link.path
                      ? "bg-rose-500 text-white"
                      : "text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="my-2 border-t border-rose-100" />

              {user ? (
                <>
                  <div className="flex items-center gap-3 rounded-xl bg-rose-50 p-3">
                    <Avatar className="h-10 w-10 border-2 border-rose-200">
                      <AvatarImage
                        src={user?.image || ""}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback className="bg-rose-100 text-rose-600">
                        {user?.name?.charAt(0).toUpperCase() || "SB"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-gray-900">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">Welcome back!</p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard/admin/overview"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                  >
                    Dashboard
                  </Link>

                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full rounded-xl"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-rose-50"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl bg-rose-500 px-5 py-3 text-center text-sm font-bold text-white shadow-md shadow-rose-200 transition hover:bg-rose-600"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
