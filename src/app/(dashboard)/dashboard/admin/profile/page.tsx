"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, UserRound, Mail, Phone } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function MyProfile() {
  const [fullName, setFullName] = useState("Admin User");
  const [email, setEmail] = useState("admin@salonbook.com");
  const [phone, setPhone] = useState("+8801760949622");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const {data:session} = authClient.useSession();
  const info = session?.user;

  // Image Preview
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

  // Update Profile
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();

//       formData.append("fullName", fullName);
//       formData.append("email", email);
//       formData.append("phone", phone);

//       if (image) {
//         formData.append("image", image);
//       }

//       const response = await fetch("/api/profile", {
//         method: "PUT",
//         body: formData,
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Profile update failed");
//       }

//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error(error);

//       alert(error instanceof Error ? error.message : "Something went wrong!");
//     }
//   };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-[280px_1fr]">
        {/* Profile Information Card */}
        <Card className="flex items-center justify-center rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="flex w-full flex-col items-center px-5 py-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100">
                <img
                  src={info?.image|| undefined}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>

              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-violet-700 text-white shadow-md hover:bg-violet-800"
              >
                <Camera className="h-4 w-4" />
              </label>
            </div>

            <h2 className="mt-3 text-lg font-bold text-slate-900">
              {info?.name|| "Admin User"}
            </h2>

            <Badge className="mt-1 bg-sky-100 text-sky-800 hover:bg-sky-100">
              {info?.role}
            </Badge>

            <div className="mt-5 w-full space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <UserRound className="h-4 w-4 shrink-0" />
                <span className="break-all">{info?.email}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Update Profile Form */}
        <Card className="rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-5 md:p-6">
            <h2 className="mb-5 text-xl font-bold text-slate-900">
              {/* Update Profile */}
              My Profile
            </h2>

            <form  className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </Label>

                <Input
                  id="fullName"
                  value={info?.name}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                  required
                  className="h-10 border-slate-200 focus-visible:ring-violet-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>

                <Input
                  id="email"
                  type="email"
                  value={info?.email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                  className="h-10 border-slate-200 focus-visible:ring-violet-500"
                />
              </div>

              {/* Phone */}
              {/* <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>

                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="h-10 border-slate-200 focus-visible:ring-violet-500"
                />
              </div> */}

              {/* Profile Image */}
              {/* <div className="space-y-2">
                <Label htmlFor="profile-image">Profile Image</Label>

                <div className="flex flex-wrap items-center gap-3">
                  <Input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="h-10 max-w-sm cursor-pointer border-slate-200 pt-1.5 file:mr-2 file:rounded file:border-0 file:bg-violet-100 file:px-2 file:py-1 file:text-xs file:font-medium file:text-violet-700"
                  />

                  <div className="h-12 w-12 overflow-hidden rounded-md border bg-slate-100">
                    <img
                      src={preview || currentImage}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div> */}

              {/* Submit */}
              {/* <Button
                type="submit"
                className="bg-violet-700 px-6 hover:bg-violet-800"
              >
                Update Profile
              </Button> */}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
