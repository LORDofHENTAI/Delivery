import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs'
import { SettingsModel } from '../../models/settings-models/setting-model';
import { UpdateSettingModel } from '../../models/settings-models/update-setting.model';
import { Status } from 'src/app/models/status';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  GetSettingURL = environment.apiUrl + 'GetSetting'
  GetSettingListURL = environment.apiUrl + 'GetSettingList'
  UpdateSettingURL = environment.apiUrl + 'UpdateSetting'

  GetSetting(data: string): Observable<SettingsModel> {
    return this.http.get<SettingsModel>(this.GetSettingURL + `?settingName=${data}`)
  }
  GetSettingList(): Observable<SettingsModel[]> {
    return this.http.get<SettingsModel[]>(this.GetSettingListURL)
  }
  UpdateSetting(data: UpdateSettingModel): Observable<Status> {
    console.log(data)
    return this.http.put<Status>(this.UpdateSettingURL, data)
  }
}
