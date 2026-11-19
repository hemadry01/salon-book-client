
import UserManagement from '@/components/UserManagement';
import { IUser } from '@/type/user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from 'react';

const ManageuserPage = async() => {
    let userData:IUser[]=[];
    try {
        const result = await fetch("http://localhost:5000/api/admin/users", {
          next: { revalidate: 60 },
        });

        if (!result.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await result.json();
        userData = data.data;

        console.log(userData);

    } catch (error) {
        console.error(error);
    }
    return (
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 p-5">
        <div className="w-full min-h-screen overflow-auto bg-white dark:bg-gray-900 shadow-sm">
          <Table className="w-full table-fixed">
            <TableHeader className="sticky top-0 z-20 bg-gray-100 dark:bg-gray-800">
              <TableRow>
                <TableHead className="">Image</TableHead>
                <TableHead className="">Name</TableHead>
                <TableHead className="">Email</TableHead>
                <TableHead className="">Role</TableHead>
                <TableHead className="">Active</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {userData.map((users) => (
                <UserManagement key={users._id} users={users} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
};

export default ManageuserPage;