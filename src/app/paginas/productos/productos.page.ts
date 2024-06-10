import { Component, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController, NavController } from '@ionic/angular';
import { GeneralService } from 'src/app/servicios/general.service';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  listaProductos : any [] = [];

  files: File[] = [];
  folder : string = 'productos';


  constructor(
    private proS : ProductosService,
    public ServG: GeneralService,
    private loading: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.cargarProductos();
  }

  async cargarProductos() {
    let loading = await this.loading.create();
    loading.present();
    this.serviceCargarProductos(loading);
  }

  private serviceCargarProductos( loading: HTMLIonLoadingElement ){
    this.proS.getProductos().subscribe({
      next: (resp) => {
        this.listaProductos = resp.data;
        console.log('list producto', this.listaProductos);
        loading.dismiss();
      },
      error: (err) => {
        this.listaProductos = [];
        loading.dismiss();
        this.ServG.fun_Mensaje('Error al recuperar los productos');
      }
    });
  }


  fun_editar(prod : any, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
    this.ServG.irA('/producto/' + prod.id);
  }


  fun_eliminar(prod : any, ionItemSliding: IonItemSliding) {
    const  { id } = prod;
    const data = { pro_id : id };
    this.servicDeleteProducto( data, ionItemSliding );
  }


  private servicDeleteProducto( data : { pro_id : number }, ionItemSliding: IonItemSliding){
    this.proS.deleteProducto( data ).subscribe({
      next: (resp) => {
        this.ServG.fun_Mensaje(resp.mensaje);
        ionItemSliding.close();
        this.cargarProductos();
      },
      error: (err) => {
        ionItemSliding.close();
        this.ServG.fun_Mensaje('Error en eliminar el cliente', "warning");
      }
    });
  }

  getImagenUrl(img: string): string {
    if (this.files.length > 0) {
      return URL.createObjectURL(this.files[0]);
    } else {
      return this.ServG.showImg(this.folder, img);
    }
  }
}
