import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs'
import { DriversModel } from '../../models/driver-models/drivers.model';
import { AddDriverModel } from '../../models/driver-models/add-driver.model';
import { Status } from 'src/app/models/status';
import { UpdateDriverModel } from '../../models/driver-models/update-drivers-model';
import { DeleteDriverModel } from '../../models/driver-models/delete-driver.model';
import { DelvieryTime } from '../../models/driver-models/GetFreeDrivers';
@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private http: HttpClient) { }
  GetDriversURL = environment.apiUrl + 'GetDrivers'
  AddDriversURL = environment.apiUrl + 'AddDrivers'
  UpdateDriversURL = environment.apiUrl + 'UpdateDrivers'
  DeleteDriversURL = environment.apiUrl + 'DeleteDrivers'
  GetFreeDriversURL = environment.apiUrl + 'GetFreeDrivers'

  GetDrivers(token: string, month: number): Observable<DriversModel[]> {
    const params = new HttpParams()
      .set('token', token)
      .set('Month', month)
    return this.http.get<DriversModel[]>(this.GetDriversURL, { params })
  }
  AddDrivers(data: AddDriverModel): Observable<Status> {
    return this.http.post<Status>(this.AddDriversURL, data)
  }
  UpdateDrivers(data: UpdateDriverModel): Observable<Status> {
    return this.http.put<Status>(this.UpdateDriversURL, data)
  }
  DeleteDrivers(data: DeleteDriverModel): Observable<Status> {
    return this.http.post<Status>(this.DeleteDriversURL, data)
  }
  GetFreeDrivers(data: string): Observable<DelvieryTime[]> {
    return this.http.get<DelvieryTime[]>(this.GetFreeDriversURL + `?SelectedDate=${data}`)
  }
}
