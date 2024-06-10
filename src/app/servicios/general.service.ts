import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  api = environment.api;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toast: ToastController
  ) {}

  // public URLservidor: string = 'http://localhost/API2024/';

  irA(url: string) {
    this.router.navigateByUrl(url);
  }

  async fun_Mensaje(texto: string, tipo: string = 'success') {
    let t = await this.toast.create({
      message: texto,
      color: tipo,
      duration: 3000,
    });
    t.present();
  }

  objectToFormData(obj: any, form?: any, namespace?: any) {
    let fd: any = form || new FormData();
    let formKey: any;
    for (let property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        }
        if (
          typeof obj[property] === 'object' &&
          !(obj[property] instanceof File)
        ) {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }
      }
    }
    return fd;
  }

  showImg(folder: string, imagen:string) : string{
    const url : string = `${this.api}/img/getImg/${folder}/${imagen}`;
    return url;
  }


  // Método para subir archivos
  subirArchivo(file: File, folder: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const urlCompleta = `${this.api}/img/upload`;

    return this.http.post<any>(urlCompleta, formData);
  }


}
