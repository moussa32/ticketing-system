"use server";

import { Department } from "@/lib/database";

export async function getAllDepartments() {
  try {
    const departments = await Department.findAll();
    return JSON.parse(JSON.stringify(departments));
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
}

export async function createDepartment(departmentData) {
  try {
    const newDepartment = await Department.create({
      dept_name: departmentData.dept_name,
    });
    return {
      success: true,
      message: "Department created successfully",
      department: JSON.parse(JSON.stringify(newDepartment)),
    };
  } catch (error) {
    console.error("Error creating department:", error);
    return { success: false, message: error.message };
  }
}

export async function updateDepartment(departmentId, departmentData) {
  try {
    const department = await Department.findByPk(departmentId);
    if (!department) {
      throw new Error("Department not found");
    }

    await department.update({
      dept_name: departmentData.dept_name,
    });

    return { success: true, message: "Department updated successfully" };
  } catch (error) {
    console.error("Error updating department:", error);
    return { success: false, message: error.message };
  }
}

export async function deleteDepartment(departmentId) {
  try {
    const department = await Department.findByPk(departmentId);
    if (!department) {
      throw new Error("Department not found");
    }

    await department.destroy();
    return { success: true, message: "Department deleted successfully" };
  } catch (error) {
    console.error("Error deleting department:", error);
    return { success: false, message: error.message };
  }
}
