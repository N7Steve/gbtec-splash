import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './components/search/search.component';
import { MyPhotosComponent } from './components/my-photos/my-photos.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'my-photos', component: MyPhotosComponent },
  { path: '**', redirectTo: 'search' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
