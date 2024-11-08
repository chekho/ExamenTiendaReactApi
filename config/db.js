import mongoose from "mongoose";

const connectBd = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://19002051:MlhCzc04dq0jQ1tR@cluster0.66bi5.mongodb.net/menaproyect"
    );
    console.log("conexion a la base de datos exitosa");
  } catch (error) {
    console.log("error de conexion a la base de datos", error);
    process.exit(1);
  }
};

export default connectBd;
