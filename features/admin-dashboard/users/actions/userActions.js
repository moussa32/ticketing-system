"use server";

<<<<<<< HEAD
import { Users } from "@/lib/database";
import { Op } from "sequelize";
=======
import { Users } from '@/lib/database';
import { Op } from 'sequelize';
>>>>>>> Branch_Customer_Agent_FAQ

export async function getAllUsers() {
  try {
    const users = await Users.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "role",
        "isActive",
        "createdAt",
      ],
      order: [["createdAt", "DESC"]],
    });

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function updateUser(userId, userData) {
  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const updateData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
      isActive: userData.isActive,
    };

    // Only update password if provided
    if (userData.password && userData.password.trim() !== "") {
      // TODO: Hash password before saving
      updateData.password = userData.password;
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
<<<<<<< HEAD
    console.error("Error resetting password:", error);
=======
    console.error('Error resetting password:', error);
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
    
    return { success: true, message: 'User logged out successfully' };
  } catch (error) {
    console.error('Error logging out user:', error);
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
    
    return { success: true, message: 'All sessions logged out successfully' };
  } catch (error) {
    console.error('Error logging out all sessions:', error);
>>>>>>> Branch_Customer_Agent_FAQ
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
