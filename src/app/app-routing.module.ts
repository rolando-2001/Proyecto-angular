import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
//import { HomePageComponent } from './shared/pages/home-page/home-page.component';
//import { AboutPageComponent } from './shared/pages/about-page/about-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
/*   {
    path: 'about',
    component: AboutPageComponent
  }, */
/*   {
   path: 'countries',
   loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
  }, */
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  },
  {
    path: '**',
    redirectTo: ''
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
