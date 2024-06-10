import { Component, OnInit } from '@angular/core';
import { Cards } from 'src/app/interfaces/card-principal.nterface';
import { GeneralService } from 'src/app/servicios/general.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  public cards : Cards[] = [
    {
      clase: 'colorboton1',
      ruta: '/productos',
      icono: 'add',
      titulo: 'productos'
    },
    {
      clase: 'colorboton2',
      ruta: '/clientes',
      icono: 'body',
      titulo: 'clientes'
    },
    {
      clase: 'colorboton3',
      ruta: '/usuarios',
      icono: 'people-circle',
      titulo: 'usuarios'
    },
    {
      clase: 'colorboton4',
      ruta: '/pedidos',
      icono: 'cart-outline',
      titulo: 'pedidos'
    }
  ];

  constructor(public servG: GeneralService) { }

  ngOnInit() {
  }

}
