import { connect } from 'mongoose'

export async function startConnection() {
const db = await connect('mongodb+srv://yurguen:yurguenpariente@cluster0.c7nk9.mongodb.net/Almacen?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log('Database is connected');
}
