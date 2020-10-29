import { Request, Response } from 'express'

import Detalle_combo from '../models/detalle_combo';

export async function getDetalles(req: Request, res: Response): Promise<Response> {
    const detalle_combo = await Detalle_combo.find();
    return res.json(detalle_combo);
};

export async function createDetalle(req: Request, res: Response): Promise<Response> {
    const {idCombo,idProducto} = req.body;
    const newDetalle = {
        idCombo,
        idProducto
        
    };
    const detalle = new Detalle_combo(newDetalle);
    await detalle.save();
    return res.json({
        message: 'Detalle del combo guardado exitosamente',
        detalle
    })
}

export async function getDetalle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await Detalle_combo.findById(id);
    return res.json(detalle);
}

export async function deleteDetalle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await Detalle_combo.findByIdAndRemove(id);

    return res.json({ message: 'Detalle del combo Eliminado',
                        detalle
    });
}

export async function updateDetalle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { idCombo,idProducto} = req.body;
    const updatedDetalle = await Detalle_combo.findByIdAndUpdate(id, {
        idCombo,
        idProducto,
    });
    return res.json({
        message: 'Detalle del combo actualizado exitosamente',
        updatedDetalle
    });
}