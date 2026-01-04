"use client";

import { useEffect, useState } from "react";
import DepartmentsTable from "@/features/admin-dashboard/departments/components/DepartmentsTable";
import CreateDepartmentModal from "@/features/admin-dashboard/departments/components/CreateDepartmentModal";
import { getAllDepartments } from "@/features/admin-dashboard/departments/actions/departmentActions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchData = async () => {
    const data = await getAllDepartments();
    setDepartments(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Departments
          </h1>
          <p className="text-muted-foreground">Manage support departments.</p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Department
        </Button>
      </div>

      <DepartmentsTable departments={departments} refreshData={fetchData} />

      <CreateDepartmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onDepartmentCreated={fetchData}
      />
    </div>
  );
}
