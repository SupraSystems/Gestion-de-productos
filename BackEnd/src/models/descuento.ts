import { Schema, model, Document } from 'mongoose'
//models
const esquemaDescuento = new Schema({
    _idDescuento: String,
    fechaini: String,
    fechafin: String,
    porcentaje: Number,
    cantidad: Number

});

export interface IDescuento extends Document {
    _idDescuento: string;
    fechaini: string;
    fechafin: string;
    porcentaje: number;
    cantidad: number;
}
export default model<IDescuento>('Descuento', esquemaDescuento);
