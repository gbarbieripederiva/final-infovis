import { Router } from "express";
import {
    getAgrupacionesFromProvincia,
    getProvincias,
    getCargosFromProvincia,
    getTiposDeVotosCount
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
provinciaRoute.get(
    "/:idProvincia/cargos/:idCargos?",
   async (req, res) => {
       res.status(200).json(await getCargosFromProvincia(
           req.params.idProvincia,
           req.params.idCargos
       ))
       
   }
)

provinciaRoute.get(
    "/:idProvincia/tipovoto/:idTipoVoto?",
   async (req, res) => {
       res.status(200).json(await getTiposDeVotosCount(
           req.params.idProvincia,
           req.params.idTipoVoto
       ))
   }
)

export default provinciaRoute;
