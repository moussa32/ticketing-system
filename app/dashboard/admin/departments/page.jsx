import DepartmentsTable from "@/features/admin-dashboard/departments/components/DepartmentsTable";
import { getAllDepartments } from "@/features/admin-dashboard/departments/actions/departmentActions";

export default async function DepartmentsPage() {
  const departments = await getAllDepartments();

  return (
    <div>
      <DepartmentsTable departments={departments} />
    </div>
  );
}
