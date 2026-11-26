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
  const { data: session } = authClient.useSession();
  const info = session?.user;

  // null means the user has not edited the field yet
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState("");

  // Image URL, not File
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState("");

  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");

  const displayName = fullName ?? info?.name ?? "";
  const displayEmail = email ?? info?.email ?? "";
  const currentImage = preview || image || info?.image || "";

  // Upload image to ImgBB
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError(null);
    setSuccess("");
    setIsImageUploading(true);

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMAGBB_API_KEY;

      if (!apiKey) {
        throw new Error("ImgBB API key is missing.");
      }

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error?.message || "Image upload failed.");
      }

      const uploadedImage = result.data.display_url || result.data.url;

      setImage(uploadedImage);
      setPreview(uploadedImage);
      setSuccess("Image uploaded successfully.");
    } catch (err) {
      setPreview("");
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setIsImageUploading(false);
      URL.revokeObjectURL(localPreview);
    }
  };

  // Save profile
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setSuccess("");
    setIsSaving(true);

    try {
      if (!info?.id) {
        throw new Error("User ID not found.");
      }

      const updatedData = {
        name: displayName,
        email: displayEmail,
        image: image ?? info.image ?? "",
      };

      const response = await fetch(
        `http://localhost:8000/profile/update/${info.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Profile update failed.");
      }

      setFullName(updatedData.name);
      setEmail(updatedData.email);
      setImage(updatedData.image);
      setPreview(updatedData.image);

      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal information and profile picture.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border bg-muted">
                {currentImage ? (
                  <Image
                    src={currentImage}
                    alt="Profile picture"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="112px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <UserRound className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <Label
                  htmlFor="profileImage"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  <Camera className="h-4 w-4" />
                  Change Photo
                </Label>

                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isImageUploading}
                />

                <p className="text-xs text-muted-foreground">
                  JPG, PNG or WEBP. Maximum 5MB.
                </p>

                {isImageUploading && (
                  <Badge variant="secondary">Uploading image...</Badge>
                )}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="fullName"
                  value={displayName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your full name"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={displayEmail}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Messages */}
            {error && <p className="text-sm text-destructive">{error}</p>}

            {success && <p className="text-sm text-green-600">{success}</p>}

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving || isImageUploading}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
