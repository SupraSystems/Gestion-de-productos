import { Schema, model, Document } from 'mongoose'
//models
const esquemaDetalle = new Schema({
    _idCombo: String,
    _idProducto: String,
});

export interface IDetalleCombo extends Document {
    _idCombo: String,
    _idProducto: String,
}
export default model<IDetalleCombo>('detalle_combo', esquemaDetalle);
