import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl='https://localhost:44341/api/Products';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:HttpClient) { }
  getAllProducts():Observable<any>{
    return this.http.get(`${baseUrl}`);
  }
  createProduct(data: any): Observable<any> {
    return this.http.post(`${baseUrl}`, data);
  }
  updateProduct(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  deleteProduct(id:any,updated_By:string):Observable<any>{
    return this.http.delete(`${baseUrl}/${id}/${updated_By}`)
  }
}
