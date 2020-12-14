import { Request, Response } from 'express'

import Detalle from '../models/detalle_combo';

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
        _idCombo, _idDescuento
    });
    return res.json({
        message: 'Detalle Actualizado',
        DetalleActualizado
    });
}