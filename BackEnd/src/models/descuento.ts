import { Schema, model, Document} from 'mongoose';


const schema = new Schema({
    _id:String,
    fechainicio: Date,
    fechafin:Date,
    porcentaje:Number,
    cantidadDeProductos:Number
});

interface IDescuento extends Document {
    _id:string;
    fechainicio:Date,
    fehcafin:Date,
    porcentaje:number,
    cantidadDeProductos:number
}

export default model<IDescuento>('descuento', schema);