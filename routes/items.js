import express from "express";
import cItems from "../controllers/cItems.js";

const routes = express.Router();

routes.get("/items", cItems.getItems);
routes.get("/items/:id", cItems.getItem);
routes.get("/sales", cItems.getSales);
routes.post("/addSale", cItems.addSale);

export default routes;
