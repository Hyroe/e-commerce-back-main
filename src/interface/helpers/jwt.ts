import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

interface jwtProps {
  id: number,
  email: string,
  name?: string | null,
  role?: string | null,
}

// Tiempo de expiración para el token
const TOKEN_EXPIRATION = "1h";

// Función para generar un token JWT
export const generateToken = (user: jwtProps) => {
  return jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: TOKEN_EXPIRATION,
  });
};