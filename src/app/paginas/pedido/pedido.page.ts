import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Producto } from 'src/app/interfaces/productoI.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { GeneralService } from 'src/app/servicios/general.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { PedidosService } from '../../servicios/pedidos.service';
import { Router } from '@angular/router';

// Define la interfaz para el objeto del pedido
interface Pedido {
  cliente_id: number;
  usuario_id: number;
  producto_id: number;
  cantidad: number;
  stock: number;
  precio : number;
  pedidos_detalle: DetallePedido[];
}

// Define la interfaz para el detalle de cada pedido
interface DetallePedido {
  producto_id: number | null;
  cantidad: number | null;
  precio: number | null;
}

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  listasUsuarios: Usuario[] = [];
  listasClientes: Cliente[] = [];
  listasProductos: Producto[] = [];

  isCantidadExcedeStock = false;

  objectPedido : Pedido = {
    cliente_id : 0,
    usuario_id : 0,
    producto_id : 0,
    cantidad : 0,
    stock : 0,
    precio : 0,
    pedidos_detalle : []
  };

  constructor(
    private servC: ClientesService,
    private servUs: UsuariosService,
    private servPro: ProductosService,
    public ServG: GeneralService,
    private loading: LoadingController,
    private pedidosService : PedidosService,
    private router :Router
    // private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarClientes();
    this.cargarProductos();
  }

  cargarUsuarios() {
    this.servUs.getUsuarios().subscribe({
      next: (resp) => {
        this.listasUsuarios = resp.data;
      }
    });
  }

  cargarClientes() {
    this.servC.getClientes().subscribe({
      next: (resp) => {
        this.listasClientes = resp.data;
      }
    });
  }

  cargarProductos() {
    this.servPro.getProductos().subscribe({
      next: (resp) => {
        this.listasProductos = resp.data;
      }
    });
  }

  onProductoChange() {
    const selectedProduct = this.listasProductos.find(prod => prod.id === this.objectPedido.producto_id);

    if (selectedProduct) {
      this.objectPedido.stock = selectedProduct.stock;
      this.objectPedido.precio = selectedProduct.precio;
      this.checkCantidadExcedeStock();
    }
  }

  onCantidadChange() {
    this.checkCantidadExcedeStock();
  }

  checkCantidadExcedeStock() {
    this.isCantidadExcedeStock = this.objectPedido.cantidad > this.objectPedido.stock;
  }

  addDetallePedido(){
     // Encuentra el detalle del pedido existente para el producto seleccionado
    const existingDetail = this.objectPedido.pedidos_detalle.find(
      detalle => detalle.producto_id === this.objectPedido.producto_id
    );

    if (existingDetail) {
      // Si el producto ya está en el detalle, suma la cantidad
      const nuevaCantidad = existingDetail.cantidad + this.objectPedido.cantidad;

      // Verifica si la nueva cantidad no excede el stock
      if (nuevaCantidad <= this.objectPedido.stock) {
        existingDetail.cantidad = nuevaCantidad;
      } else {
        // Maneja el caso donde la cantidad excede el stock
        this.ServG.fun_Mensaje('La cantidad total excede el stock disponible', 'warning');
        return;
      }

    } else {
      // Si el producto no está en el detalle, agrégalo
      const detalle: DetallePedido = {
        producto_id: this.objectPedido.producto_id,
        cantidad: this.objectPedido.cantidad,
        precio: this.objectPedido.precio
      };

      this.objectPedido.pedidos_detalle.push(detalle);
    }

    // Resetea los campos del producto seleccionado después de agregar el detalle
    this.objectPedido.producto_id = 0;
    this.objectPedido.cantidad = 0;
    this.objectPedido.stock = 0;
    this.objectPedido.precio = 0;
    this.isCantidadExcedeStock = false;

  }

  getNombreProducto(producto_id: number): string {
    const producto = this.listasProductos.find(prod => prod.id === producto_id);
    return producto ? producto.nombre : 'Producto no encontrado';
  }

  eliminarDetallePedido(index: number) {
    this.objectPedido.pedidos_detalle.splice(index, 1);
  }


  onSubmit() {
    // console.log('onsubmit', this.objectPedido);

    if (this.objectPedido) {

      const { cliente_id, usuario_id, pedidos_detalle }  = this.objectPedido;

      
      let json = {
        // pedido : {
          cliente_id,
          usuario_id,
          detalle_pedido : pedidos_detalle
        // },
      }

      console.log('json para enviar a la bd', json);


      this.pedidosService.savePedido( json ).subscribe({
        next : (resp ) => {
          console.log(resp);
          if (resp.status) {
            this.ServG.fun_Mensaje(resp.message);
            //TODO: vaciar el objecto que recoji la data
            this.objectPedido = {
              cliente_id : 0,
              usuario_id : 0,
              producto_id : 0,
              cantidad : 0,
              stock : 0,
              precio : 0,
              pedidos_detalle : []
            };

            this.router.navigate(['/pedidos']);
          }
        }
      })
      
    }

    


  }

}
