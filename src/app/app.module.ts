import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeliveryListComponent } from './components/delivery-menagment/delivery-list/delivery-list.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login-menagment/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeliveryDialogComponent } from './components/delivery-menagment/delivery-dialog/delivery-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { AdminComponent } from './components/admin-menagment/admin/admin.component';
import { DriversComponent } from './components/admin-menagment/drivers/drivers.component';
import { SettingsComponent } from './components/admin-menagment/settings/settings.component';
import { HistoryComponent, HistoryDialog } from './components/admin-menagment/history/history.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    DeliveryListComponent,
    LoginComponent,
    NavbarComponent,
    DeliveryDialogComponent,
    AdminComponent,
    DriversComponent,
    SettingsComponent,
    HistoryComponent,
    HistoryDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  providers: [MatNativeDateModule, { provide: MAT_DATE_LOCALE, useValue: 'ru-Ru' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
