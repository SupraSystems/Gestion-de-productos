import { Request, Response } from 'express'
import Descuento, { IDescuento } from '../models/descuento';

export async function getDescuentos(req: Request, res: Response): Promise<Response> {
    const descuentos = await Descuento.find();
    return res.json(descuentos);
};

export async function createDescuento(req: Request, res: Response): Promise<Response> {
    const { _id, fechaini, fechafin,porcentaje, cantidad } = req.body;
    const nuevoDescuento = { _id, fechaini, fechafin,porcentaje, cantidad };
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
        _id, fechaini, fechafin, porcentaje, cantidad
    });
    return res.json({
        message: 'Descuento Actualizado',
        DescuentoActualizado
    });
}