import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { DescriptionComponent } from './description/description.component';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
  {path:"", component: ProductComponent, pathMatch:"full"},
  {path:"shop", component: ProductComponent},
  {path:"descr/:id-lesson", component: DescriptionComponent}, // описание //*
  {path:"cart", component:CartComponent},
  {path:"admin", component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
