import { Component, OnInit } from '@angular/core';
import { AdminUser } from 'src/app/Models/AdminUser';
import { AuthReply } from 'src/app/Models/AuthReply';
import { AuthServiceService } from 'src/app/services/Auth/auth-service.service';
import { ToastrService } from 'ngx-toastr';    

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authAdminData:AdminUser={
    id:0, 
    FirstName:'', 
    LastName:'', 
    Mobile:'', 
    Password:'', 
    Role:'',
  }
  reply:AuthReply={
    firstName: "",
    id: 0,
    lastName: "",
    message: "",
    mobile: "",
    role: "",
  };
  constructor(private api:AuthServiceService,private toastr: ToastrService) { }

  async Login(){
    (await this.api.AuthAdmin(this.authAdminData)).subscribe(async r=>{
      this.reply=r;
      if(this.reply.message=="LoggedIn"){
        sessionStorage.setItem('isLoggedIn','true');
        sessionStorage.setItem('role',this.reply.role);
        sessionStorage.setItem('name',this.reply.firstName);
        sessionStorage.setItem('loggedIn','yes');
        window.location.reload();
      }
      else{

        
        await this.toastr.error("Invalid Credentials",'Login failed');

        


      }
    });
    
  }
  
  ngOnInit(): void {
  }

}
