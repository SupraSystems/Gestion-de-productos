import { Request, Response } from 'express'

import detalleCombo, { IDetalleCombo } from '../models/detalle_combo';

export async function getDetalles(req: Request, res: Response): Promise<Response> {
    const detalles = await detalleCombo.find();
    return res.json(detalles);
};

export async function createDetalle(req: Request, res: Response): Promise<Response> {
    const { _idCombo, _idDescuento } = req.body;
    const nuevoDetalle = { _idCombo, _idDescuento };
    const detalle = new detalleCombo(nuevoDetalle);
    await detalle.save();
    return res.json({
        message: 'Descuento creado',
        detalle
    });
};

export async function getDetalle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await detalleCombo.findById(id);
    return res.json(detalle);
}

export async function deleteDetalle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await detalleCombo.findByIdAndRemove(id) as IDetalleCombo;
    return res.json({ message: 'Detalle eliminado' ,
        detalle});
};

export async function updateDetalle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { _idCombo, _idDescuento } = req.body;
    const DetalleActualizado = await detalleCombo.findByIdAndUpdate(id, {
        _idCombo, _idDescuento
    });
    return res.json({
        message: 'Detalle Actualizado',
        DetalleActualizado
    });
}