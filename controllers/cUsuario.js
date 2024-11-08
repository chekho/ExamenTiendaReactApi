import mUsuario from "../models/mUsuario.js";
import errors from "../middleware/error.js";

const cUsuario = {
  getUsuarios: async (req, res) => {
    try {
      let usuarios = await mUsuario.getAll();
      if (usuarios.length === 0) {
        res.status(404).json({ err: true, message: "No hay usuarios" });
        return;
      }
      res.json(usuarios);
    } catch (error) {
      errors.e500(req, res, error);
    }
  },
  getUsuario: async (req, res) => {
    try {
      let id = req.params.id;
      let usuario = await mUsuario.getOne(id);
      if (!usuario) {
        res.status(404).json({ err: true, message: "Usuario no encontrado" });
        return;
      }
      res.json(usuario);
    } catch (error) {
      errors.e500(req, res, error);
    }
  },
  crearUsuario: async (req, res) => {
    try {
      const { nombre, apellido = "", email } = req.body;

      const validationError = validateUsuario(nombre, apellido, email);

      if (validationError) {
        res.status(400).json(validationError);
        return;
      }

      await mUsuario.create({ nombre, apellido, email });

      res.json({
        menssage: "Usuario creado",
      });
    } catch (error) {
      errors.e500(req, res, error);
    }
  },
  actualizarUsuario: async (req, res) => {
    try {
      let id = req.params.id;
      const { nombre, apellido = "", email } = req.body;
      const validationError = validateUsuario(nombre, apellido, email);
      if (validationError) {
        res.status(400).json(validationError);
        return;
      }

      await mUsuario.update({ id, nombre, apellido, email });
      let usuario = await mUsuario.getOne(id);
      if (!usuario) {
        res.status(404).json({ err: true, message: "Usuario no encontrado" });
        return;
      }
      res.json(usuario);
    } catch (error) {
      errors.e500(req, res, error);
    }
  },
  eliminarUsuario: async (req, res) => {
    try {
      let id = req.params.id;

      let usuario = await mUsuario.getOne(id);
      if (!usuario) {
        res.status(404).json({ err: true, message: "Usuario no encontrado" });
        return;
      }
      await mUsuario.delete(id);
      res.json({
        message: "Usuario eliminado con id " + id,
      });
    } catch (error) {
      errors.e500(req, res, error);
    }
  },
};

const validateUsuario = (nombre, apellido, email) => {
  if (!nombre || !email) {
    return { err: true, message: "Nombre y email requeridos" };
  }
  if (!email.includes("@") || !email.includes(".")) {
    return { err: true, message: "Formato de email invalido" };
  }
  if (nombre.match(/\d+/) || apellido.match(/\d+/)) {
    return { err: true, message: "Nombre y apellido no pueden tener numeros" };
  }
  return null;
};

export default cUsuario;
