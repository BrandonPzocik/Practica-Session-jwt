import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../config/env.js";
import { pool } from "../db/database.js";

// Middleware para verificar el token JWT
export default (req, res, next) => {
  console.log(req.session);
  console.log("-----------");
  console.log(req.cookies);

  const token = req.cookies.authToken || req.session.token;

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  try {
    // Verificar y decodificar el token JWT
    const decoded = jwt.verify(token, SECRET_KEY);

    // Consultar al usuario en la base de datos usando el pool
    const [rows] = pool.query("SELECT * FROM users WHERE id = ?", [
      decoded.userId,
    ]);

    // Verificar si el usuario existe en la base de datos
    if (rows.length === 0) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // Agregar la información del usuario decodificada al request
    req.user = rows[0];

    // Continuar con el siguiente middleware
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error en la autenticación", error: error.message });
  }
};
