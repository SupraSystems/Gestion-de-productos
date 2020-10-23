export class Producto {
    nombre:string;
    descripcion:string;
    tamanio:number;
    cantidad:number;
    foto:string;
    precio:number;
    tipo:string;
    constructor(nombre:string,cantidad:number,descripcion:string,foto:string,precio:number,tamanio:number,tipo:string){
        this.nombre=nombre;
        this.cantidad=cantidad;
        this.descripcion=descripcion;
        this.precio=precio;
        this.tamanio=tamanio;
        this.foto=foto;
        this.tipo=tipo;
    }
    public getPrecio(): number {
        return this.precio;
    }
    public getCantidad(): number {
        return this.cantidad;
    }
    public getFoto(): string {
        return this.foto;
    }
    public getNombre(): string {
        return this.nombre;
    }
    public getDescripcion(): string {
        return this.descripcion;
    }
    public getTipo(): string {
        return this.tipo;
    }
}