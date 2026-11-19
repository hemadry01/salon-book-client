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

interface IUserProps {
  users: IUser;
}

const UserManagement = ({ users }: IUserProps) => {
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

      <TableCell>
        <Badge className="border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          Active
        </Badge>
      </TableCell>
    </TableRow>
  );
};

export default UserManagement;
