import { createPool } from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PORT, DB_USER } from "../config/env.js";

// Crear el pool de conexiones directamente
const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  port: DB_PORT,
});

// Mensaje de conexión exitosa
pool
  .getConnection()
  .then(() => console.log("Base de datos conectada con éxito"))
  .catch((error) =>
    console.log("Error al conectar a la base de datos:", error.message)
  );

export { pool };
