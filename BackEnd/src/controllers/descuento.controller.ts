import { Request, Response } from 'express'

import Descuento, { IDescuento } from '../models/descuento';

export async function getDescuentos(req: Request, res: Response): Promise<Response> {
    const descuentos = await Descuento.find();
    return res.json(descuentos);
};

export async function createDescuento(req: Request, res: Response): Promise<Response> {
    const { idDescuento, fechaini, fechafin,porcentaje, cantidad } = req.body;
    const nuevoDescuento = { idDescuento, fechaini, fechafin,porcentaje, cantidad };
    const descuento = new Descuento(nuevoDescuento);
    await descuento.save();
    return res.json({
        message: 'Descuento creado',
        descuento
    });
};

export async function getDescuento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const descuento = await Descuento.findById(id);
    return res.json(descuento);
}

export async function deleteDescuento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const descuento = await Descuento.findByIdAndRemove(id) as IDescuento;
    return res.json({ message: 'Descuento Eliminado', descuento});
};

export async function updateDescuento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { idDescuento, fechaini, fechafin, porcentaje, cantidad } = req.body;
    const DescuentoActualizado = await Descuento.findByIdAndUpdate(id, {
        idDescuento, fechaini, fechafin, porcentaje, cantidad
    });
    return res.json({
        message: 'Descuento Actualizado',
        DescuentoActualizado
    });
}