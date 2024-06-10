import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralService } from './general.service';
import { IProductos } from '../interfaces/productoI.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  api = environment.api;

  constructor(private http: HttpClient, private servG: GeneralService) { }

  getProductos() {
    const url = `${this.api}/listar`;
    return this.http.get<IProductos>(url);
  }

  deleteProducto(data: { pro_id : number }) {
    const url = `${this.api}/ProductoDelete`;
    return this.http.post<any>(url, this.servG.objectToFormData( data ));
  }


  getProductoxID(id: number){
    const url = `${this.api}/listarproductoxid`;
    return this.http.post<any>(url, this.servG.objectToFormData({ producto_id: id }));
  }

  updateProducto(data : any) {
    const url = `${this.api}/ProductoModificar`;
    return this.http.post<IProductos>(url, this.servG.objectToFormData( data ) );
  }

  saveProducto(data : any) {
    const url = `${this.api}/newProducto`;
    return this.http.post<IProductos>(url, this.servG.objectToFormData( data ) );
  }
}
