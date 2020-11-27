import { json, Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'
import Combo from '../models/combo';
import Detalle_Combo from '../models/detalle_combo'
import Producto from '../models/producto'

export async function getCombos(req: Request, res: Response): Promise<Response> {
    const combo = await Combo.find();
    return res.json(combo);
}

export async function createCombo(req: Request, res: Response): Promise<Response> {
    const {nombre,descripcion,precio,fechaconclusion,productos} = req.body;
    const newCombo = {
        nombre:nombre,
        descripcion:descripcion,
        precio:precio,
        fechaconclusion:fechaconclusion,
        productos:productos,
        imagePath:req.file.path
    };
    const combo = new Combo(newCombo);
    const combos = await Combo.find({nombre:combo.nombre});
    const longitud = combos.length;
    console.log(combos.length);
    if(longitud==0){
        await combo.save();
        return res.json({
            message: 'Combo guardado exitosamente',
            combo
        })
    }else{
        return res.json({message: 'Ya existe el combo'});
  
    }
}

export async function getCombo(req: Request, res: Response): Promise<Response> {
    
    const { id } = req.params;
    const com = await Combo.findById(id);
        return res.json({com});

    }
    

export async function deleteCombo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const combo = await Combo.findByIdAndRemove(id);
    if (combo) {
        await fs.unlink(path.resolve(combo.imagePath));
    }
    return res.json({ message: 'Combo Eliminado' });
}

export async function updateCombo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nombre, descripcion, precio,productos} = req.body;
    const updatedCombo = await Combo.findByIdAndUpdate(id, {
        nombre,
        descripcion,
        precio,
        productos
    });
    return res.json({
        message: 'Combo actualizado exitosamente',
        updatedCombo
    });
}

export async function getProductosDeCombo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const combo = await Combo.find(id);
    const productos = await Detalle_Combo.find({idCombo:combo});
    return res.json(productos);
};
