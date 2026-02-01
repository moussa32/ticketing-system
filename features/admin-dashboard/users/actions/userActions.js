"use server";

import { Users, Role } from "@/lib/database";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

export async function getAllUsers() {
  try {
    const users = await Users.findAll({
      include: [
        {
          model: Role,
          attributes: ["role_id", "role_name"],
        },
      ],
    });
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function getRoles() {
  try {
    const roles = await Role.findAll();
    return JSON.parse(JSON.stringify(roles));
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
}

export async function createUser(userData) {
  try {
    // Check if email already exists
    const existingUser = await Users.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      return { success: false, message: "Email already exists" };
    }

    const newUser = await Users.create({
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password, // TODO: Hash password
      role_id: userData.roleId,
      status: userData.status || "Active",
      is_temp_pass: "N",
    });

    return {
      success: true,
      message: "User created successfully",
      user: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: error.message };
  }
}

export async function updateUser(userId, userData) {
  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const updateData = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      role_id: userData.roleId,
      status: userData.isActive ? "Active" : "Inactive",
    };

    // Only update password if provided
    if (userData.password && userData.password.trim() !== "") {
      if (userData.password.length < 6) {
        return {
          success: false,
          message: "Password must be at least 6 characters long",
        };
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      updateData.password = hashedPassword;
    }

    await user.update(updateData);

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: error.message };
  }
}

export async function resetUserPassword(userId) {
  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8);

    // TODO: Hash password before saving
    await user.update({ password: tempPassword });

    return {
      success: true,
      message: "Password reset successfully",
      tempPassword, // In production, send this via email instead
    };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { success: false, message: error.message };
  }
}
