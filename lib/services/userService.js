import Users from "../../lib/database/models/Users";
import bcrypt from "bcrypt";

/**
 * Retrieves all users from the database
 * @returns {Promise<Array>} Array of all users
 */
export async function getUsers() {
  return await Users.findAll();
}

/**
 * Retrieves a user by their ID
 * @param {string} userId - The user's ID
 * @returns {Promise<Object>} User object or null if not found
 */
export async function getUserById(userId) {
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message || "Failed to retrieve user");
  }
}

/**
 * Updates user profile information
 * @param {string} userId - The user's ID
 * @param {Object} profileData - Object containing firstName and lastName
 * @returns {Promise<Object>} Updated user object
 * @throws {Error} If user not found or update fails
 */
export async function updateUserProfile(userId, profileData) {
  try {
    const { firstName, lastName } = profileData;

    // Validate input
    if (!firstName || !lastName) {
      throw new Error("First name and last name are required");
    }

    if (firstName.trim().length === 0 || lastName.trim().length === 0) {
      throw new Error("Names cannot be empty");
    }

    const user = await Users.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Update user profile
    user.firstName = firstName.trim();
    user.lastName = lastName.trim();
    await user.save();

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to update profile");
  }
}

/**
 * Changes user password
 * @param {string} userId - The user's ID
 * @param {string} currentPassword - The current password (plain text)
 * @param {string} newPassword - The new password (plain text)
 * @returns {Promise<Object>} Success message
 * @throws {Error} If validation fails or update fails
 */
export async function changeUserPassword(userId, currentPassword, newPassword) {
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Validate passwords
    if (!currentPassword || !newPassword) {
      throw new Error("Current password and new password are required");
    }

    if (newPassword.length < 6) {
      throw new Error("New password must be at least 6 characters long");
    }

    if (currentPassword === newPassword) {
      throw new Error("New password must be different from current password");
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    return {
      message: "Password changed successfully",
    };
  } catch (error) {
    throw new Error(error.message || "Failed to change password");
  }
}