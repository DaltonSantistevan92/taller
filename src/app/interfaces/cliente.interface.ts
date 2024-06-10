export interface ICliente {
    mensaje:  string;
    cantidad: number;
    data:     Cliente[];
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

// por by id cliente 
export interface IClienteById {
    mensaje:  string;
    cantidad: number;
    data:     Cliente;
}


