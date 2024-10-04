import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { generateToken } from "@interface/helpers/jwt";

// Middleware para verificar el token JWT
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401); // Si no hay token, retornar Unauthorized

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403); // Si el token es inválido o ha expirado, retornar Forbidden

    req.user = user; // Adjuntar la información del usuario a la solicitud
    next(); // Continuar con el siguiente middleware o manejador de la ruta
  });
};

// Middleware para renovar el token si está cerca de expirar
export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401); // Si no hay token, retornar Unauthorized

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403); // Si el token es inválido o ha expirado, retornar Forbidden

    const exp = (user as any).exp * 1000; // Convertir el tiempo de expiración en milisegundos

    // Si el token va a expirar en los próximos 15 minutos, generar un nuevo token
    if (exp - Date.now() < 15 * 60 * 1000) {
      const newToken = generateToken({ id: (user as any).id, email: (user as any).email });
      res.setHeader("Authorization", `Bearer ${newToken}`); // Devolver el nuevo token en el header
    }

    req.user = user; // Adjuntar la información del usuario a la solicitud
    next(); // Continuar con el siguiente middleware o manejador de la ruta
  });
};
