export interface IntPedidos {
    status:  boolean;
    message: string;
    data:    Pedido[];
}


export interface IGroupPedidos {
    expanded?: boolean;
    nombreUsuario: string;
    nombreCliente: string;
    pedidos: Pedido[];
  }


export interface Pedido {
    id:             number;
    cliente_id:     number;
    fecha:          Date;
    usuario_id:     number;
    estado:         number;
    usuario:        Usuario;
    cliente:        Cliente;
    detalle_pedido: DetallePedido[];
    detailExpanded?: boolean;
}

export interface Cliente {
    id:             number;
    identificacion: string;
    nombre:         string;
    telefono:       string;
    correo:         string;
    direccion:      string;
    pais:           string;
    ciudad:         string;
}

export interface DetallePedido {
    id:          number;
    producto_id: number;
    pedido_id:   number;
    cantidad:    number;
    precio:      string;
    producto:    Producto;
}

export interface Producto {
    id:     number;
    codigo: string;
    nombre: string;
    stock:  number;
    precio: string;
    activo: number;
    imagen: null | string;
}

export interface Usuario {
    id:       number;
    usuario:  string;
    clave:    string;
    nombre:   string;
    telefono: string;
    correo:   string;
    activo:   number;
}
