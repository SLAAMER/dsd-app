import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'catalogue/:id', loadChildren: './catalogue/catalogue.module#CataloguePageModule' },
  { path: 'layout', loadChildren: './layout/layout.module#LayoutPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
