import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl='https://localhost:44341/api/SubCategories';
@Injectable({
  providedIn: 'root'
})
export class SubCategoryServiceService {

  constructor(private http:HttpClient) { }
  getAllSubCategories():Observable<any>{
    return this.http.get(`${baseUrl}`);
  }
  getAllSubCategoriesByCategoryId(catid:any):Observable<any>{
    return this.http.get(`${baseUrl}/${catid}`);
  }
  createSubCategory(data: any): Observable<any> {
    return this.http.post(`${baseUrl}`, data);
  }
  updateSubCategory(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  deleteSubCategory(id:number,updated_By:string):Observable<any>{
    return this.http.delete(`${baseUrl}/${id}/${updated_By}`)
  }
}
