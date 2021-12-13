import { Router } from "express";
import { getAgrupaciones } from "../database/agrupaciones";

let agrupacionRoute = Router({});

agrupacionRoute.get("/:id?", async (req, res) => {
    res.status(200).json(await getAgrupaciones(req.params.id));
});

export default agrupacionRoute;
