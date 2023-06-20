import { Injectable } from '@angular/core';
import {ApiConfiguration} from "./api-configuration";
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base-service";
import {Observable} from "rxjs";
import {Category} from "../repsonses/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService{
  private static readonly getAllPath: string = '/categories/all'
  private static readonly findByNamePath: string = '/categories/byName/'

  constructor(config: ApiConfiguration,
              http: HttpClient) {
    super(config, http)
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.rootUrl + CategoryService.getAllPath);
  }

  findByName(name: string): Observable<Category> {
    return this.http.get<Category>(this.rootUrl + CategoryService.findByNamePath + name)
  }
}
