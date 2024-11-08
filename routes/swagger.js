import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";
const router = express.Router();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API RESTful de Gestión de Usuarios",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 

export default router;
