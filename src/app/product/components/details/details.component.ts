import { Component } from '@angular/core';
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  name: string;
  color: string;
  size: number;
  category: string;
  manufacturer: string;
  phone: string;
  email: string
  maidIn: string;
  city: string;

  constructor(private service: ProductService) {
    this.name = service.name;
    this.color = service.color;
    this.size = service.size;
    this.category = service.category;
    this.manufacturer = service.manufacturer;
    this.phone = service.phone;
    this.email = service.email;
    this.maidIn = service.maidIn
    this.city = service.city;
  }

}
