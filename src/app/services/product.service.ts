import { Injectable } from '@angular/core';
import {BaseService} from "./base-service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiConfiguration} from "./api-configuration";
import {Observable, retry} from "rxjs";
import {ProductResponse} from "../repsonses/product-response";
import {ProductRequest} from "../request/product-request";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddProductComponent} from "../product/components/add-product/add-product.component";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService{
  productForm: FormGroup;
  registerHeading: string = "Add Product"
  submitButton: string = "Register"
  request: ProductRequest;
  name: string;
  color: string;
  size: number;
  category: string;
  manufacturer: string;
  phone: string;
  email: string;
  maidIn: string;
  city: string;
  private static readonly createPath: string = "/products/create"
  private static readonly updatePath: string = "/products/edit/";
  private static readonly findByIdPath: string = "/products/";
  private static readonly findByNamePath: string = "/products/byName/";
  private static readonly getAllPath: string = "/products/all"

  constructor(config: ApiConfiguration,
              http: HttpClient,
              private matDialog: MatDialog) {
    super(config, http)
    this.productForm = new FormGroup<any>({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      color: new FormControl(''),
      size: new FormControl(''),
      category: new FormControl(null, Validators.required),
      company: new FormControl(null, Validators.required)
    })

    this.request = {
      name: '',
      color: '',
      size: 0,
      category: 0,
      company: 0
    }
  }

  openCustomerForm() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '35%';

    this.matDialog.open(AddProductComponent, dialogConfig)
  }

  create(request: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.rootUrl + ProductService.createPath, request)
  }

  update(id: number, request: ProductRequest): Observable<ProductResponse> {

    return this.http.put<ProductResponse>(this.rootUrl + ProductService.updatePath + id, request,)
  }

  findById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.rootUrl + ProductService.findByIdPath + id);
  }

  findByName(name: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.rootUrl + ProductService.findByNamePath + name);
  }

  getAll(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.rootUrl + ProductService.getAllPath)
  }
}
