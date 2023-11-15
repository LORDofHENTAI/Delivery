import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryModel } from '../models/delivery.model';
import { Status } from '../models/Status';
import { NewDeliveryModel } from '../models/new-deliver-model';
import { DeleteDeliveryModel } from '../models/delete-delivery-model';
import { environment } from 'src/app/environments/environment';
@Injectable({ providedIn: 'root' })
export class DeliveryService {

  constructor(private http: HttpClient) { }

  getDeliveryListURL = environment.apiUrl + 'GetDeliveryList'
  newDeliveryURL = environment.apiUrl + 'NewDelivery'
  deleteDeliveryURL = environment.apiUrl + 'DeleteDelivery'
  updateDeliveryURL = environment.apiUrl + 'UpdateDelivery'
  searchDeliveryURL = environment.apiUrl + 'SearchDelivery'
  deliveryByDateURL = environment.apiUrl + 'DeliveryByDate'
  seliveryByNextDateURL = environment.apiUrl + 'SeliveryByNextDate'
  printDeliveryURL = environment.apiUrl + 'PrintDelivery'

  GetDeliveryList(token: string): Observable<DeliveryModel[]> {
    return this.http.get<DeliveryModel[]>(this.getDeliveryListURL + `?token=${token}`)
  }
  NewDelivery(body: NewDeliveryModel): Observable<Status> {
    console.log(body)
    return this.http.post<Status>(this.newDeliveryURL, body)
  }
  DeleteDelivery(body: DeleteDeliveryModel): Observable<Status> {
    const params = new HttpParams()
      .set('token', body.token)
      .set('id', body.id)
    return this.http.delete<Status>(this.deleteDeliveryURL, { params })
  }
  UpdateDelivery(body: NewDeliveryModel): Observable<Status> {
    return this.http.put<Status>(this.updateDeliveryURL, body)
  }
  SearchDelivery(search: string): Observable<DeliveryModel[]> {
    return this.http.get<DeliveryModel[]>(this.searchDeliveryURL + `?search=${search}`)
  }
  DeliveryByDate(date: string): Observable<DeliveryModel[]> {
    return this.http.get<DeliveryModel[]>(this.deliveryByDateURL + `?date=${date}`)
  }
  SeliveryByNextDate(date: Date): Observable<DeliveryModel[]> {
    return this.http.get<DeliveryModel[]>(this.seliveryByNextDateURL + `?date=${date}`)
  }
  PrintDelivery(data: DeliveryModel[]) {
    return this.http.post(this.printDeliveryURL, data, { responseType: 'blob' })
  }
}
