// helpers/getUserIdFromReq.ts

import { Request } from "express";

/**
 * Extracts the user ID from the JWT in the request object.
 * Assumes that the JWT has been verified and attached to req.user.
 *
 * @param req - The Express request object.
 * @returns The user ID from the JWT, or null if not found.
 */
export const getUserIdFromReq = (req: Request): number | null => {
  if (req.user && typeof req.user === "object" && "sub" in req.user) {
    const sub = req.user.sub;
    if (typeof sub === "string") {
      return parseInt(sub, 10); // Convert the sub to a number if it's a string
    }
  }
  return null; // Return null if sub is not found or not a string
};
