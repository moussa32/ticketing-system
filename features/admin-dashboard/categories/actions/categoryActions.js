"use server";

import { revalidatePath } from "next/cache";
import { Categories, Urgency } from "@/lib/database";

export async function getAllCategories() {
  try {
    const categories = await Categories.findAll({
      include: [
        {
          model: Urgency,
          as: "urgency",
          attributes: ["urgency_id", "urgency_name"],
        },
      ],
      order: [["createdAt", "DESC"]],
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

    const existingCategory = await Categories.findOne({
      where: { name: name.trim() },
    });

    if (existingCategory) {
      return {
        success: false,
        message: "Category with this name already exists",
      };
    }

    const category = await Categories.create({
      name: name.trim(),
      description: description?.trim() || null,
      urgencyId: urgencyId || null,
    });

    // Fetch the created category with Urgency association
    const newCategory = await Categories.findByPk(category.id, {
      include: [
        {
          model: Urgency,
          as: "urgency",
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
    const category = await Categories.findByPk(id);

    if (!category) {
      return { success: false, message: "Category not found" };
    }

    const { name, description, urgencyId } = data;

    if (name && name.trim() === "") {
      return { success: false, message: "Category name cannot be empty" };
    }

    if (name && name.trim() !== category.name) {
      const existingCategory = await Categories.findOne({
        where: { name: name.trim() },
      });

      if (existingCategory) {
        return {
          success: false,
          message: "Category with this name already exists",
        };
      }
    }

    await category.update({
      name: name ? name.trim() : category.name,
      description:
        description !== undefined
          ? description?.trim() || null
          : category.description,
      urgencyId: urgencyId !== undefined ? urgencyId : category.urgencyId,
    });

    // Fetch updated category with association
    const updatedCategory = await Categories.findByPk(category.id, {
      include: [
        {
          model: Urgency,
          as: "urgency",
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
    const category = await Categories.findByPk(id);

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
