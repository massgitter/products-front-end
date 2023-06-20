import { Injectable } from '@angular/core';
import {ApiConfiguration} from "./api-configuration";
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base-service";
import {Observable} from "rxjs";
import {CompanyResponse} from "../repsonses/company-response";

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService {
  private static readonly getAllPath: string = '/manufacturer/all'
  private static readonly findByNamePath: string = '/manufacturer/byName/'

  constructor(config: ApiConfiguration,
              http: HttpClient) {
    super(config, http)
  }

  getAllCompanies(): Observable<CompanyResponse[]> {
    return this.http.get<CompanyResponse[]>(this.rootUrl + CompanyService.getAllPath);
  }

  findByName(name: string): Observable<CompanyResponse> {
    return this.http.get<CompanyResponse>(this.rootUrl + CompanyService.findByNamePath + name);
  }
}
