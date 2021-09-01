import { Component, Input, OnInit } from '@angular/core';
import { faEdit, faEye, faList, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { SubCategory } from 'src/app/Models/subcategory';
import { Category } from 'src/app/Models/category';

import { SubCategoryServiceService } from 'src/app/services/category/sub-category-service.service';
import { CategoryServiceService } from 'src/app/services/category/category-service.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  faEdit=faEdit;
  faTrash=faTrash;
  faEye=faEye;
  faList=faList;
  insertSubCategory:SubCategory={
    id:0, 
    category_Id:0,
    product_sub_Type:'', 
    description:'', 
    updated_By:'', 
    isActive:false, 
    lastUpdateDate:new Date, 
}
  returnvalue={
    message:''
  };
  p: any = 1;
  count: any = 5;
  allSubCategories=[{
      id:0, 
      category_Id:0,
      product_sub_Type:'',
      description:'', 
      updated_By:'', 
      isActive:false, 
      lastUpdateDate:new Date, 
  }];
  editSubCategory={
    id:0, 
    category_Id:0,
    product_sub_Type:'',
    description:'', 
    updated_By:'', 
    isActive:false, 
    lastUpdateDate:new Date, 
  }
  deleteSubCategory={
    id:0, 
    category_Id:0,
    product_sub_Type:'',
    description:'', 
    updated_By:'', 
    isActive:false, 
    lastUpdateDate:new Date, 
  }
  allcategories=[{
      id:0, 
      product_Type:'', 
      description:'', 
      updated_By:'', 
      isActive:false, 
      lastUpdateDate:new Date
  }]
  d:number=1;
  isAddSubCategory:boolean=false;
  isViewSubCategory:boolean=false;
  isEdit: boolean=false;
  isDelete: boolean=false;
  
  constructor(private subCategoryapi:SubCategoryServiceService,private categoryApi:CategoryServiceService,private toastr: ToastrService) {
    this.allSubCategories.length=0
    this.categoryApi.getAllCategories().subscribe(d=>{
      this.allcategories=d;
    });
    this.GetallSubCategories();

   }
  canAdd(){
    if (this.insertSubCategory.category_Id!=0) {
      this.isAddSubCategory=true;
    }
    else{
      this.toastr.warning('Please Select category to add');
    }
  }
   Add(){
     this.insertSubCategory.isActive=true;
    let updatedby=sessionStorage.getItem('name')+'-'+sessionStorage.getItem('role');
     this.insertSubCategory.updated_By=updatedby.toString();
      this.subCategoryapi.createSubCategory(this.insertSubCategory).subscribe(d=>{
        this.returnvalue=d;
      if(this.returnvalue.message.includes('Successfully registered')){
      this.toastr.success(this.returnvalue.message,'Success');
      this.GetallSubCategories();
      }
      else{
      this.toastr.error(this.returnvalue.message,'Failure');

      }
      });
      
   }
   
   GetallSubCategories(){
     //this.allSubCategories.length=0;
     if(this.insertSubCategory.category_Id!=0)
     {
       this.subCategoryapi.getAllSubCategoriesByCategoryId(this.insertSubCategory.category_Id).subscribe(
         (c: { id: number;category_Id:number; product_sub_Type: string; description: string; updated_By: string; isActive: boolean; lastUpdateDate: Date; }[])=>
         this.allSubCategories=c);
     }
   }
   edit(val:number)
   {
     this.GetallSubCategories();
     this.allSubCategories.forEach(e => {
       if(e.id==val)
       {
         this.editSubCategory=e;
       }
     });
      this.isEdit=true;
      this.isDelete=false;
   }
   Edit(){
    

    let updatedby=sessionStorage.getItem('name')+'-'+sessionStorage.getItem('role');
    this.editSubCategory.updated_By= updatedby.toString();
      this.subCategoryapi.updateSubCategory(this.editSubCategory.id,this.editSubCategory).subscribe(rp=>{
        this.returnvalue=rp;
        if(this.returnvalue.message.includes('Updated Successfully'))
        {
        this.toastr.success(this.returnvalue.message,'Success');
        this.GetallSubCategories();
        }
        else{
        this.toastr.warning(this.returnvalue.message,'Warning');

        }
      });
     


   }
   delete(val:number)
   {
    this.GetallSubCategories();
    this.allSubCategories.forEach(e => {
      if(e.id==val)
      {
        this.deleteSubCategory=e;
      }
    });
    this.isEdit=false;
    this.isDelete=true;

   }
   Delete(){
    let updatedby=sessionStorage.getItem('name')+'-'+sessionStorage.getItem('role');
    this.deleteSubCategory.updated_By= updatedby.toString();
    this.subCategoryapi.deleteSubCategory(this.deleteSubCategory.id,this.deleteSubCategory.updated_By).subscribe(rp=>{
      this.returnvalue=rp;
      if(this.returnvalue.message.includes('Category deleted successfully'))
      {
      this.toastr.success(this.returnvalue.message,'Success');
      this.GetallSubCategories();
      }
      else{
      this.toastr.warning(this.returnvalue.message,'Warning');

      }
    });

   }
    ngOnInit(): void {
      
      
    }

}
