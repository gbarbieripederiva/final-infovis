import { Router } from "express";
import { getVotos } from "../database/votosDB";

let votosRoute = Router({});

votosRoute.get("/:id?", async (req, res) => {
    res.status(200).json(await getVotos(req.params.id));
});

export default votosRoute;
