import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from '../Shared/iproduct';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      })
    };

    return this.httpClient.post(`${environment.apiUrl}/api/products`, prod, httpOptions);
  }

  updateProduct(id: number, prod: IProduct){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      })
    };

    return this.httpClient.put(`${environment.apiUrl}/api/products/${id}`, prod, httpOptions);
  }

  deleteProduct(id: number){
    // var headers_object = new HttpHeaders();
    // headers_object.set('Content-Type', 'application/json');
    // headers_object.set("Authorization", "Bearer " + localStorage.getItem('accessToken'));
    // const httpOptions = {
    //   headers: headers_object
    // };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      })
    };

    return this.httpClient.delete(`${environment.apiUrl}/api/products/${id}`, httpOptions);
  }

}
