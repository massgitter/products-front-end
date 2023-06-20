import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {MatDialog} from "@angular/material/dialog";
import {Category} from "../../../repsonses/category";
import {CategoryService} from "../../../services/category.service";
import {CompanyService} from "../../../services/company.service";
import {CompanyResponse} from "../../../repsonses/company-response";
import {ProductRequest} from "../../../request/product-request";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  registerHeading: string;
  productForm: FormGroup;
  Categories: Category[];
  Companies: CompanyResponse[];
  inserting: any;
  constructor(private router: Router,
              private matDialog: MatDialog,
              private toast: ToastrService,
              private authService: AuthService,
              private service: ProductService,
              private companyService: CompanyService,
              private categoryService: CategoryService) {
    this.request = service.request
    this.submitButton = service.submitButton
    this.productForm = service.productForm;
    this.registerHeading = service.registerHeading;
  }
  submitButton: any;

  request: ProductRequest;

  ngOnInit(): void {
    this.getAllCompanies()
    this.getAllCategories();
  }
  addProduct() {
    this.request.name = this.productForm.get('name').value;
    this.request.color = this.productForm.get('color').value;
    this.request.size = this.productForm.get('size').value;
    this.request.category = this.productForm.get('category').value;
    this.request.company = this.productForm.get('company').value;

    if (this.registerHeading === 'Add Product') {
      this.service.create(this.request).subscribe({
        next: (resp) => {
          this.toast.success(this.request.name + ' ' + "Successfully Added!")
          this.router.navigateByUrl('/product/products').then((r) => this.close())
        },
        error: (error) => console.log(error)
      })
    } else {
      this.service.update(this.productForm.get('id').value, this.request).subscribe({
        next: (resp) => {
          this.toast.success(this.request.name + ' ' + 'Updated successfully!')
          this.router.navigateByUrl('/product/products').then((r) => this.close())
        },
        error: (error) => console.log(error)
      })
    }

  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (resp) => {
        this.Categories = resp;
      }
    })
  }

  getAllCompanies() {
    this.companyService.getAllCompanies().subscribe({
      next: (resp) => {
        this.Companies = resp;
      }
    })
  }

  close() {
    this.matDialog.closeAll();
    this.productForm.reset();
    window.location.reload()
  }
}
