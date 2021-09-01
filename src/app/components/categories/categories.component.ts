import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/category';
import { CategoryServiceService } from 'src/app/services/category/category-service.service';
import { faEdit,faTrash,faEye,faList } from '@fortawesome/free-solid-svg-icons';
import { SubCategoryServiceService } from 'src/app/services/category/sub-category-service.service';
import { SubCategory } from 'src/app/Models/subcategory';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  faEdit=faEdit;
  faTrash=faTrash;
  faEye=faEye;
  faList=faList;
  insertCategory:Category={
    id:0, 
    product_Type:'', 
    description:'', 
    updated_By:'', 
    isActive:false, 
    lastUpdateDate:new Date, 
}
SubCategories=[{
  id:0, 
  category_Id:0,
  product_sub_Type:'',
  description:'', 
  updated_By:'', 
  isActive:false, 
  lastUpdateDate:new Date, 
}];
editCategory={
  id:0, 
  product_Type:'', 
  description:'', 
  updated_By:'', 
  isActive:false, 
  lastUpdateDate:'', 
}
deleteCategory={
  id:0, 
  product_Type:'', 
  description:'', 
  updated_By:'', 
  isActive:false, 
  lastUpdateDate:'', 
}
  returnvalue={
    message:''
  };
  p: any = 1;
  count: any = 5;
  allCategories=[{
      id:0, 
      product_Type:'', 
      description:'', 
      updated_By:'', 
      isActive:false, 
      lastUpdateDate:'', 
  }];
  @Input() item = '';
  d:number=1;
  isAddCategory:boolean=false;
  isViewCategory:boolean=false;
  isEdit:boolean=false;
  isDelete:boolean=false;
  isSubcategories:boolean=false;
  constructor(private api:CategoryServiceService,private toastr: ToastrService,private subApi:SubCategoryServiceService) {
    
    
   }
   edit(val:number)
   {
     this.getallcat();
     this.allCategories.forEach(e => {
       if(e.id==val)
       {
         this.editCategory=e;
       }
     });
      this.isEdit=true;
      this.isDelete=false;
      this.isSubcategories=false;
   }
   Edit(){
    this.isViewCategory=false;

    let updatedby=sessionStorage.getItem('name')+'-'+sessionStorage.getItem('role');
    this.editCategory.updated_By= updatedby.toString();
      this.api.updateCategory(this.editCategory.id,this.editCategory).subscribe(rp=>{
        this.returnvalue=rp;
        if(this.returnvalue.message.includes('Updated Successfully'))
        {
        this.toastr.success(this.returnvalue.message,'Success');
        this.getallcat();
        }
        else{
        this.toastr.warning(this.returnvalue.message,'Warning');

        }
      });
     
     this.isViewCategory=true;


   }
   delete(val:number)
   {
    this.getallcat();
    this.allCategories.forEach(e => {
      if(e.id==val)
      {
        this.deleteCategory=e;
      }
    });
    this.isEdit=false;
    this.isDelete=true;
    this.isSubcategories=false;

   }
   Delete(){
     this.isViewCategory=false;
    let updatedby=sessionStorage.getItem('name')+'-'+sessionStorage.getItem('role');
    this.deleteCategory.updated_By= updatedby.toString();
    this.api.deleteCategory(this.deleteCategory.id,this.deleteCategory.updated_By).subscribe(rp=>{
      this.returnvalue=rp;
      if(this.returnvalue.message.includes('Category deleted successfully'))
      {
      this.toastr.success(this.returnvalue.message,'Success');
      this.getallcat();
      }
      else{
      this.toastr.warning(this.returnvalue.message,'Warning');

      }
    });
    this.isViewCategory=true;

   }
   async Add(){
    this.insertCategory.isActive=true;
    let updatedby=sessionStorage.getItem('name')+'-'+sessionStorage.getItem('role');
    this.insertCategory.updated_By= updatedby.toString();
    (await this.api.createCategory(this.insertCategory)).subscribe(data=>{
      this.returnvalue=data;
      if(this.returnvalue.message.includes('Already Exists')){
      this.toastr.warning(this.returnvalue.message,'Warning');
      }
      else{
      this.toastr.success(this.returnvalue.message,'Success');
      this.getallcat();
      this.isAddCategory=false;
      this.isViewCategory=true;
      }
    });
    
  }
  viewsubCategory(val:number)
  {
    this.SubCategories.length=0;
    this.subApi.getAllSubCategories().subscribe(data=>{
      data.forEach((e:SubCategory) => {
        if (e.category_Id==val) {
          this.SubCategories.push(e);
        }
      });
    });
    this.isEdit=false;
    this.isDelete=false;
    this.isSubcategories=true;
  }
  getallcat(){
    this.api.getAllCategories().subscribe((c: { id: number; product_Type: string; description: string; updated_By: string; isActive: boolean; lastUpdateDate: string; }[])=>this.allCategories=c);
 }
 ngOnChanges() {
  if (this.item==='tab5.1') {
    this.isAddCategory=true;
    this.isViewCategory=false;
  }
  if (this.item==='tab5.2') {
    this.isAddCategory=false;
    this.isViewCategory=true;
    this.getallcat();
  }
 }
  ngOnInit(): void {
    if (this.item==='tab5.1') {
      this.isAddCategory=true;
      this.isViewCategory=false;
    }
    if (this.item==='tab5.2') {
      this.isAddCategory=false;
      this.isViewCategory=true;
      this.getallcat();
    }
    
  }

}
