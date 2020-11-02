import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeUserGuard } from './Components/admin/authorize-user.guard';


const routes: Routes = [
  {
    path: 'Admin',
    loadChildren: () => import('./Components/admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
