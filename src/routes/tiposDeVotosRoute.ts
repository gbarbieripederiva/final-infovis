import { Router } from "express";
import { getTiposDeVotos, getTiposDeVotosCount } from "../database/tiposDeVotosDB";

let tipoDeVotoRoute = Router({});

tipoDeVotoRoute.get("/:id?", async (req, res) => {
    res.status(200).json(await getTiposDeVotos(req.params.id));
});

tipoDeVotoRoute.get("/votos/:id?", async(req, res) => {
    res.status(200).json(await getTiposDeVotosCount(req.params.id))
})

export default tipoDeVotoRoute;
