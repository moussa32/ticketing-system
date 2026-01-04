"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import EditDepartmentModal from "./EditDepartmentModal";
import { deleteDepartment } from "../actions/departmentActions";

export default function DepartmentsTable({ departments, refreshData }) {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this department?")) {
      await deleteDepartment(id);
      refreshData();
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-gray-100">
                <TableHead className="pl-6">ID</TableHead>
                <TableHead>Department Name</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-12 text-muted-foreground"
                  >
                    No departments found
                  </TableCell>
                </TableRow>
              ) : (
                departments.map((dept) => (
                  <TableRow
                    key={dept.dept_id}
                    className="hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    <TableCell className="pl-6 font-medium text-gray-900">
                      {dept.dept_id}
                    </TableCell>
                    <TableCell>{dept.dept_name}</TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(dept)}
                          className="h-8 w-8 text-gray-500 hover:text-indigo-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(dept.dept_id)}
                          className="h-8 w-8 text-gray-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditDepartmentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        department={selectedDepartment}
        onDepartmentUpdated={() => {
          refreshData();
          setIsEditModalOpen(false);
        }}
      />
    </>
  );
}
