import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../loginRequest';
import  {  Observable, throwError, catchError, BehaviorSubject , tap} from 'rxjs';
import { User } from './user';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://valiragregadov1.onrender.com/api';
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> =new BehaviorSubject<User>({id:0, email:'',id_user:'',token:''});

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/signin`, credentials)
      .pipe(
        map((response: any) => {
          if (response && response.token) {
            // Guardar el token en el almacenamiento local (local storage)
            localStorage.setItem('token', response.token);
           
            return response.token;
          } else {
            throw new Error('Token no encontrado en la respuesta del servidor.');
          }
        })
      );
  }
  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

  get userData():Observable<User>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

}