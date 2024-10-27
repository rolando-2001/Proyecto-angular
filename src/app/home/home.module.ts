import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';





@NgModule({
  declarations: [
    HomePageComponent,
    NavbarComponent,
    FooterComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HomePageComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class HomeModule { }
