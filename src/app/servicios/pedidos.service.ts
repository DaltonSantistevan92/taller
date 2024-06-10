import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralService } from './general.service';
import { IGroupPedidos, IntPedidos, Pedido } from '../interfaces/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  api = environment.api;

  constructor(private http: HttpClient, private servG: GeneralService) { }

  savePedido(data : any) {
    const url = `${this.api}/insertarPedidoAndDetallePedido`;
    return this.http.post<any>(url, this.servG.objectToFormData( data ) );
  }

  getPedidos() {
    const url = `${this.api}/listarPedidosAndDetallePedidos`;
    return this.http.get<IntPedidos>(url);
  }

  groupComprasUsuarioAndCliente( pedidos : Pedido[]) : IGroupPedidos[] {
    const groupedPedidos: { [key: string]: Pedido[] } = {};

    pedidos.forEach( item => {
      const { cliente : {nombre : nombreCliente }, usuario : { nombre : nombreUsuario }  } = item;

       // Generar una clave única para cada grupo basada en usuario y cliente
       const key = `${nombreUsuario}_${nombreCliente}`;

       if (!groupedPedidos[key]) {
        groupedPedidos[key] = [];
      }
      groupedPedidos[key].push( item );
    });

    return Object.keys(groupedPedidos).map(key => {
      const [nombreUsuario, nombreCliente] = key.split('_');
      return { nombreUsuario, nombreCliente, pedidos: groupedPedidos[key] };
    });
  }

  assignExpanded( groupedPedidos : IGroupPedidos[] ) {
    return groupedPedidos.map(group => ({
      nombreUsuario: group.nombreUsuario,
      nombreCliente: group.nombreCliente,
      pedidos: group.pedidos,
      expanded: false
    }));
  }


  
}
