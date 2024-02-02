import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CargueExcelService {
  private apiUrl = 'https://valiragregadov1.onrender.com/api';

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<any> {
    
      // Obtener el token del localStorage
    const token = localStorage.getItem('token');

     // Verificar si el token está presente antes de agregarlo a la solicitud
     let headers = new HttpHeaders();
     if (token) {
       headers = headers.set('Authorization', `Bearer ${token}`);
     }
 

    const uploadUrl = `${this.apiUrl}/subirArchivo`;

    return this.http.post(uploadUrl, formData,{ headers });
  }
}

