import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connection } from "next/server";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import UserManagement from "@/components/UserManagement";
import { IUser } from "@/type/user";

const ManageuserPage = async () => {
  // Dynamic request-time rendering
  // await connection();

  let userData: IUser[] = [];

  try {
    // Get JWT token from Better Auth
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    if (!token) {
      throw new Error("JWT token not found");
    }

    // Fetch users from Express backend
    const result = await fetch("http://localhost:8000/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    // Read response
    const responseText = await result.text();

    console.log("API Status:", result.status);

    if (!result.ok) {
      throw new Error(
        `Failed to fetch users: ${result.status} - ${responseText}`,
      );
    }

    const data = JSON.parse(responseText);

    // Ensure data is an array
    userData = Array.isArray(data.data) ? data.data : [];

    console.log("Users:", userData);
  } catch (error) {
    console.error("Manage users error:", error);
  }

  return (
    <div className="w-full space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-sm text-muted-foreground">
          Manage all registered users.
        </p>
      </div>

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
              userData.map((users) => (
                <UserManagement key={users._id} users={users} />
              ))
            ) : (
              <TableRow>
                <TableHead colSpan={4} className="h-24 text-center">
                  No users found
                </TableHead>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageuserPage;
