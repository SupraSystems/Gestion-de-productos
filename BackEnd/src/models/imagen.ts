import { Schema, model, Document } from 'mongoose'

//models
const esquemaImagen = new Schema({
    //_id: String,
    imagePath: String

});

export interface IImagen extends Document {
    _id: string;
    imagePath: string;

}
export default model<IImagen>('imagen', esquemaImagen);
