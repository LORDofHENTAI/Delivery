import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryModel } from '../models/delivery.model';
import { Status } from '../models/Status';
import { NewDeliveryModel } from '../models/new-deliver-model';
import { DeleteDeliveryModel } from '../models/delete-delivery-model';

@Injectable({ providedIn: 'root' })
export class DeliveryService {

  constructor(private http: HttpClient) { }

  baseURL = 'http://192.168.1.21:5239/'

  getDeliveryListURL = this.baseURL + 'GetDeliveryList'
  newDeliveryURL = this.baseURL + 'NewDelivery'
  deleteDeliveryURL = this.baseURL + 'DeleteDelivery'
  updateDeliveryURL = this.baseURL + 'UpdateDelivery'
  searchDeliveryURL = this.baseURL + 'SearchDelivery'
  deliveryByDateURL = this.baseURL + 'DeliveryByDate'
  seliveryByNextDateURL = this.baseURL + 'SeliveryByNextDate'

  GetDeliveryList(token: string): Observable<DeliveryModel[]> {
    return this.http.get<DeliveryModel[]>(this.getDeliveryListURL + `?token=${token}`)
  }
  NewDelivery(body: NewDeliveryModel): Observable<Status> {
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
  DeliveryByDate(date: Date): Observable<DeliveryModel[]> {
    return this.http.get<DeliveryModel[]>(this.searchDeliveryURL + `?date=${date}`)
  }
  SeliveryByNextDate(date: Date): Observable<DeliveryModel[]> {
    return this.http.get<DeliveryModel[]>(this.searchDeliveryURL + `?date=${date}`)
  }

}
