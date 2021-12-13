import { Router } from "express";
import {
    getAgrupacionesFromProvincia,
    getProvincias,
} from "../database/provinciasDB";

let provinciaRoute = Router({});

provinciaRoute.get("/:id?", async (req, res) => {
    res.status(200).json(await getProvincias(req.params.id));
});
provinciaRoute.get(
    "/:idProvincia/agrupaciones/:idAgrupacion?",
    async (req, res) => {
        res.status(200).json(
            await getAgrupacionesFromProvincia(
                req.params.idProvincia,
                req.params.idAgrupacion
            )
        );
    }
);

export default provinciaRoute;
