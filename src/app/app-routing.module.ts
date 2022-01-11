import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {OwnerPageComponent} from "./components/owner-page/owner-page.component";

const routes: Routes = [
  {path: '', component: HomePageComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
    ]},
  {path: 'owner', component: OwnerPageComponent, children:[
      {path: 'view', component: OwnerPageComponent},
      {path: 'edit', component: OwnerPageComponent},
      {path: 'add', component: OwnerPageComponent}
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
