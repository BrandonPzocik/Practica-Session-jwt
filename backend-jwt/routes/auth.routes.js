import { Router } from "express";
import validarJwt from "../middlewares/validar-jwt.js";
import {
  loginCtrl,
  logOutCtrl,
  sessionCtrl,
} from "../controllers/auth.controllers.js";
import { registerUsersCtrl } from "../controllers/auth.controllers.js";

const authRouter = Router();

// Endpoint de inicio de sesión (login)
authRouter.post("/login", loginCtrl);

// Endpoint para validar la sesión
authRouter.get("/session", validarJwt, sessionCtrl);

// Endpoint de cierre de sesión (logout)
authRouter.post("/logout", logOutCtrl);

authRouter.post("/register", registerUsersCtrl);

export { authRouter };
