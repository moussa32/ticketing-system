"use server";

import { revalidatePath } from "next/cache";
import { Department, UserDepartment, Ticket } from "@/lib/database";

export async function getAllDepartments() {
  try {
    const departments = await Department.findAll({
      attributes: ["dept_id", "dept_name"],
      order: [["dept_id", "DESC"]],
    });

    return JSON.parse(JSON.stringify(departments));
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
}

export async function createDepartment(data) {
  try {
    const newDepartment = await Department.create({
      dept_name: data.name,
    });

    revalidatePath("/dashboard/admin/departments");

    return {
      success: true,
      message: "Department created successfully",
      department: JSON.parse(JSON.stringify(newDepartment)),
    };
  } catch (error) {
    console.error("Error creating department:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return { success: false, message: "Department name already exists" };
    }
    return { success: false, message: error.message };
  }
}

export async function updateDepartment(deptId, data) {
  try {
    const department = await Department.findByPk(deptId);

    if (!department) {
      return { success: false, message: "Department not found" };
    }

    await department.update({
      dept_name: data.name,
    });

    revalidatePath("/dashboard/admin/departments");

    return { success: true, message: "Department updated successfully" };
  } catch (error) {
    console.error("Error updating department:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return { success: false, message: "Department name already exists" };
    }
    return { success: false, message: error.message };
  }
}

export async function deleteDepartment(deptId) {
  try {
    const department = await Department.findByPk(deptId);

    if (!department) {
      return { success: false, message: "Department not found" };
    }

    // Check if department has tickets
    const ticketCount = await Ticket.count({ where: { dept_id: deptId } });
    if (ticketCount > 0) {
      return {
        success: false,
        message: `Cannot delete department. It has ${ticketCount} ticket(s) associated.`,
      };
    }

    // Delete related user-department associations
    await UserDepartment.destroy({ where: { dept_id: deptId } });

    // Now delete the department
    await department.destroy();

    revalidatePath("/dashboard/admin/departments");

    return { success: true, message: "Department deleted successfully" };
  } catch (error) {
    console.error("Error deleting department:", error);
    return { success: false, message: error.message };
  }
}
