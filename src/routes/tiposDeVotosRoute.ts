import { Router } from "express";
import { getTiposDeVotos } from "../database/tiposDeVotos";

let tipoDeVotoRoute = Router({});

tipoDeVotoRoute.get("/:id?", async (req, res) => {
    res.status(200).json(await getTiposDeVotos(req.params.id));
});

export default tipoDeVotoRoute;
