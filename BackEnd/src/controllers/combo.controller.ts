import { json, Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import Combo from '../models/combo';
import Detalle_Combo from '../models/detalle_combo'
import Producto from '../models/producto'

export async function getCombos(req: Request, res: Response): Promise<Response> {
    const combo = await Combo.find();
    return res.json(combo);
}

export async function createCombo(req: Request, res: Response): Promise<Response> {
    const {nombre,descripcion,precio,fechaconclusion} = req.body;
    const newCombo = {
        nombre:nombre,
        descripcion:descripcion,
        precio:precio,
        fechaconclusion:fechaconclusion,
        imagePath:req.file.path
    };
    const combo = new Combo(newCombo);
    await combo.save();
    return res.json({
        message: 'Combo guardado exitosamente',
        combo
    })
}

export async function getCombo(req: Request, res: Response): Promise<Response> {
    var i=0;
    var product;
    const { id } = req.params;
    const com = await Combo.findById(id);
    const detalle = await Detalle_Combo.find({combo:id},{producto:1,_id:0});
    switch(detalle.length){
        case 1: {
            const id1 = detalle[0].producto;
            product = await Producto.find({_id:id1});
            break;
        }
        case 2: {
            const id1 = detalle[0].producto;
            const id2 = detalle[1].producto;
            product = await Producto.find({$or:[{_id:id1},{_id:id2}]});
            break;
        }
        case 3: {
            const id1 = detalle[0].producto;
            const id2 = detalle[1].producto;
            const id3 = detalle[2].producto;
            product = await Producto.find({$or:[{_id:id1},{_id:id2},{_id:id3}]});
            break;
        }
        case 4: {
            const id1 = detalle[0].producto;
            const id2 = detalle[1].producto;
            const id3 = detalle[2].producto;
            const id4 = detalle[3].producto;
            product = await Producto.find({$or:[{_id:id1},{_id:id2},{_id:id3},{_id:id4}]});
            break;
        }
        case 5: {
            const id1 = detalle[0].producto;
            const id2 = detalle[1].producto;
            const id3 = detalle[2].producto;
            const id4 = detalle[3].producto;
            const id5 = detalle[4].producto;
            product = await Producto.find({$or:[{_id:id1},{_id:id2},{_id:id3},{_id:id4},{_id:id5}]});
            break;
        }
        

    }
    return res.json({com,product});
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
    const { nombre, descripcion, precio} = req.body;
    const updatedCombo = await Combo.findByIdAndUpdate(id, {
        nombre,
        descripcion,
        precio,
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
