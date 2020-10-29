import { Request, Response } from 'express'


import Descuento from '../models/descuento';

export async function getDescuentos(req: Request, res: Response): Promise<Response> {
    const descuento = await Descuento.find();
    return res.json(descuento);
};

export async function createDescuento(req: Request, res: Response): Promise<Response> {
    const {_id,fechainicio,fechafin,porcentaje,cantidadDeProductos} = req.body;
    const newDescuento = {
        _id:_id,
        fechainicio:fechainicio,
        fechafin:fechafin,
        porcentaje:porcentaje,
        cantidadDeProductos:cantidadDeProductos
    };
    const descuento = new Descuento(newDescuento);
    await descuento.save();
    return res.json({
        message: 'Descuento guardado exitosamente',
        descuento
    })
}

export async function getDescuento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const descuento = await Descuento.findById(id);
    return res.json(descuento);
}

export async function deleteDescuento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const descuento = await Descuento.findByIdAndRemove(id);
    return res.json({ message: 'Descuento Eliminado',
                    descuento
    });
}

export async function updateDescuento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { _id,fechainicio,fechafin,porcentaje,cantidadDeProductos} = req.body;
    const updatedDescuento = await Descuento.findByIdAndUpdate(id, {
        _id,
        fechainicio,
        fechafin,
        porcentaje,
        cantidadDeProductos
    });
    return res.json({
        message: 'Descuento actualizado exitosamente',
        updatedDescuento
    });
}