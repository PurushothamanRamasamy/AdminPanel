import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Models/category';

const baseUrl='https://localhost:44341/api/categories';

@Injectable({
  providedIn: 'root'
})

export class CategoryServiceService {

  constructor(private http:HttpClient) { }
   getAllCategories():Observable<any>{
    return  this.http.get(`${baseUrl}`);
  }
  async createCategory(data: Category): Promise<Observable<any>> {
    return await this.http.post(`${baseUrl}`, data);
  }
  updateCategory(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  deleteCategory(id:number,updated_By:string):Observable<any>{
    return this.http.delete(`${baseUrl}/${id}/${updated_By}`)
  }
}
