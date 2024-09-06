import { pool } from "../db/database.js";
import { generarJwt } from "../helpers/generar-jwt.js";

//importar generador de jwt

//ruta login
export const loginCtrl = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar el usuario por el username
    const [user] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    // Validar si el usuario existe
    if (user.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Comparar contraseñas
    if (user[0].password !== password) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Generar token JWT
    const token = await generarJwt(user[0].id);

    // Almacenar el token en la sesión del servidor
    req.session.token = token;

    // Almacenar el token en una cookie segura
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, // Cambiar a true en producción con HTTPS
      maxAge: 3600000, // Expiración en milisegundos (1 hora)
    });

    return res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};
//ruta session
export const sessionCtrl = (req, res) => {
  return res.json({
    message: "Acceso permitido a área protegida",
    user: req.user,
  });
};

//ruta logOut
export const logOutCtrl = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }

      res.clearCookie("authToken");
      return res.json({ message: "Cierre de sesión exitoso" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};
