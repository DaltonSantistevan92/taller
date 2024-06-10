import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DetallePedido, IGroupPedidos, Pedido } from 'src/app/interfaces/pedido.interface';
import { GeneralService } from 'src/app/servicios/general.service';
import { PedidosService } from 'src/app/servicios/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  listasPedidos : IGroupPedidos [] = [];

  constructor(
    private servPed: PedidosService,
    public ServG: GeneralService,
    private loading: LoadingController
  ) { }

  ngOnInit() {
    this.getPedidos();
  }

  ionViewWillEnter() {
    // Este método se ejecuta cada vez que la página está a punto de entrar en la vista
    this.getPedidos();
  }

  getPedidos(){
    this.servPed.getPedidos().subscribe({
      next : (resp) => {
         // Agrupar los pedidos por cliente y usuario
        const groupedPedidos = this.servPed.groupComprasUsuarioAndCliente( resp.data );

        // Asignar la propiedad 'expanded' a cada grupo de pedidos
        this.listasPedidos = this.servPed.assignExpanded(groupedPedidos);
      }
    });
  }

  // Método para expandir/cerrar un detalle de pedidos
  toggleExpand(index: number) {
    this.listasPedidos[index].expanded = !this.listasPedidos[index].expanded;
  }

  toggleDetailExpand(pedido: Pedido) {
    pedido.detailExpanded = !pedido.detailExpanded;
  }

  calcularSubtotal(detalle: DetallePedido): number {
    return detalle.cantidad * parseFloat(detalle.precio);
  }
  

  imprimirPdPedidos( p : Pedido ){

  }

}
