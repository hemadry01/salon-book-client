"use client";

import Link from "next/link";
import { Check, Plus, Eye, Pencil, Trash2, Trash2Icon } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { IService } from "@/type/service";
import Image from "next/image";
import { useState } from "react";


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
import { toast } from "@/components/ui/toast";

interface IServiceProps{
  serviceItem:IService[]
}

const ManageServicesTable = ({ serviceItem }:IServiceProps) => {

  console.log(serviceItem);
  const[currentPage, setCurrentPage]=useState(1);
  const[openDialog, setOpenDialog] =useState<string | null>(null)
  const itemsPerPage = 10;

  const totalPages = Math.ceil(
    serviceItem.length / itemsPerPage
  );

  const startIndex = (currentPage - 1)*itemsPerPage;
  const currentServices = serviceItem.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handledeleteData = async (id: string) => {
    //console.log(serviceItem.);
    try {
      const res = await fetch(
        `http://localhost:8000/admin/service/${id}`,
        {
          method: "DELETE",
        },
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      toast.add({
        title: "Delete Service",
        description: "Service deleted successfully!",
      });

      setOpenDialog(null);

      window.location.reload();

    } catch (error) {
      toast.add({
        type: "error",
        title: "Deleted service failed!",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
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

        {/* Statistics
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Services</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">01</h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Active Services</p>
            <h2 className="mt-2 text-2xl font-bold text-emerald-600">01</h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Inactive Services</p>
            <h2 className="mt-2 text-2xl font-bold text-red-500">00</h2>
          </div>
        </div> */}

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
                {currentServices.map((service, index) => (
                  <TableRow key={service._id}>
                    <TableCell className="pl-6 text-slate-500">
                      {index + 1}
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
                      {/* <p className="mt-1 max-w-40 truncate text-xs text-slate-500">
                        {service.description}
                      </p> */}
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
                      <Badge className="gap-1 border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                        <Check className="size-3" />
                        Active
                      </Badge>
                    </TableCell>

                    <TableCell className="pr-6">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="size-8"
                          aria-label="View service"
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="size-8 text-violet-600"
                          aria-label="Edit service"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger
                            render={
                              // <Button variant="destructive">Delete Chat</Button>
                              <Button
                                size="icon"
                                variant="outline"
                                className="size-8 text-red-500"
                                aria-label="Delete service"
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
                              <AlertDialogTitle>Delete chat?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete `{service.name}`
                                ? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel variant="outline">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={(e) => 
                                 { e.preventDefault();
                                  handledeleteData(service._id)}}
                                variant="destructive"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-6 p-2">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageServicesTable;
