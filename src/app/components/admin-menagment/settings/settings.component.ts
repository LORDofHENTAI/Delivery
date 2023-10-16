import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';
import { SettingsService } from '../services/setting/settings.service';
import { SettingsModel } from '../models/settings-models/setting-model';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { UpdateSettingModel } from '../models/settings-models/update-setting.model';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(
    private settingService: SettingsService,
    private token: TokenService,
    private snackBar: SnackBarService
  ) { }
  messageNoConnect = 'Нет соединения, попробуйте позже.'
  messageFailLogin = 'Вход не разрешен, имя или пароль неверны.'
  messageStatusTrue = 'Ваша сообщение в обработке.'
  action = 'Ok'
  styleNoConnect = 'red-snackbar'

  ngOnInit(): void {
    this.getSettingList()
  }

  setting: SettingsModel = { id: '', settingName: '', settingValue: [] }
  settingList: SettingsModel[] = []
  selectedSettingValue: string
  newValue: string

  selectSetting(element: SettingsModel) {
    this.setting = element
  }

  selectValue(element: string) {
    this.selectedSettingValue = element
  }

  getSettings(element: string) {
    this.settingService.GetSetting(element).subscribe({
      next: result => {
        this.setting = result
      },
      error: error => {
        console.log(error)
        this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    })
  }

  getSettingList() {
    this.settingService.GetSettingList().subscribe({
      next: result => {
        this.settingList = result
      },
      error: error => {
        console.log(error)
        this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    })
  }

  deleteSettingValue() {
    let i = 0
    for (let index = 0; index < this.setting.settingValue.length; index++) {
      if (this.setting.settingValue[index] === this.selectedSettingValue)
        i = index
    }

    this.setting.settingValue.splice(i, 1)
    this.updateSetting()
  }

  addSettingValue() {
    this.setting.settingValue.push(this.newValue)
    this.updateSetting()
  }

  updateSetting() {
    this.settingService.UpdateSetting(new UpdateSettingModel(this.token.getToken(), this.setting)).subscribe({
      next: result => {
        switch (result.status) {
          case 'true':
            this.snackBar.openSnackBar('Запись обнавлена', this.action, 'green-snackbar');
            this.getSettingList()
            break;
          case 'null':
            this.snackBar.openSnackBar('Ошибка отправления запроса', this.action, this.styleNoConnect);
            break;
          case 'BadAuth':
            this.snackBar.openSnackBar('Неверный логин', this.action, this.styleNoConnect);
            break;
          default:
            break;
        }
      },
      error: error => {
        console.log(error)
        this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    })
  }
}
