import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'
// Models

import Detalle from '../models/detalle_combo';
import Descuento from '../models/descuento';

export async function getDetalles(req: Request, res: Response): Promise<Response> {
    const detalles = await Detalle.find();
    return res.json(detalles);
};

export async function createDetalle(req: Request, res: Response): Promise<Response> {
    const { combo, producto } = req.body;
    const nuevoDetalle = { 
        combo:combo, 
        producto:producto 
    };
    const detalle = new Detalle(nuevoDetalle);
    await detalle.save();
    return res.json({
        message: 'Detalle creado',
        detalle
    });
};

export async function getDetalle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await Detalle.findById(id);
    return res.json(detalle);
}

export async function deleteDetalle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await Detalle.findByIdAndRemove(id);
    return res.json({ message: 'Detalle eliminado' ,
        detalle});
};

export async function updateDetalle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { _idCombo, _idDescuento } = req.body;
    const DetalleActualizado = await Detalle.findByIdAndUpdate(id, {
        _idCombo,
        _idDescuento
    });
    return res.json({
        message: 'Detalle Actualizado',
        DetalleActualizado
    });
}


export async function getDescuentoCombo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const des = await Detalle.findById(id);
    const detalle = des!.coddescuento
    const desc = await Detalle.findById(detalle)
    return res.json(desc);
}

export async function getDesc(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await Detalle.find({idProducto:id});
    return res.json(detalle);
}

export async function getFoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await Detalle.findById(id);
    const foto= detalle!.imagePath;
    return res.send('<img src=http://localhost:4000/'+foto+'>');
}

export async function getCategoria(req: Request, res: Response): Promise<Response> {
    const { tipo } = req.params;
    const combos = await Detalle.find({tipo:tipo});
    return res.json(combos);
}
