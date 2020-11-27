import { Schema, model, Document } from 'mongoose'
//models
const esquemaDetalle = new Schema({
    combo: String,
    producto: String
});

interface IDetalleCombo extends Document {
    combo: string,
    producto: string
}
export default model<IDetalleCombo>('detalle_combo', esquemaDetalle);
