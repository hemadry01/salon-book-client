"use client";

import { IUser } from "@/type/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ban, CheckCircle, MoreHorizontal } from "lucide-react";
import { toast } from "@/components/ui/toast";

interface IUserProps {
  users: IUser;
}

const UserManagement = ({ users }: IUserProps) => {

  const handleBlockStatus = async() => {
    const newStatus = !users.isBlocked
    const res = await fetch(
      `${process.env.BASE_URL}/admin/user/${users._id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isBlocked: newStatus,
        }),
      },
    );
      const data= await res.json();
      
      console.log("Status Code:", res.status);
      console.log("API Response:", data);

      if(res.ok){
        toast.add({
          title: "status",
          description: "User bolock",
        });
      }else{
        toast.add({
          title: "status",
          description: "User bolock failed",
        });
      }
  };
  return (
    <TableRow className="w-full transition-colors hover:bg-gray-50">
      <TableCell>
        <Avatar className="h-10 w-10">
          <AvatarImage src={users.image} alt={users.name} />
          <AvatarFallback>{users.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </TableCell>

      <TableCell className="font-medium text-gray-900">{users.name}</TableCell>

      <TableCell className="text-gray-700">{users.email}</TableCell>

      <TableCell>
        <Badge
          variant={users.role === "admin" ? "default" : "secondary"}
          className="capitalize"
        >
          {users.role}
        </Badge>
      </TableCell>

      {/* Account Status */}
      <TableCell>
        <Badge
          className={
            users.isBlocked
              ? "border-0 bg-red-100 text-red-700 hover:bg-red-100"
              : "border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
          }
        >
          {users.isBlocked ? "Blocked" : "Active"}
        </Badge>
      </TableCell>

      {/* Action Dropdown */}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground">
            Actions
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {users.isBlocked ? (
              <DropdownMenuItem
                onClick={handleBlockStatus}
                className="text-emerald-600"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Unblock User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={handleBlockStatus}
                className="text-red-600"
              >
                <Ban className="mr-2 h-4 w-4" />
                Block User
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default UserManagement;
