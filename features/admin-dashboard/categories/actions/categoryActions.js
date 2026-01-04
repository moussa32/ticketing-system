"use server";

import { revalidatePath } from "next/cache";
import { Category, Urgency } from "@/lib/database";

export async function getAllCategories() {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Urgency,
          attributes: ["urgency_id", "urgency_name"],
        },
      ],
      order: [["category_id", "DESC"]],
    });

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getAllUrgencies() {
  try {
    const urgencies = await Urgency.findAll({
      order: [["urgency_id", "ASC"]],
    });
    return JSON.parse(JSON.stringify(urgencies));
  } catch (error) {
    console.error("Error fetching urgencies:", error);
    return [];
  }
}

export async function createCategory(data) {
  try {
    const { name, description, urgencyId } = data;

    if (!name || name.trim() === "") {
      return { success: false, message: "Category name is required" };
    }

    const existingCategory = await Category.findOne({
      where: { category_name: name.trim() },
    });

    if (existingCategory) {
      return {
        success: false,
        message: "Category with this name already exists",
      };
    }

    const category = await Category.create({
      category_name: name.trim(),
      urgency_id: urgencyId || null,
    });

    // Fetch the created category with Urgency association
    const newCategory = await Category.findByPk(category.category_id, {
      include: [
        {
          model: Urgency,
          attributes: ["urgency_id", "urgency_name"],
        },
      ],
    });

    revalidatePath("/dashboard/admin/categories");

    return {
      success: true,
      message: "Category created successfully",
      data: JSON.parse(JSON.stringify(newCategory)),
    };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, message: error.message };
  }
}

export async function updateCategory(id, data) {
  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return { success: false, message: "Category not found" };
    }

    const { name, description, urgencyId } = data;

    if (name && name.trim() === "") {
      return { success: false, message: "Category name cannot be empty" };
    }

    if (name && name.trim() !== category.category_name) {
      const existingCategory = await Category.findOne({
        where: { category_name: name.trim() },
      });

      if (existingCategory) {
        return {
          success: false,
          message: "Category with this name already exists",
        };
      }
    }

    await category.update({
      category_name: name ? name.trim() : category.category_name,
      urgency_id: urgencyId !== undefined ? urgencyId : category.urgency_id,
    });

    // Fetch updated category with association
    const updatedCategory = await Category.findByPk(category.category_id, {
      include: [
        {
          model: Urgency,
          attributes: ["urgency_id", "urgency_name"],
        },
      ],
    });

    revalidatePath("/dashboard/admin/categories");

    return {
      success: true,
      message: "Category updated successfully",
      data: JSON.parse(JSON.stringify(updatedCategory)),
    };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, message: error.message };
  }
}

export async function deleteCategory(id) {
  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return { success: false, message: "Category not found" };
    }

    await category.destroy();

    revalidatePath("/dashboard/admin/categories");

    return { success: true, message: "Category deleted successfully" };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, message: error.message };
  }
}
