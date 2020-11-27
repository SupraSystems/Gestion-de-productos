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
    const {nombre,descripcion,tipo,precio,cantidad,fechavencimiento,coddescuento} = req.body;
    const newPreoducto = {
        nombre:nombre,
        descripcion:descripcion,
        tipo:tipo,
        precio:precio,
        cantidad:cantidad,
        fechavencimiento:fechavencimiento,
        coddescuento:coddescuento,
        imagePath:req.file.path
    };
    const producto = new Producto(newPreoducto);
    const productos = await Producto.find({nombre:producto.nombre});
    const longitud = productos.length;
    console.log(productos.length);
    if(longitud==0){
        await producto.save();
        return res.json({
            message: 'Producto guardado exitosamente',
            producto
        })
    }else{
        return res.json({message: 'Ya existe el producto'});
  
    }
    
}
export async function getPorNombre(req: Request,res: Response): Promise<Response> {
    const {nombre} = req.params;
    const producto = await Producto.find({nombre:nombre});
    return res.json(producto);
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
    const { nombre, descripcion,tipo, precio,cantidad,fechavencimiento,coddescuento} = req.body;
    const updatedProducto = await Producto.findByIdAndUpdate(id, {
        nombre,
        descripcion,
        tipo,
        precio,
        cantidad,
        fechavencimiento,
        coddescuento
    },{new: true});
    return res.json({
        message: 'Producto actualizado exitosamente',
        updatedProducto
    });
}

export async function getComboDeProducto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const detalle = await Detalle_Combo.find({idProducto:id});
    return res.json(detalle);
}

export async function getDescuentoProducto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    const descuento = producto!.coddescuento
    const desc = await Descuento.findById(descuento)
    return res.json(desc);
}

export async function getCategoria(req: Request, res: Response): Promise<Response> {
    const { tipo } = req.params;
    const productos = await Producto.find({tipo:tipo});
    return res.json(productos);
}
export async function busquedaProducto(req: Request, res: Response): Promise<Response> {
    const { nombre } = req.params;
    const productos = await Producto.find({nombre:nombre});
    return res.json(productos);
}