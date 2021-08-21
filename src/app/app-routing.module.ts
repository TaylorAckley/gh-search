import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './features/search/search.component';
import { UserDetailComponent } from './features/search/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
    { path: 'users/:login', component: UserDetailComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }