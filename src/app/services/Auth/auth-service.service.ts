import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminUser } from 'src/app/Models/AdminUser';

const baseUrl='https://localhost:44303/api/AdminAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  async AuthAdmin(data: AdminUser):Promise<Observable<any>>{
    return await this.http.post(`${baseUrl}`, data);
  }
}
