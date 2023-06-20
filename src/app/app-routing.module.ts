import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'product', loadChildren: () => import('./product/product.module').then((p) => p.ProductModule)},
  {path: '', redirectTo: 'product/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload", useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
