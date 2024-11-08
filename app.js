import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import error from "./middleware/error.js";
import usuariosRoutes from "./routes/usuarios.js";
import swagger from "./routes/swagger.js";
import connectDb from "./config/db.js";

connectDb();

const app = express();
const port = 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", swagger);
app.use("/usuarios", usuariosRoutes);
app.use(error.e404);

app.listen(port, () => {
  console.log(`Aplicacion funcionando en http://localhost:${port}/usuarios`);
});
