import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    loadChildren: () => import('./paginas/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./paginas/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'cliente/:clienteId',
    loadChildren: () => import('./paginas/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./paginas/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'producto/:productoId',
    loadChildren: () => import('./paginas/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./paginas/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'usuario/:usuarioId',
    loadChildren: () => import('./paginas/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./paginas/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./paginas/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
