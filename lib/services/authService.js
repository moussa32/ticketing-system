import { Users } from "../../lib/database";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
const SKP = "GRADUATION_PROJECT";

/**
 * Enum-like object for user roles
 */
const ROLES = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  AGENT: "agent",
};

// Array of all valid roles for validation
const VALID_ROLES = Object.values(ROLES);

/**
 * Generates a new JWT token with the provided payload.
 * @param {Object} payload - The data to encode in the token
 * @returns {string} The signed JWT token
 */
function generateNewToken(payload) {
  const signDate = new Date();
  const token = jwt.sign({ ...payload, signDate }, SKP);
  return token;
}

/**
 * Verifies and decodes a JWT token.
 * @param {string} token - The JWT token to verify
 * @returns {Object} The decoded token payload
 */
function verifyToken(token) {
  const decoded = jwt.verify(token, SKP);
  return decoded;
}

/**
 * Hashes a plain text password using bcrypt.
 * @param {string} password - The plain text password to hash
 * @param {number} rounds - The number of salt rounds for bcrypt
 * @returns {Promise<string>} The hashed password
 */
async function hashingPassword(password, rounds) {
  const salt = await bcrypt.genSalt(rounds);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

/**
 * Compares a plain text password with a hashed password.
 * @param {string} plainTextPassword - The plain text password to validate
 * @param {string} hashPassword - The hashed password to compare against
 * @returns {Promise<boolean>} True if passwords match, false otherwise
 */
async function validatePassword(plainTextPassword, hashPassword) {
  return bcrypt.compare(plainTextPassword, hashPassword);
}

// /**
//  * Registers a new user in the system.
//  * @param {string} role - The role to assign to the user (ADMIN, CUSTOMER, or AGENT)
//  * @param {Object} userInfo - User information containing email, password, firstName, lastName
//  * @returns {Promise<Object>} Object containing firstName and access_token
//  * @throws {Error} If user already exists or registration fails
//  */
export async function registerUser(role, userInfo) {
  try {
    const { email, password, firstName, lastName } = userInfo;
    const user = await Users.findOne({ where: { email } });

    if (user && user.id) {
      throw new Error("An account with this email already exists.");
    }
    const hashPassword = await hashingPassword(password, 10);

    const userResults = await Users.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      role: role.toLowerCase(),
    });

    return {
      firstName,
      role,
      id: userResults.id,
      access_token: generateNewToken({ id: userResults.id, role }),
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Authenticates a user and generates an access token.
 * @param {Object} userInfo - User login information containing email and password
 * @returns {Promise<Object>} Object containing firstName and access_token
 * @throws {Error} If user not found or password is invalid
 */
export async function loginUser(userInfo) {
  try {
    const { email, password } = userInfo;
    const user = await Users.findOne({ where: { email } });

    console.log(user.dataValues.password);
    console.log(user.firstName);
    if (!user || !user.id) {
      throw new Error("It looks like you don’t have an account yet");
    }
    const isPasswordValid = await validatePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error(
        "We couldn’t verify your login details. Please try again"
      );
    }

    const response = {
      id: user.id,
      role: user.role,
      firstName: user.firstName,
      access_token: generateNewToken({ id: user.id, role: user.role }),
    };

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

/**
 * Validates if a user has access with the specified role and token.
 * @param {string} role - The required role to validate (ROLES.ADMIN, ROLES.CUSTOMER, or ROLES.AGENT)
 * @param {string} token - The JWT token to verify
 * @returns {boolean} True if user has valid access, false otherwise
 */
export async function validateUserAccess(token) {
  const userSkInfo = verifyToken(token);
  return userSkInfo;
}

export async function changePassword(id, userInfo) {
  const { password } = userInfo;

  const newHashedPassword = await hashingPassword(password);

  const [_, created] = await Users.upsert(
    { id, password: newHashedPassword },
    { returning: true }
  );

  return {
    firstName: created.firstName,
    access_token: generateNewToken({ role: created.role, id }),
  };
}

export async function updateProfile(id, userInfo) {
  if (userInfo.email || userInfo.password) {
    throw new Error("Connot update email or password");
  }

  const [_, created] = await Users.upsert(
    { ...userInfo, id },
    { returning: true }
  );

  return created;
}
