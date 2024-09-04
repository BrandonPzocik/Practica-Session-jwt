import cors from "cors";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import path from "path";

import { database } from "./db/database.js";
import {
  getUsersCrlt,
  postLogOutCtrl,
  postUsersCtrl,
} from "./src/controllers/auth.controllers.js";

const app = express();
const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();

// Middlewares
app.use(
  cors({
    // Permitir solicitudes desde el front-end
    origin: ["http://localhost:5500", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Habilitar envío de cookies
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "mi_secreto",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // true solo si usas HTTPS
      httpOnly: true, // evita acceso a cookie desde JavaScript del cliente
      // sameSite: 'lax' // permite envío de cookies en navegadores modernos
    },
  })
);

// Ruta para manejar el inicio de sesión
app.post("/login", postUsersCtrl);

// Ruta para obtener los datos de la sesión
app.get("/session", getUsersCrlt);

// Ruta para cerrar la sesión
app.post("/logout", postLogOutCtrl);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);
