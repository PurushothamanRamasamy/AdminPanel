import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AdminPanel';
  isLoggedIn: boolean = false;
  constructor(){
    if(sessionStorage.getItem('isLoggedIn')){
      this.isLoggedIn=true;
    }
  }
}
