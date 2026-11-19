"use client";

import { Menu, X } from "lucide-react";
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const{data:sesion} = authClient.useSession();
   const user = sesion?.user

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Services", path: "/services" },
  ];

  const handleSignOut = async() =>{
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
        })
       }

       toast.add({
         title: "success",
         description: "Successfully sign out!.",
       });

     } catch(error) {

        toast.add({
          type: "error",
          title: "Something went wrong!",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        });
     }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="SalonBook Logo"
            width={30}
            height={30}
            priority
          />

          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Salon<span className="text-rose-500">Book</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm font-medium transition ${
                pathname === link.path
                  ? "text-rose-600"
                  : "text-gray-600 hover:text-rose-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <>
              <Popover>
                <PopoverTrigger render={<Button variant="outline" />}>
                  <Avatar className="cursor-pointer ">
                    <AvatarImage
                      src={user?.image || ""}
                      alt={user?.name || "User"}
                      className="grayscale"
                    />

                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase() || "SB"}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent align="end" className="w-48">
                  <PopoverHeader>
                    <PopoverTitle>{user?.name || "User"}</PopoverTitle>
                  </PopoverHeader>

                  <div className="flex flex-col gap-1 py-2">
                    <Link href="/dashboard">Dashboard</Link>
                  </div>

                  <div className="border-t pt-3">
                    <Button
                      type="button"
                      variant="destructive"
                      className="w-full"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-semibold text-gray-700 hover:text-rose-600"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-full bg-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-200 transition hover:bg-rose-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute left-0 top-full w-full border-t border-gray-100 bg-white p-6 shadow-lg md:hidden">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium ${
                    pathname === link.path
                      ? "text-rose-600"
                      : "text-gray-700 hover:text-rose-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <hr className="border-gray-100" />

              <Link
                href="/signin"
                onClick={() => setIsOpen(false)}
                className="font-semibold text-gray-700"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-rose-500 px-5 py-3 text-center font-semibold text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
