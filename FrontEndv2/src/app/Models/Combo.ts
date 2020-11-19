import { Producto } from './Producto';

export class Combo {
    descripcion:string;
    nombre:string;
    tipo:string;
    precio:number;
    cantidad:number;
    foto:string;
    _id:string;
    imagePath: string;
    fechavencimiento:string;
    file:File;
    listaProductos:Producto[];

    constructor(descripcion:string,tipo:string,precio:number,cantidad:number,foto:string,_id:string,imagePath: string,nombre:string,listaProductos:Producto[], fecha?:string, file?:File){
        this.descripcion=descripcion;
        this.tipo=tipo;
        this.precio=precio;
        this.cantidad=cantidad;
        this.foto=foto;
        this._id=_id;
        this.foto=foto;
        this.imagePath=imagePath;
        this.nombre=nombre;
        this.fechavencimiento=fecha;
        this.file=file;
        this.listaProductos=listaProductos;
    }
    public getListaProducto(){
        return this.listaProductos;
    }
    public setListaProducto(listaProducto:Producto[]):void {
        this.listaProductos=listaProducto;
    }
    public getFecha(){
        return this.fechavencimiento;
    }
    public getPrecio(): number {
        return this.precio;
    }
    public getCantidad(): number {
        return this.cantidad;
    }
    public getImagePath(): string {
        return this.imagePath;
    }
    public getDescripcion(): string {
        return this.descripcion;
    }
    public getTipo(): string {
        return this.tipo;
    }
    public getId(): string {
        return this._id;
    }
    public getFoto(): string {
        return this.foto;
    }
    public getNombre(): string{
        return this.nombre;
    }
    public getFile(): File{
        return this.file;
    }
}