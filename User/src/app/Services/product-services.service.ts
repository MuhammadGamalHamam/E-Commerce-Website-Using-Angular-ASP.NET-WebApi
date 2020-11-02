import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProduct } from '../Shared/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  constructor(private httpClient: HttpClient) { }

  getProductByID(pID: number): Observable<IProduct>{
    return this.httpClient.get<IProduct>(`${environment.apiUrl}/api/products/${pID}`);
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.apiUrl}/api/products`);
  }

  addProduct(prod: IProduct){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': 'bearer ' + sessionStorage.getItem('accessToken')
      })
    };

    return this.httpClient.post(`${environment.apiUrl}/api/products`, prod, httpOptions);
  }
}
