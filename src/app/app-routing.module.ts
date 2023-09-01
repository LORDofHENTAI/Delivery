import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { LoginComponent } from './components/login-menagment/login/login.component';
import { DeliveryListComponent } from './components/delivery-menagment/delivery-list/delivery-list.component';
import { AdminComponent } from './components/admin-menagment/admin/admin.component';
import { DriversComponent } from './components/admin-menagment/drivers/drivers.component';
import { SettingsComponent } from './components/admin-menagment/settings/settings.component';
import { HistoryComponent } from './components/admin-menagment/history/history.component';
import { listGuard } from './guards/list.guard';
import { adminGuard } from './guards/admin.guard';
const adminRoutes: Routes = [
  { path: 'drivers', component: DriversComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'history', component: HistoryComponent }
]

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list', component: DeliveryListComponent, canActivate: [listGuard] },
  { path: 'admin', component: AdminComponent, children: adminRoutes, canActivate: [adminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
