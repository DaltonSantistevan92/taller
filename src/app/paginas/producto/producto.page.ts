import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/productoI.interface';
import { GeneralService } from 'src/app/servicios/general.service';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  id: number = 0;

  objectProducto! : Producto;
  folder : string = 'productos';


  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    public ServG: GeneralService,
    private loading: LoadingController,
    private router: ActivatedRoute,
    private proS : ProductosService,

  ) { 
    this.id = this.router.snapshot.params['productoId']
      ? this.router.snapshot.params['productoId']
      : 0;
    // console.log('productoId',this.id);
  }

  ngOnInit() {
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];

    // console.log('selected file', this.selectedFile);
    
    this.objectProducto.imagen =  this.selectedFile.name;

    // console.log('objectProducto imagen', this.objectProducto.imagen);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);    
  }

  removeImage(fileInput: HTMLInputElement) {
    this.selectedFile = null;
    this.imagePreview = null;
    fileInput.value = '';
    this.objectProducto.imagen = '';
  }

  async ionViewWillEnter() {
    if (this.id > 0) { // si tiene el id es ara poder editar
      let loading = await this.loading.create();
      loading.present();

      // Realizar la consulta
      this.serviceGetProductoById( loading ); 
    } else {
      let loading = await this.loading.create();
      loading.present();

      this.objectProducto = {
        codigo : '',
        nombre : '',
        stock : 0,
        precio : 0.00,
        activo : 1,
        imagen : '',
        id : this.id
      }
      loading.dismiss();
    }
  }

  async onSubmit() {

    const loading = await this.loading.create();
    loading.present();

    if (this.selectedFile) {
      this.serviceUploadImage( loading );
      loading.dismiss();
    }else {
      this.saveOrUpdateProducto();
      loading.dismiss();
    }
  }

  private serviceUploadImage( loading: HTMLIonLoadingElement) {
    this.ServG.subirArchivo(this.selectedFile, 'productos').subscribe({
      next: (res : any) => {
        // this.objectProducto.imagen = res.fileName; // Asegúrate de que el backend devuelva el nombre del archivo guardado
        this.saveOrUpdateProducto();
      },
      error: (err) => {
        loading.dismiss();
        this.ServG.fun_Mensaje('Error al subir la imagen');
      }
    });
  }

  private saveOrUpdateProducto() {
    if (this.id > 0) {//editar
      this.serviceUpdateProducto(this.objectProducto);
    } else {//guardar
      this.serviceSaveProducto(this.objectProducto);
    }
  }

  private serviceGetProductoById( loading: HTMLIonLoadingElement){
    this.proS.getProductoxID( this.id ).subscribe({
      next : ( res ) => {
        this.objectProducto = res.data;
        loading.dismiss();

        if (this.objectProducto.imagen) {
          this.imagePreview = this.getImagenUrl(this.objectProducto.imagen);
        }
      },
      error : (err) => {
        loading.dismiss();
        this.ServG.fun_Mensaje('Error al recuperar el producto id');
      }
    });
  }

  getImagenUrl(img: string): string {
    
      return this.ServG.showImg(this.folder, img);
  }

  private serviceUpdateProducto( data : any) {
    this.proS.updateProducto( data ).subscribe({
      next : ( res ) => {
        this.ServG.fun_Mensaje( res.mensaje );
        this.ServG.irA('/productos'); 
      },
      error : (err) => {
        this.ServG.fun_Mensaje('Error al actualizar el producto');
      }
    });
  }

  private serviceSaveProducto(  data : any ){
    this.proS.saveProducto(data).subscribe({
      next : ( res ) => {
        this.ServG.fun_Mensaje( res.mensaje );
        this.ServG.irA('/productos'); 
      },
      error : (err) => {
        this.ServG.fun_Mensaje('Error al registrar el producto');
      }
    })
  }




  

}
