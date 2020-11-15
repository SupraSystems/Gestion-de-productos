import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'
// Models

import Descuento, { IDescuento } from '../models/descuento';

export async function getDescuentos(req: Request, res: Response): Promise<Response> {
    const descuentos = await Descuento.find();
    return res.json(descuentos);
};

export async function createDescuento(req: Request, res: Response): Promise<Response> {
    const { _id, fechaini, fechafin,porcentaje, cantidad } = req.body;
    const nuevoDescuento = { 
        _id,
        fechaini,
        fechafin,
        porcentaje, 
        cantidad 
    };
    const descuento = new Descuento(nuevoDescuento);
    await descuento.save();
    return res.json({
        message: 'Descuento creado',
        descuento
    });
};

export async function getDescuento(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;
    const descuento = await Descuento.findById(_id);
    return res.json(descuento);
}

export async function deleteDescuento(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;
    const descuento = await Descuento.findByIdAndRemove(_id) as IDescuento;
    return res.json({ message: 'Descuento Eliminado', descuento});
};

export async function updateDescuento(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;
    const { fechaini, fechafin, porcentaje, cantidad } = req.body;
    const DescuentoActualizado = await Descuento.findByIdAndUpdate(_id, {
        _id, 
        fechaini, 
        fechafin, 
        porcentaje, 
        cantidad
    });
    return res.json({
        message: 'Descuento Actualizado',
        DescuentoActualizado
    });
}

export async function getDescuentoCombo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const des = await Descuento.findById(id);
    const descuento = des!.coddescuento
    const desc = await Descuento.findById(descuento)
    return res.json(desc);
}

export async function getDesc(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await Descuento.find({idProducto:id});
    return res.json(detalle);
}

export async function getFoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await Descuento.findById(id);
    const foto= detalle!.imagePath;
    return res.send('<img src=http://localhost:4000/'+foto+'>');
}

export async function getCategoria(req: Request, res: Response): Promise<Response> {
    const { tipo } = req.params;
    const combos = await Descuento.find({tipo:tipo});
    return res.json(combos);
}
