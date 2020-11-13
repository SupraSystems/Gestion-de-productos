import { connect } from 'mongoose'

export async function startConnection() {
const db = await connect('mongodb+srv://suprasystems:ingenieriadesoftware@cluster0.gypxi.mongodb.net/Almacen?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log('Database is connected');
}
