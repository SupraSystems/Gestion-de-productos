import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import Combo from '../models/combo';
import Detalle_Combo from '../models/detalle_combo'

export async function getCombos(req: Request, res: Response): Promise<Response> {
    const combo = await Combo.find();
    return res.json(combo);
}

export async function createCombo(req: Request, res: Response): Promise<Response> {
    const {_id,nombre,descripcion,precio} = req.body;
    const newCombo = {
        _id:_id,
        nombre:nombre,
        descripcion:descripcion,
        precio:precio,
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
    const combo = await Combo.findById(id);
    return res.json(combo);
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

export async function getPooductosDeCombo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const combo = await Combo.find(id);
    const productos = await Detalle_Combo.findById(combo)
    return res.json(productos);
};
