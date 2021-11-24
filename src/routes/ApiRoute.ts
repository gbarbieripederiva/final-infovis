import { Router } from "express";
import CargosRoute from "./cargosRoute";
const apiRoute = Router();

apiRoute.use("/cargos",CargosRoute);

export default apiRoute;