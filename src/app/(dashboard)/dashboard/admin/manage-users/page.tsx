import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import UserManagement from "@/components/UserManagement";
import type { IUser } from "@/type/user";

function UsersLoading() {
  return (
    <div className="flex min-h-60 items-center justify-center">
      <p className="text-sm text-muted-foreground">Loading users...</p>
    </div>
  );
}

export default function ManageuserPage() {
  return (
    <Suspense fallback={<UsersLoading />}>
      <ManageUsersContent />
    </Suspense>
  );
}


async function ManageUsersContent() {
  let userData: IUser[] = [];
  let errorMessage = "";

  try {


    const result = await fetch(`${process.env.BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const responseText = await result.text();

    console.log("Backend Status:", result.status);
    console.log("Backend Response:", responseText);

    let data;

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error("Backend থেকে valid JSON response আসেনি।");
    }
    userData = Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("Manage users error:", error);

    errorMessage =
      error instanceof Error ? error.message : "Unable to load users.";
  }

  return (
    <div className="w-full space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-sm text-muted-foreground">
          Manage all registered users.
        </p>
      </div>

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {userData.length > 0 ? (
              userData.map((user) => (
                <UserManagement key={user._id} users={user} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {errorMessage ? "Unable to load users" : "No users found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
