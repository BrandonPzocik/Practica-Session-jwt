//importar conexcion a base de datos
import { connection } from "../db/database.js";

//ruta LOGIN (iniciar sesion)
export const postUsersCtrl = async (req, res) => {
  const { username, password } = req.body;
  // Consulta a la base de datos
  connection.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error en la base de datos" });
      }

      if (results.length > 0) {
        const user = results[0];

        // Guardar información del usuario en la sesión
        req.session.userId = user.id;
        req.session.username = user.username;

        return res.json({
          message: "Inicio de sesión exitoso",
          user: { id: user.id, username: user.username },
        });
      } else {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }
    }
  );
};

//ruta SESSION (obtener los datos de la sesion)
export const getUsersCrlt = async (req, res) => {
  if (req.session.userId) {
    return res.json({
      loggedIn: true,
      user: { id: req.session.userId, username: req.session.username },
    });
  } else {
    return res
      .status(401)
      .json({ loggedIn: false, message: "No hay sesión activa" });
  }
};

export const postLogOutCtrl = async (req, res) => {
  console.log(req.session);
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error al cerrar la sesión" });
    }
    res.clearCookie("connect.sid"); // Nombre de cookie por defecto para express-session
    return res.json({ message: "Sesión cerrada exitosamente" });
  });
};
