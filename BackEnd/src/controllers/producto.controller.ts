import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import Producto from '../models/producto';

export async function getProductos(req: Request, res: Response): Promise<Response> {
    const producto = await Producto.find();
    return res.json(producto);
};

export async function createProducto(req: Request, res: Response): Promise<Response> {
    const {_id,nombre,descripcion,precio,tamanio,fechavencimiento,coddescuento} = req.body;
    const newPreoducto = {
        _id:_id,
        nombre:nombre,
        descripcion:descripcion,
        precio:precio,
        tamanio:tamanio,
        fechavencimiento:fechavencimiento,
        coddescuento:coddescuento,
        imagePath:req.file.path
    };
    const producto = new Producto(newPreoducto);
    await producto.save();
    return res.json({
        message: 'Producto guardado exitosamente',
        producto
    })
}

export async function getProducto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    return res.json(producto);
}

export async function deleteProducto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const producto = await Producto.findByIdAndRemove(id);
    if (producto) {
        await fs.unlink(path.resolve(producto.imagePath));
    }
    return res.json({ message: 'Producto Eliminado' });
};

export async function updateProducto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nombre, descripcion, precio,tamanio,fechavencimiento,coddescuento} = req.body;
    const updatedProducto = await Producto.findByIdAndUpdate(id, {
        nombre,
        descripcion,
        precio,
        tamanio,
        fechavencimiento,
        coddescuento
    });
    return res.json({
        message: 'Producto actualizado exitosamente',
        updatedProducto
    });
}