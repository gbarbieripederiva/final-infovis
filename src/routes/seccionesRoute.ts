import { Router } from "express";
import { getSecciones } from "../database/seccionesDB";


let seccionesRoute = Router({});

seccionesRoute.get("/:id?",async (req,res)=>{
    res.status(200).json(await getSecciones(req.params.id));
})

export default seccionesRoute;