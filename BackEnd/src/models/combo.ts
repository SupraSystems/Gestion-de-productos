import { Schema, model, Document} from 'mongoose';


const schema = new Schema({
    nombre:String,
    descripcion: String,
    precio:Number,
    fechaconclusion:String,
    productos:[String],
    imagePath: String
});

interface ICombo extends Document {
    nombre:string,
    descripcion: string,
    precio:number,
    fechaconclusion:string,
    productos:[string],
    imagePath: string,
}

export default model<ICombo>('combo', schema);