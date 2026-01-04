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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import CreateDepartmentModal from "./CreateDepartmentModal";
import EditDepartmentModal from "./EditDepartmentModal";
import {
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../actions/departmentActions";

export default function DepartmentsTable({ departments }) {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setIsEditModalOpen(true);
  };

  const handleCreate = async (formData) => {
    const result = await createDepartment(formData);
    return result;
  };

  const handleUpdate = async (deptId, formData) => {
    const result = await updateDepartment(deptId, formData);
    return result;
  };

  const handleDelete = async (department) => {
    if (
      confirm(
        `Are you sure you want to delete "${department.dept_name}"? This action cannot be undone.`
      )
    ) {
      const result = await deleteDepartment(department.dept_id);
      if (!result.success) {
        alert(result.message || "Failed to delete department");
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Departments Management
            </h2>
            <p className="text-sm text-gray-500">
              Manage departments in your organization
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Department
          </Button>
        </div>
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
                    No departments available
                  </TableCell>
                </TableRow>
              ) : (
                departments.map((department) => (
                  <TableRow
                    key={department.dept_id}
                    className="hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    <TableCell className="pl-6">
                      <Badge variant="outline" className="font-mono bg-gray-50">
                        {department.dept_id}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-gray-900">
                        {department.dept_name}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleEdit(department)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(department)}
                        >
                          <Trash2 className="w-4 h-4" />
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

      <CreateDepartmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      <EditDepartmentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        department={selectedDepartment}
        onSave={handleUpdate}
      />
    </>
  );
}
