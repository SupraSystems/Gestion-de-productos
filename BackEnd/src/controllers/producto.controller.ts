import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'
// Models
import Producto from '../models/producto';
import Descuento from '../models/descuento'
import Detalle_Combo from '../models/detalle_combo'

export async function getProductos(req: Request, res: Response): Promise<Response> {
    const producto = await Producto.find();
    return res.json(producto);
}

export async function createProducto(req: Request, res: Response): Promise<Response> {
    const {nombre,descripcion,tipo,precio,cantidad,fechavencimiento,coddescuento,porcentajedescuento} = req.body;
    const newPreoducto = {
        nombre:nombre,
        descripcion:descripcion,
        tipo:tipo,
        precio:precio,
        cantidad:cantidad,
        fechavencimiento:fechavencimiento,
        coddescuento:coddescuento,
        porcentajedescuento:porcentajedescuento,
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
    return res.json({ message: 'Producto Eliminado',
    producto
});
}

export async function updateProducto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nombre, descripcion,tipo, precio,cantidad,fechavencimiento,coddescuento, porcentajedescuento} = req.body;
    const updatedProducto = await Producto.findByIdAndUpdate(id, { $set: {
            nombre,
            descripcion,
            tipo,
            precio,
            cantidad,
            fechavencimiento,
            coddescuento,
            porcentajedescuento
        }
    },{new: true});
    return res.json({
        message: 'Producto actualizado exitosamente',
        updatedProducto
    });
}

export async function updateDescuento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { porcentajedescuento} = req.body;
    const updatedDescuento = await Producto.findByIdAndUpdate(id, { $set: {
        porcentajedescuento
    }
    },{new: true});
    return res.json({
        message: 'Descuento actualizado exitosamente',
        updatedDescuento
    });
}

export async function getDescuentoProducto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    const descuento = producto!.coddescuento
    const desc = await Descuento.findById(descuento)
    return res.json(desc);
}
export async function getComboDeProducto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await Detalle_Combo.find({idProducto:id});
    return res.json(detalle);
}
export async function getFoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await Producto.findById(id);
    const foto= detalle!.imagePath;
    return res.send('<img src=http://localhost:4000/'+foto+'>');
}
export async function getCategoria(req: Request, res: Response): Promise<Response> {
    const { tipo } = req.params;
    const productos = await Producto.find({tipo:tipo});
    return res.json(productos);
}