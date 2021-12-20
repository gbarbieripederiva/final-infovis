import { Router } from "express";
import {
    getAgrupacionesFromProvincia,
    getProvincias,
    getCargosFromProvincia,
    getTiposDeVotosCount,
    getSeccionesFromProvincias,
    getVotosFromAgrupacionByProvinciaAndCargo
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

provinciaRoute.get(
    "/:idProvincia/secciones/:idSecciones?",
   async (req, res) => {
       res.status(200).json(await getSeccionesFromProvincias(
           req.params.idProvincia,
           req.params.idSecciones
       ))
   }
)

provinciaRoute.get(
    "/:idProvincia/cargo/:idCargo/agrupacion/:idAgrupacion?",
   async (req, res) => {
       res.status(200).json(await getVotosFromAgrupacionByProvinciaAndCargo(
           req.params.idProvincia,
           req.params.idCargo,
           req.params.idAgrupacion
       ))
   }
)

export default provinciaRoute;
