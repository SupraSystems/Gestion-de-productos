
import { Schema, model, Document} from 'mongoose';


const schema = new Schema({
    //_id:String,
    nombre:String,
    descripcion: String,
    tipo:String,
    precio:Number,
    cantidad:Number,
    fechavencimiento:String,
    imagePath: String,
    coddescuento:String
});

interface IProducto extends Document {
    //_id:string;
    nombre:string,
    descripcion: string,
    tipo:string,
    precio:number,
    cantidad:number,
    fechavencimiento:string,
    imagePath: string,
    coddescuento:string
}

export default model<IProducto>('producto', schema);