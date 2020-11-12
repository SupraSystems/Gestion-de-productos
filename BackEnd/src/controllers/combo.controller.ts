import { json, Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import Combo from '../models/combo';
import Detalle_Combo from '../models/detalle_combo'
import Descuento from '../models/descuento'
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
    await combo.save();
    return res.json({
        message: 'Combo guardado exitosamente',
        combo
    })
}

export async function getCombo(req: Request, res: Response): Promise<Response> {
    
    const { id } = req.params;
    const com = await Combo.findById(id);
        return res.json(com);

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

export async function getDescuentoCombo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const combo = await Combo.findById(id);
    const descuento = combo!.coddescuento
    const desc = await Descuento.findById(descuento)
    return res.json(desc);
}

export async function getComboDeProducto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await Detalle_Combo.find({idProducto:id});
    return res.json(detalle);
}

export async function getFoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await Combo.findById(id);
    const foto= detalle!.imagePath;
    return res.send('<img src=http://localhost:4000/'+foto+'>');
}

export async function getCategoria(req: Request, res: Response): Promise<Response> {
    const { tipo } = req.params;
    const combos = await Combo.find({tipo:tipo});
    return res.json(combos);
}
