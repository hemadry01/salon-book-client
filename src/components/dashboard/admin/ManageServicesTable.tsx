"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, Loader2, Plus, Trash2, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { API_BASE_URL } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { IService } from "@/type/service";

import UpdateServiceData from "./UpdateServiceData";

interface IServiceProps {
  serviceItem: IService[];
}

const ITEMS_PER_PAGE = 10;

const ManageServicesTable = ({ serviceItem }: IServiceProps) => {
  const router = useRouter();

  // Ids removed locally so a deleted row disappears immediately, while
  // `router.refresh()` re-syncs the list with the server.
  const [deletedIds, setDeletedIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewService, setViewService] = useState<IService | null>(null);

  const allServices = Array.isArray(serviceItem) ? serviceItem : [];
  const services = allServices.filter(
    (service) => !deletedIds.has(service._id),
  );

  const totalPages = Math.max(1, Math.ceil(services.length / ITEMS_PER_PAGE));

  // Clamp during render so deleting the last row of a page falls back to the
  // previous page without an extra state update.
  const currentPageSafe = Math.min(currentPage, totalPages);

  const startIndex = (currentPageSafe - 1) * ITEMS_PER_PAGE;
  const currentServices = services.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );
  const showingFrom = services.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + ITEMS_PER_PAGE, services.length);

  const handleDeleteData = async (service: IService) => {
    setDeletingId(service._id);

    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/service/${service._id}`,
        { method: "DELETE" },
      );

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.message || "Failed to delete service");
      }

      setDeletedIds((prev) => new Set(prev).add(service._id));
      setOpenDialog(null);

      toast.add({
        type: "success",
        title: "Service deleted",
        description: `"${service.name}" was deleted successfully.`,
      });

      router.refresh();
    } catch (error) {
      toast.add({
        type: "error",
        title: "Delete failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Manage Services
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              View and manage all your salon services.
            </p>
          </div>

          <Link
            href="/dashboard/admin/manage-services/add-service"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 bg-violet-600 text-white hover:bg-violet-700",
            )}
          >
            <Plus className="size-4" />
            Add Service
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b px-5 py-4">
            <h2 className="font-semibold text-slate-800">All Services</h2>
            <p className="mt-1 text-xs text-slate-500">
              Manage your salon service information.
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-violet-50">
                <TableRow>
                  <TableHead className="pl-6">#</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {currentServices.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-12 text-center text-sm text-slate-500"
                    >
                      No services found.{" "}
                      <Link
                        href="/dashboard/admin/manage-services/add-service"
                        className="font-medium text-violet-600 hover:underline"
                      >
                        Add your first service
                      </Link>
                      .
                    </TableCell>
                  </TableRow>
                ) : (
                  currentServices.map((service, index) => {
                    const isDeleting = deletingId === service._id;

                    return (
                      <TableRow key={service._id}>
                        <TableCell className="pl-6 text-slate-500">
                          {startIndex + index + 1}
                        </TableCell>

                        <TableCell>
                          <Image
                            src={service.image}
                            alt={service.name}
                            width={48}
                            height={48}
                            className="size-12 rounded-lg border object-cover"
                          />
                        </TableCell>

                        <TableCell>
                          <p className="font-medium text-slate-900">
                            {service.name}
                          </p>
                          {service.description ? (
                            <p className="mt-1 max-w-40 truncate text-xs text-slate-500">
                              {service.description}
                            </p>
                          ) : null}
                        </TableCell>

                        <TableCell>
                          <Badge className="border-0 bg-indigo-50 text-indigo-600 hover:bg-indigo-50">
                            {service.category}
                          </Badge>
                        </TableCell>

                        <TableCell className="font-semibold text-slate-700">
                          ৳ {service.price}
                        </TableCell>

                        <TableCell className="text-slate-600">
                          {service.duration} min
                        </TableCell>

                        <TableCell>
                          <Badge
                            className={cn(
                              "gap-1 border-0",
                              service.active
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                : "bg-red-100 text-red-700 hover:bg-red-100",
                            )}
                          >
                            {service.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>

                        <TableCell className="pr-6">
                          <div className="flex items-center gap-2">
                            <Dialog
                              open={viewService?._id === service._id}
                              onOpenChange={(open) =>
                                setViewService(open ? service : null)
                              }
                            >
                              <DialogTrigger
                                render={
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="size-8"
                                    aria-label={`View ${service.name}`}
                                  >
                                    <Eye className="size-4" />
                                  </Button>
                                }
                              />
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>{service.name}</DialogTitle>
                                  <DialogDescription>
                                    {service.category}
                                  </DialogDescription>
                                </DialogHeader>

                                <Image
                                  src={service.image}
                                  alt={service.name}
                                  width={400}
                                  height={220}
                                  className="h-44 w-full rounded-lg border object-cover"
                                />

                                <p className="text-sm text-muted-foreground">
                                  {service.description ||
                                    "No description provided."}
                                </p>

                                <dl className="grid grid-cols-2 gap-3 text-sm">
                                  <div className="rounded-lg border p-3">
                                    <dt className="text-xs text-muted-foreground">
                                      Price
                                    </dt>
                                    <dd className="font-semibold text-slate-800">
                                      ৳ {service.price}
                                    </dd>
                                  </div>
                                  <div className="rounded-lg border p-3">
                                    <dt className="text-xs text-muted-foreground">
                                      Duration
                                    </dt>
                                    <dd className="font-semibold text-slate-800">
                                      {service.duration} min
                                    </dd>
                                  </div>
                                </dl>

                                <DialogFooter>
                                  <DialogClose
                                    render={
                                      <Button variant="outline">Close</Button>
                                    }
                                  />
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <UpdateServiceData service={service} />

                            <AlertDialog
                              open={openDialog === service._id}
                              onOpenChange={(open) =>
                                setOpenDialog(open ? service._id : null)
                              }
                            >
                              <AlertDialogTrigger
                                render={
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="size-8 text-red-500"
                                    aria-label={`Delete ${service.name}`}
                                    disabled={isDeleting}
                                  >
                                    <Trash2 className="size-4" />
                                  </Button>
                                }
                              />
                              <AlertDialogContent size="sm">
                                <AlertDialogHeader>
                                  <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                    <Trash2Icon />
                                  </AlertDialogMedia>
                                  <AlertDialogTitle>
                                    Delete service?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete{" "}
                                    <span className="font-medium text-foreground">
                                      {service.name}
                                    </span>
                                    ? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel
                                    variant="outline"
                                    disabled={isDeleting}
                                  >
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    variant="destructive"
                                    disabled={isDeleting}
                                    onClick={() => handleDeleteData(service)}
                                  >
                                    {isDeleting ? (
                                      <>
                                        <Loader2 className="size-4 animate-spin" />
                                        Deleting...
                                      </>
                                    ) : (
                                      "Delete"
                                    )}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              Showing {showingFrom}-{showingTo} of {services.length} services
            </p>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.max(1, prev - 1))
                }
                disabled={currentPageSafe === 1}
              >
                Previous
              </Button>

              <span className="text-sm text-slate-600">
                Page {currentPageSafe} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPageSafe >= totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageServicesTable;
