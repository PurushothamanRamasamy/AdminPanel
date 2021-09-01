import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl='https://localhost:44341/api/WareHouse';
@Injectable({
  providedIn: 'root'
})
export class WareHouseServiceService {

  constructor(private http:HttpClient) { }
  getAllWareHouses():Observable<any>{
    return this.http.get(`${baseUrl}`);
  }
}
