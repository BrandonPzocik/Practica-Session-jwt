import { Router } from "express";
import {
  getUsersCrlt,
  postLogOutCtrl,
  postUsersCtrl,
} from "./src/controllers/auth.controllers.js";

const authRouter = Router();

// Ruta para manejar el inicio de sesión
authRouter.post("/login", postUsersCtrl);

// Ruta para obtener los datos de la sesión
authRouter.get("/session", getUsersCrlt);

// Ruta para cerrar la sesión
authRouter.post("/logout", postLogOutCtrl);

export { authRouter };
