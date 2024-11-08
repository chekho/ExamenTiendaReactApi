import mongoose from "mongoose";

const connectBd = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/chekho");
    console.log("conexion a la base de datos exitosa");
  } catch (error) {
    console.log("error de conexion a la base de datos", error);
    process.exit(1);
  }

}

export default connectBd;