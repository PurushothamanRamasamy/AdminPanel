import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/category';
import { Product } from 'src/app/Models/product';
import { SubCategory } from 'src/app/Models/subcategory';
import { WAREHOUSE } from 'src/app/Models/WareHouse';
import { CategoryServiceService } from 'src/app/services/category/category-service.service';
import { SubCategoryServiceService } from 'src/app/services/category/sub-category-service.service';
import { ProductServiceService } from 'src/app/services/product/product-service.service';
import { WareHouseServiceService } from 'src/app/services/WareHouse/ware-house-service.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() item = '';
  faEdit=faEdit;
  faTrash=faTrash;
  isAddProduct: boolean=false;
  isViewProduct: boolean=false;
  allProducts:Product[]=[];
  insertProduct:Product={
      id:0, 
		  subCategory_Id:0, 
		  productName:'', 
		  description:'', 
		  specification:'', 
		  avaliablity_Count:0, 
		  discount_Percentage:0, 
		  updated_By:'', 
		  isActive:false, 
		  lastUpdateDate:new Date, 
		  price:0, 
		  warehouse_ID:0, 
      
  }
  image={
    filename:'',
    file:File
  }
  getcat={
    catId:0
  }
  AllWareHouse:WAREHOUSE[]=[];
  allcategories:Category[]=[];
  allSubcategories:SubCategory[]=[];

  returnvalue={
    message:''
  };
  p: any = 1;
  count: any = 5;
  editProduct={
    id:0, 
    subCategory_Id:0, 
    productName:'', 
    description:'', 
    specification:'', 
    avaliablity_Count:0, 
    discount_Percentage:0, 
    updated_By:'', 
    isActive:false, 
    lastUpdateDate:new Date, 
    price:0, 
    warehouse_ID:0,
  };
  isEdit: boolean=false;
  isDelete: boolean=false;
  constructor(private prodApi:ProductServiceService,private catapi:CategoryServiceService,private subapi:SubCategoryServiceService,private wareHouseApi:WareHouseServiceService,private toastr: ToastrService,) { 
    this.wareHouseApi.getAllWareHouses().subscribe(data=>{
      this.AllWareHouse=data;
    });
    this.getAllCategories();
    this.getAllSubCategories();
  }
  getAllSubCategories() {
    if(this.getcat.catId!=0)
    {
      this.subapi.getAllSubCategoriesByCategoryId(this.getcat.catId).subscribe(d=>{
        this.allSubcategories=d;
      })
    }
  }
  getAllCategories()
  {
    this.catapi.getAllCategories().subscribe(data=>{
      this.allcategories=data;
    })
  }
  getallProducts(){
    this.prodApi.getAllProducts().subscribe(data=>{
      this.allProducts=data;
    });
  }
 
  AddProduct(){
    let updatedby=sessionStorage.getItem('name')+'-'+sessionStorage.getItem('role');
    this.insertProduct.updated_By= updatedby.toString();
    this.insertProduct.isActive=true;
    this.prodApi.createProduct(this.insertProduct).subscribe(da=>{
      this.returnvalue=da;
      if(this.returnvalue.message.includes('Registered Successfully'))
        {
        this.toastr.success(this.returnvalue.message,'Success');
        this.getallProducts();
        this.isViewProduct=true;
        this.isAddProduct=false;
        }
        else{
        this.toastr.warning(this.returnvalue.message,'Warning');

        }
    })
  }
  edit(val:number){
    this.getallProducts();
    
     this.allProducts.forEach(e => {
       if(e.id==val)
       {
         this.editProduct=e;
       }
     });
      this.isEdit=true;
  }
  delete(val:number){
    let updatedby=sessionStorage.getItem('name')+'-'+sessionStorage.getItem('role');
      this.prodApi.deleteProduct(val,updatedby).subscribe(da=>{
        this.returnvalue=da;
      if(this.returnvalue.message.includes('Product deleted successfully'))
        {
        this.toastr.success(this.returnvalue.message,'Success');
        this.getallProducts();
        }
        else{
        this.toastr.warning(this.returnvalue.message,'Warning');

        }
      })
      this.isEdit=false;
  }
  Edit(){
    let updatedby=sessionStorage.getItem('name')+'-'+sessionStorage.getItem('role');
    this.editProduct.updated_By= updatedby.toString();
    this.prodApi.updateProduct(this.editProduct.id,this.editProduct).subscribe(da=>{
      this.returnvalue=da;
    if(this.returnvalue.message.includes('Updated successfully'))
      {
      this.toastr.success(this.returnvalue.message,'Success');
      this.getallProducts();
      }
      else{
      this.toastr.warning(this.returnvalue.message,'Warning');

      }
    })
  }
 

  ngOnChanges() {
    if (this.item==='tab4.1') {
      this.isAddProduct=true;
      this.isViewProduct=false;
    }
    if (this.item==='tab4.2') {
      this.isAddProduct=false;
      this.isViewProduct=true;
      this.getallProducts();
    }
   }
    ngOnInit(): void {
      if (this.item==='tab4.1') {
        this.isAddProduct=true;
        this.isViewProduct=false;
      }
      if (this.item==='tab4.2') {
        this.isAddProduct=false;
        this.isViewProduct=true;
        this.getallProducts();
      }
      
    }

}
