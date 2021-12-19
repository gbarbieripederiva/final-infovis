import { Router } from "express";
import CargosRoute from "./cargosRoute";
import ProvinciasRoute from "./provinciasRoute";
import AgrupacionesRoute from "./agrupacionesRoute";
import TiposDeVotosRoute from "./tiposDeVotosRoute";
import SeccionesRoute from "./seccionesRoute";
import VotosRoute from "./votosRoute";
const apiRoute = Router();

apiRoute.use("/cargos",CargosRoute);
apiRoute.use("/provincias",ProvinciasRoute);
apiRoute.use("/agrupaciones",AgrupacionesRoute);
apiRoute.use("/tiposDeVotos",TiposDeVotosRoute);
apiRoute.use("/secciones", SeccionesRoute);
apiRoute.use("/votos", VotosRoute);

export default apiRoute;