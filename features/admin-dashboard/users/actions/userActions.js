"use server";

import { revalidatePath } from "next/cache";
import {
  Users,
  UserDepartment,
  Ticket,
  ReplyTicket,
  CustomerSurvey,
  CustomerComplaint,
} from "@/lib/database";

export async function getAllUsers() {
  try {
    const users = await Users.findAll({
      attributes: [
        "user_id",
        "first_name",
        "last_name",
        "email",
        "role_id",
        "status",
      ],
      order: [["user_id", "DESC"]],
    });

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function createUser(userData) {
  try {
    // Map role name to role_id
    const roleMap = {
      admin: 1,
      agent: 2,
      customer: 3,
    };

    const newUser = await Users.create({
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password, // TODO: Hash password before saving
      role_id: roleMap[userData.role] || 3,
      status: userData.isActive ? "Active" : "Inactive",
    });

    revalidatePath("/dashboard/admin/users");

    return {
      success: true,
      message: "User created successfully",
      user: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return { success: false, message: "Email already exists" };
    }
    return { success: false, message: error.message };
  }
}

export async function updateUser(userId, userData) {
  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if email is being changed to one that already exists (for a different user)
    if (userData.email && userData.email !== user.email) {
      const existingUser = await Users.findOne({
        where: { email: userData.email },
      });
      if (existingUser && existingUser.user_id !== userId) {
        return { success: false, message: "Email already exists" };
      }
    }

    // Map role name to role_id
    const roleMap = {
      admin: 1,
      agent: 2,
      customer: 3,
    };

    const updateData = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      role_id: roleMap[userData.role] || 3,
      status: userData.isActive ? "Active" : "Inactive",
    };

    // Only update password if provided
    if (userData.password && userData.password.trim() !== "") {
      // TODO: Hash password before saving
      updateData.password = userData.password;
    }

    await user.update(updateData);

    revalidatePath("/dashboard/admin/users");

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return { success: false, message: "Email already exists" };
    }
    if (error.name === "SequelizeValidationError") {
      return {
        success: false,
        message: error.errors?.[0]?.message || "Validation error",
      };
    }
    return { success: false, message: error.message };
  }
}

export async function deleteUser(userId) {
  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Check if user has tickets
    const ticketCount = await Ticket.count({ where: { user_id: userId } });
    if (ticketCount > 0) {
      return {
        success: false,
        message: `Cannot delete user. They have ${ticketCount} ticket(s) associated. Consider deactivating the user instead.`,
      };
    }

    // Check if user has replied to tickets
    const replyCount = await ReplyTicket.count({ where: { user_id: userId } });
    if (replyCount > 0) {
      return {
        success: false,
        message: `Cannot delete user. They have ${replyCount} ticket reply(ies). Consider deactivating the user instead.`,
      };
    }

    // Delete related records that are safe to delete
    await UserDepartment.destroy({ where: { user_id: userId } });
    await CustomerSurvey.destroy({ where: { user_id: userId } });
    await CustomerComplaint.destroy({ where: { user_id: userId } });

    // Now delete the user
    await user.destroy();

    revalidatePath("/dashboard/admin/users");

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
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

export async function logoutUserSession(userId) {
  try {
    /*await Sessions.update(
      { isActive: false },
      { 
        where: { 
          userId,
          isActive: true
        },
        limit: 1
      }
    );*/

    return { success: true, message: "User logged out successfully" };
  } catch (error) {
    console.error("Error logging out user:", error);
    return { success: false, message: error.message };
  }
}

export async function logoutAllUserSessions(userId) {
  try {
    /*await Sessions.update(
      { isActive: false },
      { 
        where: { 
          userId,
          isActive: true
        }
      }
    );*/

    return { success: true, message: "All sessions logged out successfully" };
  } catch (error) {
    console.error("Error logging out all sessions:", error);
    return { success: false, message: error.message };
  }
}

export async function loginAsUser(userId) {
  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // TODO: Implement actual session creation and authentication
    // This would typically create a new session token and set it in cookies

    return {
      success: true,
      message: `Logged in as ${user.firstName} ${user.lastName}`,
      redirectUrl: "/dashboard", // Redirect based on user role
    };
  } catch (error) {
    console.error("Error logging in as user:", error);
    return { success: false, message: error.message };
  }
}
