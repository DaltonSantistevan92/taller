export interface IProductos {
    mensaje:  string;
    cantidad: number;
    data:     Producto[];
}

export interface Producto {
    id:             number;
    codigo:         string;
    nombre:         string;
    stock:          number;
    precio:         number;
    activo:         number;
    imagen:         string;
}

// por by id producto 
export interface IProductoById {
    mensaje:  string;
    cantidad: number;
    data:     Producto;
}