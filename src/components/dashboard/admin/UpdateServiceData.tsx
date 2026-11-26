"use client";

import { useState } from "react";
import type { IService } from "@/type/service";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
import { Pencil } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

interface EditServiceDataProps {
  service: IService;
  onUpdated?: () => void;
}

const categories = [
  "Haircut & Styling",
  "Hair Coloring",
  "Hair Treatment",
  "Makeup",
  "Manicure & Pedicure",
  "Spa & Massage",
];

export default function EditServiceData({
  service,
  onUpdated,
}: EditServiceDataProps) {
  return (
    <EditServiceDataForm
      key={service._id}
      service={service}
      onUpdated={onUpdated}
    />
  );
}

function EditServiceDataForm({ service, onUpdated }: EditServiceDataProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: service.name ?? "",
    category: service.category ?? "",
    price: String(service.price ?? ""),
    duration: String(service.duration ?? ""),
    shortDescription: service.description ?? "",
    isActive: service.active ?? true,
  });

  const [imagePreview] = useState<string | null>(service.image ?? null);

  // Handle input changes
  const handleChange = (
    field: keyof typeof formData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update service
  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError("");

      if (!formData.name.trim()) {
        setError("Service name is required");
        return;
      }

      if (!formData.category) {
        setError("Please select a category");
        return;
      }

      if (formData.price.trim() === "" || formData.duration.trim() === "") {
        setError("Price and duration are required");
        return;
      }

      const updateData = {
        name: formData.name.trim(),
        category: formData.category,
        description: formData.shortDescription.trim(),
        price: Number(formData.price),
        duration: Number(formData.duration),
        active: formData.isActive,
      };

      if (
        !Number.isFinite(updateData.price) ||
        updateData.price < 0 ||
        !Number.isFinite(updateData.duration) ||
        updateData.duration <= 0
      ) {
        setError("Please enter a valid price and duration");
        return;
      }

      const res = await fetch(
        `${process.env.BASE_URL}/admin/service/${service._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update service");
      }

      toast.add({
        title: "Update Service",
        description: "Service updated successfully!",
      });

      setOpen(false);
      onUpdated?.();

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* Edit Button - Fixed Nested Button */}
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            aria-label="Edit service"
          >
            <Pencil className="size-4" />
          </Button>
        }
      />

      <AlertDialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Service</AlertDialogTitle>

          <AlertDialogDescription>
            Update your service information below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          {/* Service Image */}
          <div className="space-y-2">
            <Label>Service Image</Label>

            <div className="size-[120px] overflow-hidden rounded-md border bg-muted">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={service.name}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                  No Image
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              Image upload is not included in this update request.
            </p>
          </div>

          {/* Service Name */}
          <div className="space-y-2">
            <Label htmlFor="service-name">Service Name</Label>

            <Input
              id="service-name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter service name"
              disabled={loading}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>

            <Select
              value={formData.category}
              onValueChange={(value) => handleChange("category", value ?? "")}
              disabled={loading}
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

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="service-price">Price</Label>

            <Input
              id="service-price"
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="Enter price"
              disabled={loading}
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="service-duration">Duration (Minutes)</Label>

            <Input
              id="service-duration"
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              placeholder="Enter duration"
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="service-description">Description</Label>

            <Textarea
              id="service-description"
              value={formData.shortDescription}
              onChange={(e) => handleChange("shortDescription", e.target.value)}
              placeholder="Enter service description"
              rows={3}
              disabled={loading}
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-1">
              <Label htmlFor="service-active">Active Status</Label>

              <p className="text-xs text-muted-foreground">
                Enable or disable this service.
              </p>
            </div>

            <Switch
              id="service-active"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleChange("isActive", checked)}
              disabled={loading}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>

        {/* Footer Buttons */}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>

          <Button type="button" onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update Service"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
