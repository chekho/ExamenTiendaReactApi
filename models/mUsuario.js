
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Usuario = mongoose.model("Usuario", userSchema);

const mUsuario = {
  getAll: async () => {
    try {
      const results = await Usuario.find();
      return results;
    } catch (err) {
      throw { status: 500, message: "Error al obtener usuarios" };
    }
  },
  getOne: async (id) => {
    try {
      const results = await Usuario.findById(id);
      return results;
    } catch (err) {
      throw {
        status: 500,
        message: "Error al obtener el usuario con id " + id,
      };
    }
  },
  create: async (usuario) => {
    try {
      const newUser = new Usuario(usuario);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw { status: 500, message: "Error al crear usuario" };
    }
  },
  update: async (usuario) => {
    try {
      await Usuario.findByIdAndUpdate(usuario.id, usuario);
    } catch (error) {
      throw { status: 500, message: "Error al actualizar usuario" };
    }
  },
  delete: async (id) => {
    try {
      await Usuario.findByIdAndDelete(id);
    } catch (error) {
      throw { status: 500, message: "Error al eliminar usuario con id " + id };
    }
  },
};

export default mUsuario;
