import { Router } from "express";
import { getCargos } from "../database/cargosDB";


let cargosRoute = Router({});

cargosRoute.get("",async (req,res)=>{
    res.status(200).json(await getCargos());
})
cargosRoute.get("/:id",async (req,res)=>{
    res.status(200).json(await getCargos(req.params.id));
})


export default cargosRoute;