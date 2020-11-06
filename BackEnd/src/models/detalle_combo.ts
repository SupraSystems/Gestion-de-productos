import { Schema, model, Document } from 'mongoose'
//models
const esquemaDetalle = new Schema({
    idCombo: String,
    idProducto: String
});

interface IDetalleCombo extends Document {
    idCombo: string,
    idProducto: string
}
export default model<IDetalleCombo>('detalle_combo', esquemaDetalle);
