
import { Schema, model, Document} from 'mongoose';


const schema = new Schema({
    _id:String,
    nombre:String,
    descripcion: String,
    precio:Number,
    tamanio:Number,
    fechavencimiento:Date,
    imagePath: String,
    coddescuento:String
});

interface IProducto extends Document {
    _id:string;
    nombre:string,
    descripcion: string,
    precio:number,
    tamanio:number,
    fechavencimiento:Date,
    imagePath: string,
    coddescuento:string
}

export default model<IProducto>('producto', schema);