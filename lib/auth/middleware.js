import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { validateUserAccess } from "../services/authService";

/**
 * Middleware to protect routes based on authentication and role
 * @param {Object} options - Configuration options
 * @param {string[]} options.requiredRoles - Array of roles allowed to access this route
 * @returns {Function} Middleware function
 */
export function withAuth(options = {}) {
  return async (request) => {
    const token = request.cookies.get("token")?.value;

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Verify token
    const payload = await validateUserAccess(token)
    if (!payload) {
      // Token is invalid, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Check role if required roles are specified
    if (options.requiredRoles && options.requiredRoles.length > 0) {
      if (!options.requiredRoles.includes(payload.role)) {
        // User doesn't have required role, redirect to unauthorized
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // Add user info to request headers for downstream access
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.id);
    requestHeaders.set("x-user-role", payload.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  };
}

/**
 * Extracts user information from request headers (set by middleware)
 * @param {Object} request - The Next.js request object
 * @returns {Object} User information with id and role
 */
export function getUserFromHeaders(request) {
  return {
    id: request.headers.get("x-user-id"),
    role: request.headers.get("x-user-role"),
  };
}
