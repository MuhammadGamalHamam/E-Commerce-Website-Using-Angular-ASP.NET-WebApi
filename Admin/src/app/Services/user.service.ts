import { Injectable } from '@angular/core';
import { LoginVM } from '../Shared/login-vm';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  // login(account: LoginVM){
  //   const data = `username=${account.username}&password=${account.password}&grant_type=password`;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };

  //   return this.httpClient.post(`${environment.apiUrl}/token`, data);
  // }

  login(account: LoginVM){
    const data = `username=${account.username}&password=${account.password}&grant_type=password`;

    return this.httpClient.post(`${environment.apiUrl}/token`, data);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiration');
  }

  isLogged() {
    console.log('In isLogged');
    return localStorage.getItem('accessToken') ? true : false;
  }

}
