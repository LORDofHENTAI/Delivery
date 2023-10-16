import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs'
import { HistoryModel } from '../../models/history-models/history-models';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private http: HttpClient,
  ) { }
  getLogsURL = environment.apiUrl + 'GetHistory'
  getLogsByDateURL = environment.apiUrl + 'GetLogsByDate'
  getLogsBySearchURL = environment.apiUrl + 'GetSearchingHistory'

  GetLogs(data: string): Observable<HistoryModel[]> {
    return this.http.get<HistoryModel[]>(this.getLogsURL + `?actionType=${data}`)
  }
  GetLogsByDate(date: string, action: string): Observable<HistoryModel[]> {
    return this.http.get<HistoryModel[]>(this.getLogsByDateURL + `?searchingDate=${date}&actionType=${action}`)
  }
  GetLogsBySearch(item: string, filter: string, action: string, date: string | null) {
    return this.http.get<HistoryModel[]>(this.getLogsBySearchURL + `?searchItem=${item}&filterCretary=${filter}&searchingDate=${date}&actionType=${action}`)
  }
}
