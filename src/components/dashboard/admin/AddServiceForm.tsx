"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ImagePlus, RotateCcw, Loader2 } from "lucide-react";

const categories = [
  "Haircut & Styling",
  "Hair Coloring",
  "Hair Treatment",
  "Facial & Skincare",
  "Makeup",
  "Manicure & Pedicure",
  "Spa & Massage",
];

export default function AddService() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [active, setActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Clean up image preview URL
  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    const imageUrl = URL.createObjectURL(image);
    setPreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      e.target.value = "";
      return;
    }

    setImage(file);
  };

  const handleReset = () => {
    setName("");
    setCategory("");
    setDescription("");
    setPrice("");
    setDuration("");
    setActive(true);
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category) {
      
      return;
    }

    if (!image) {
      
      return;
    }

    if (Number(price) <= 0 || Number(duration) <= 0) {
      
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("category", category);
      formData.append("description", description.trim());
      formData.append("price", price);
      formData.append("duration", duration);
      formData.append("active", String(active));
      formData.append("image", image);

      // TODO: Connect your backend API here.
      // Example:
      // const response = await fetch("/api/services", {
      //   method: "POST",
      //   body: formData,
      // });
      //
      // if (!response.ok) throw new Error("Failed to add service");

      console.log("Service data ready:", formData);

      

      // Reset after successful API response.
      // handleReset();
    } catch (error) {
      console.error(error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-5">
            <CardTitle className="text-xl font-bold text-white">
              Add New Service
            </CardTitle>
            <p className="text-sm text-violet-100">
              Add a new salon service to your collection.
            </p>
          </CardHeader>

          <CardContent className="p-5 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Service Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Service Name <span className="text-red-500">*</span>
                </Label>

                <Input
                  id="name"
                  placeholder="Enter service name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={2}
                  className="h-11 border-slate-300"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>
                  Category <span className="text-red-500">*</span>
                </Label>

                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value ?? "")}
                >
                  <SelectTrigger className="h-11 border-slate-300">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>

                <Textarea
                  id="description"
                  placeholder="Enter service description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  minLength={10}
                  rows={4}
                  className="resize-none border-slate-300"
                />
              </div>

              {/* Price and Duration */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">
                    Price (৳) <span className="text-red-500">*</span>
                  </Label>

                  <Input
                    id="price"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="1200"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="h-11 border-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">
                    Duration (minutes) <span className="text-red-500">*</span>
                  </Label>

                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="60"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                    className="h-11 border-slate-300"
                  />
                </div>
              </div>

              {/* Service Image */}
              <div className="space-y-2">
                <Label htmlFor="image">
                  Service Image <span className="text-red-500">*</span>
                </Label>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <Input
                      ref={fileInputRef}
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      required={!image}
                      className="h-12 cursor-pointer border-slate-300 pt-2.5"
                    />

                    <p className="mt-1 text-xs text-slate-500">
                      PNG, JPG or WEBP. Maximum 5MB.
                    </p>
                  </div>

                  <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-50">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Service preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImagePlus className="h-9 w-9 text-slate-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Service Status */}
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-4">
                <Switch
                  id="status"
                  checked={active}
                  onCheckedChange={setActive}
                  className="data-[state=checked]:bg-emerald-500"
                />

                <div>
                  <Label htmlFor="status" className="font-medium">
                    {active ? "Active Service" : "Inactive Service"}
                  </Label>

                  <p className="text-xs text-slate-500">
                    {active
                      ? "Customers can view and book this service."
                      : "This service will be hidden from customers."}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-violet-700 px-7 hover:bg-violet-800"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Add Service"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={loading}
                  className="gap-2 border-slate-300"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
