import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {ProductResponse} from "../../../repsonses/product-response";
import {ProductService} from "../../../services/product.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddProductComponent} from "../add-product/add-product.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {CompanyService} from "../../../services/company.service";
import {PopoverPlacement} from "ngx-smart-popover";
import {DetailsComponent} from "../details/details.component";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductResponse>;
  response: ProductResponse[] = [];
  dataSource = new MatTableDataSource<ProductResponse>(this.response);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['#', 'name', "category", "size", "color", "edit", 'detail'];
  constructor(private matDialog: MatDialog,
              private toast: ToastrService,
              private router: Router,
              private authService: AuthService,
              private categoryService: CategoryService,
              private companyService: CompanyService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
  this.getAllProducts()
  }

  getAllProducts() {
    this.productService.getAll().subscribe({
      next: (resp) => {
        this.dataSource.data = resp as ProductResponse[]
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openRegisterCustomer() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '35%';

    this.matDialog.open(AddProductComponent, dialogConfig)
  }

  onEditClicked(id: number) {
    this.productService.registerHeading = "Edit Product"
    this.productService.submitButton = "Save Changes"
    let product = this.dataSource.data.find((p) => {return p.id === id});
    this.categoryService.findByName(product.category).subscribe({
      next: (cat) => {
        this.companyService.findByName(product.company).subscribe({
          next: (com) => {
            this.productService.productForm = new FormGroup({
              id: new FormControl(product.id),
              name: new FormControl(product.name, Validators.required),
              color: new FormControl(product.color),
              size: new FormControl(product.size),
              category: new FormControl(cat.id, Validators.required),
              company: new FormControl(com.id, Validators.required)
            })
            this.openRegisterCustomer()
          }
        })
      }
    })
  }

  details(id: number) {
    let product = this.dataSource.data.find((p) => {return p.id === id});
    this.productService.name = product.name
    this.productService.color = product.color;
    this.productService.size = product.size;
    this.productService.category = product.category;
    this.productService.manufacturer = product.company;
    this.productService.phone = product.phone;
    this.productService.email = product.email;
    this.productService.maidIn = product.country;
    this.productService.city = product.city;

    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';

    this.matDialog.open(DetailsComponent, dialogConfig)
  }

  logout() {
    this.authService.logOut({userId: 1}).subscribe({
      next: (resp) => {
        this.toast.success("Logout success!")
        this.router.navigateByUrl("/product/login").then((p) => this.authService.loginForm.reset())
      }
    })

  }
}
