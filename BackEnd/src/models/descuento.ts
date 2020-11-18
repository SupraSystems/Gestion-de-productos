import { Schema, model, Document } from 'mongoose'

const esquemaDescuento = new Schema({
    _id: String,
    fechaini: String,
    fechafin: String,
    porcentaje: Number,
    cantidad: Number
});

export interface IDescuento extends Document {
    _id: string;
    fechaini: string;
    fechafin: string;
    porcentaje: number;
    cantidad: number;
}
export default model<IDescuento>('descuento', esquemaDescuento);
