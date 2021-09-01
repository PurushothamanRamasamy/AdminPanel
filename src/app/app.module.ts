import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { ToastrModule } from 'ngx-toastr';
import { CategoriesComponent } from './components/categories/categories.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { ProductsComponent } from './components/products/products.component';  


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CategoriesComponent,
    SubCategoryComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
        closeButton: true
      }
    )  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
