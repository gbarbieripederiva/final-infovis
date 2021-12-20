import { Router } from "express";
import { getVotos } from "../database/votosDB";

let votosRoute = Router({});

votosRoute.get("/", async (req, res) => {
    res.status(200).json(await getVotos());
});

export default votosRoute;
