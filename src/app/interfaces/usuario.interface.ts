export interface IUsuarios {
    mensaje:  string;
    cantidad: number;
    data:     Usuario[];
}

export interface Usuario {
    id?:       number;
    usuario:  string;
    clave?:    string;
    nombre:   string;
    telefono: string;
    correo:   string;
    activo:   number;
}
