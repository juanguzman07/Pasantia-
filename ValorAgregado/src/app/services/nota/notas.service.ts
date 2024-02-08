import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private apiUrl = 'https://valiragregadov1.onrender.com/api';

  constructor(private http: HttpClient) {}

  getRegistros(): Observable<any[]> {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token está presente antes de agregarlo a la solicitud
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const endpoint = `${this.apiUrl}/obtenerNotas`; // Reemplaza 'registros' con el nombre de tu endpoint
    return this.http.get<any[]>(endpoint,{ headers });
  }
}
