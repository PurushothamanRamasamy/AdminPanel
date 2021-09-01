import { Component, OnInit } from '@angular/core';
import { faTachometerAlt,faShoppingBag,faUsers,faClipboardList,faHome,faUserCircle,faClipboard,faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';    
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  faCoffee = faTachometerAlt;
  faShoppingBag=faShoppingBag;
  faPeopleArrows=faUsers;
  faClipboardList=faClipboardList;
  faBars=faHome;
  faUserCircle=faUserCircle;
  faClipboard=faClipboard;
  faCodeBranch=faCodeBranch;
  tab : any = 'tab1';
  PageTitle:any='Dashboard';
  user:any="Purushothaman";
  title:any='Admin';
  constructor(private toastr: ToastrService) {
    if(sessionStorage.getItem('loggedIn')){
      this.toastr.success("Loggedin Successful",'Success');
      sessionStorage.removeItem('loggedIn');
    }
     
   }

  ngOnInit(): void {
  }
  Dashboard(){
    this.tab='tab1';
    this.PageTitle='Dashboard';
  }
  Orders(){
    this.tab='tab2';
    this.PageTitle='Orders';
    
  }
  Customers(){
    this.tab='tab3';
    this.PageTitle='Customers';

  }
  
  AddProduct(){
    this.tab='tab4.1';
    this.PageTitle='Product/ Add Product';
  }

  ViewProducts(){
    this.tab='tab4.2';
    this.PageTitle='Product/ View Products';
    
  }
  AddCategories(){
    this.tab='tab5.1';
    this.PageTitle='Category/ Add Category';
  }

  ViewCategories(){
    this.tab='tab5.2';
    this.PageTitle='Category/ View Categories';
    
  }
  
 
  Subcategory(){
    this.tab='tab6';
    this.PageTitle='Sub Category';
  }
  
}
