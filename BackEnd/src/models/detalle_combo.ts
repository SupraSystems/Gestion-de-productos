import { Schema, model, Document} from 'mongoose';


const schema = new Schema({
    _id:String,
    idCombo:String,
    idProducto:String
});

interface IDetalle_Combo extends Document {
    _id:string,
    idCombo:string,
    idproducto:string
}

export default model<IDetalle_Combo>('detalle_combo', schema);