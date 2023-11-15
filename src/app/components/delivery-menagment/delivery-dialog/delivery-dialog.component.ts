import { Component, OnInit, Inject } from '@angular/core';
import { DriversService } from '../../admin-menagment/services/drivers/drivers.service';
import { formatDate } from '@angular/common';
import { DelvieryTime } from '../../admin-menagment/models/driver-models/GetFreeDrivers';
import { DeliveryDateFilterModel } from 'src/app/models/DeliveryDateFilterModel';
import { SettingsService } from '../../admin-menagment/services/setting/settings.service';
import { SettingsModel } from '../../admin-menagment/models/settings-models/setting-model';
import { DeliveryService } from '../service/delivery.service';
import { DeliveryModel } from '../models/delivery.model';
import { NewDeliveryModel } from '../models/new-deliver-model';
import { TokenService } from 'src/app/services/token/token.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface SpanSetting {
  id: number,
  class: string
}

@Component({
  selector: 'app-delivery-dialog',
  templateUrl: './delivery-dialog.component.html',
  styleUrls: ['./delivery-dialog.component.scss']
})
export class DeliveryDialogComponent implements OnInit {
  deliveryId: string = ''
  carsFree: number = 0
  foods: string[] = ['test', 'tester']
  selectedDate = new Date()
  nowFormatted: string;
  timeSlider: number = 9
  deliveryTime: DelvieryTime[]
  freeDrivers: string[] = []
  selectedDriver: string
  spanSetting: SpanSetting[] = []

  deliveryType: string[]
  selectDelivery: string
  storeType: string[]
  selectStore: string

  adressDownload: string
  adressUpload: string
  provider: string
  count: string
  deliveryZone: string
  deliverySum: number
  phoneNumber: string
  comment: string
  constructor(
    private driverService: DriversService,
    private settingService: SettingsService,
    private deliveryService: DeliveryService,
    private tokenService: TokenService,
    public dialogRef: MatDialogRef<DeliveryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  logo: string = 'Добавление'
  buttonText: string = 'Добавить'
  delivery: DeliveryModel
  ngOnInit(): void {
    if (this.data) {
      this.logo = 'Изменение'
      this.buttonText = 'Изменить'
      this.selectedDate = this.data.update.deliveryDate
      this.timeSlider = this.data.update.deliveryTime
      this.selectDelivery = this.data.update.deliveryType
      this.adressDownload = this.data.update.adressDownload
      this.provider = this.data.update.provider
      this.deliveryZone = this.data.update.deliveryZone
      this.phoneNumber = this.data.update.clientPhone
      this.selectStore = this.data.update.downloadAdress
      this.adressUpload = this.data.update.uploadAdress
      this.count = this.data.update.count_Weight
      this.selectedDriver = this.data.update.driver
      this.deliverySum = this.data.update.deliverySum
      this.comment = this.data.update.comment
      this.deliveryId = this.data.update.id
      this.delivery = this.data.update
    }
    this.GetFreeDrivers()
    this.getSettings()
  }

  GetFreeDrivers() {
    this.freeDrivers = []
    this.nowFormatted = formatDate(this.selectedDate, 'dd.MM.yyyy', 'en-US');
    this.driverService.GetFreeDrivers(this.nowFormatted).subscribe({
      next: result => {
        this.deliveryTime = result
        this.deliveryTime.forEach(element => {
          if (element.time === this.timeSlider) {
            element.drivers.forEach(element => {
              this.freeDrivers.push(element.driver)
            });
          }
        });
        this.carsFree = this.freeDrivers.length
        this.GetSpans()
      },
      error: error => {
        console.log(error);
      }
    })
  }

  GetSpans() {
    this.spanSetting = []
    let flag = false
    this.deliveryTime.forEach(element => {

      switch (element.drivers.length) {
        case 0:
          if (flag != true) {
            this.spanSetting.push({ id: element.time, class: 'red' })
            this.spanSetting.push({ id: element.time + 1, class: 'orange' })
            flag = true
          } else flag = false
          break;
        case 1:
          if (flag != true) {
            this.spanSetting.push({ id: element.time, class: 'blue' })
          } else
            flag = false
          break;
        default:
          if (flag != true) {
            this.spanSetting.push({ id: element.time, class: 'green' })
          } else
            flag = false
          break;
      }
    })
  }

  makeOrange(element: boolean) {
    element = true
  }

  getSettings() {
    this.settingService.GetSetting('DeliveryType').subscribe({
      next: result => {
        if (result)
          this.deliveryType = result.settingValue
      },
      complete: () => {
        this.settingService.GetSetting('StoreList').subscribe({
          next: result => {
            this.storeType = result.settingValue
          },
          error: error => {
            console.log(error)
          }
        })
      },
      error: error => {
        console.log(error)
      }

    })
  }
  CreateDeliveryOrder() {
    this.nowFormatted = formatDate(this.selectedDate, 'dd.MM.yyyy', 'en-US');
    const deliveryModel = new DeliveryModel(this.deliveryId, this.selectedDate, this.timeSlider, this.selectDelivery, this.provider, this.selectStore, this.adressUpload, this.count, this.deliveryZone, this.deliverySum, this.phoneNumber, this.selectedDriver, this.comment)
    if (this.data) {

      this.deliveryService.UpdateDelivery(new NewDeliveryModel(this.tokenService.getToken(), this.nowFormatted, deliveryModel)).subscribe({
        next: result => {
          switch (result.status) {
            case 'true':
              this.dialogRef.close('true');
              break;
            case 'null':
              this.dialogRef.close('null');
              break;
            case 'BadAuth':
              this.dialogRef.close('true');
              break;
            default:
              break;
          }
        },
        error: error => {
          console.log(error);
          this.dialogRef.close('error');
        }
      })
    }
    else {
      this.deliveryService.NewDelivery(new NewDeliveryModel(this.tokenService.getToken(), this.nowFormatted, deliveryModel)).subscribe({
        next: result => {
          switch (result.status) {
            case 'true':
              this.dialogRef.close('true');
              break;
            case 'null':
              this.dialogRef.close('null');
              break;
            case 'BadAuth':
              this.dialogRef.close('true');
              break;
            default:
              break;
          }
        },
        error: error => {
          console.log(error)
          this.dialogRef.close('error');
        }
      })
    }
  }
}
