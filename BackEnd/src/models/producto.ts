import { Schema, model, Document} from 'mongoose';

const schema = new Schema({
    nombre:String,
    descripcion: String,
    tipo:String,
    precio:Number,
    cantidad:Number,
    fechavencimiento:String,
    coddescuento:String,
    imagePath: String,
});

interface IProducto extends Document {
    nombre:string,
    descripcion: string,
    tipo:string,
    precio:number,
    cantidad:number,
    fechavencimiento:string,
    coddescuento:string,
    imagePath: string,
}

export default model<IProducto>('producto', schema);