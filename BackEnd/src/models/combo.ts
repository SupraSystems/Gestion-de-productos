import { Schema, model, Document} from 'mongoose';

const schema = new Schema({
    _id:String,
    nombre:String,
    descripcion: String,
    precio:Number,
    imagePath: String,
});

interface ICombo extends Document {
    _id:string;
    nombre:string,
    descripcion: string,
    precio:number,
    imagePath: string,
}

export default model<ICombo>('combo', schema);