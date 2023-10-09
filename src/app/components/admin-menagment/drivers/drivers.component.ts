import { Component, OnInit } from '@angular/core';
import { DriversService } from '../services/drivers/drivers.service';
import { TokenService } from 'src/app/services/token/token.service';
import { DriversModel } from '../models/driver-models/drivers.model';
import { AddDriverModel } from '../models/driver-models/add-driver.model';
import { DeleteDriverModel } from '../models/driver-models/delete-driver.model';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { UpdateDriverModel } from '../models/driver-models/update-drivers-model';
import { timeout } from 'rxjs'
export interface MonthList {
  monthName: string,
  monthNumber: number
}
@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  constructor(
    private driverService: DriversService,
    private tokenService: TokenService,
    private snakBar: SnackBarService
  ) { }
  selectedMonth: number = new Date().getMonth() + 1
  monthList: MonthList[] = [
    { monthName: 'Январь', monthNumber: 1 },
    { monthName: 'Февраль', monthNumber: 2 },
    { monthName: 'Март', monthNumber: 3 },
    { monthName: 'Апрель', monthNumber: 4 },
    { monthName: 'Май', monthNumber: 5 },
    { monthName: 'Июнь', monthNumber: 6 },
    { monthName: 'Июль', monthNumber: 7 },
    { monthName: 'Август', monthNumber: 8 },
    { monthName: 'Сентябрь', monthNumber: 9 },
    { monthName: 'Октябрь', monthNumber: 10 },
    { monthName: 'Ноябрь', monthNumber: 11 },
    { monthName: 'Декабрь', monthNumber: 12 },
  ]
  driverList: DriversModel[]
  newDriver: string
  daysCount: number[] = []
  messageNoConnect = 'Нет соединения, попробуйте позже.'
  messageFailLogin = 'Вход не разрешен, имя или пароль неверны.'
  messageStatusTrue = 'Ваша сообщение в обработке.'
  action = 'Ok'
  styleNoConnect = 'red-snackbar'

  selectedDriver: string
  ngOnInit(): void {
    this.getDriverList()
    this.getTable()
  }

  getDriverList() {
    this.driverService.GetDrivers(this.tokenService.getToken(), this.selectedMonth).subscribe({
      next: result => {
        this.driverList = result
      },
      error: error => {
        console.log(error)
        this.snakBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    })
  }
  getTable() {
    let daysCount = new Date(new Date().getFullYear(), this.selectedMonth, 0).getDate()
    for (let index = 1; index <= daysCount; index++) {
      this.daysCount.push(index)
    }
  }
  trackByFn(index: any, item: any) {
    return index;
  }
  selectDriver(event: string) {
    this.selectedDriver = event
  }
  addDriver() {
    this.driverService.AddDrivers(new AddDriverModel(this.tokenService.getToken(), this.newDriver, this.selectedMonth)).subscribe({
      next: result => {
        this.getDriverList()
        switch (result.status) {
          case 'true':
            this.snakBar.openSnackBar('Запись удалена', this.action, 'green-snackbar');
            break;
          case 'null':
            this.snakBar.openSnackBar('Ошибка отправления запроса', this.action, this.styleNoConnect);
            break;
          case 'BadAuth':
            this.snakBar.openSnackBar('Неверный логин', this.action, this.styleNoConnect);
            break;
          default:
            break;
        }
      },
      error: error => {
        console.log(error)
        this.snakBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    })
  }
  deleteDriver() {
    this.driverService.DeleteDrivers(new DeleteDriverModel(this.tokenService.getToken(), this.selectedMonth, this.selectedDriver)).subscribe({
      next: result => {
        this.getDriverList()
        switch (result.status) {
          case 'true':
            this.snakBar.openSnackBar('Запись удалена', this.action, 'green-snackbar');
            break;
          case 'null':
            this.snakBar.openSnackBar('Ошибка отправления запроса', this.action, this.styleNoConnect);
            break;
          case 'BadAuth':
            this.snakBar.openSnackBar('Неверный логин', this.action, this.styleNoConnect);
            break;
          default:
            break;
        }
      },
      error: error => {
        console.log(error)
        this.snakBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      }
    })
  }

  editDriver(element: DriversModel) {
    this.driverService.UpdateDrivers(new UpdateDriverModel(this.tokenService.getToken(), this.selectedMonth, element)).subscribe({
      next: result => {
        this.getDriverList
        switch (result.status) {
          case 'true':
            this.snakBar.openSnackBar('Запись обновлена', this.action, 'green-snackbar');
            break;
          case 'null':
            this.snakBar.openSnackBar('Ошибка отправления запроса', this.action, this.styleNoConnect);
            break;
          case 'BadAuth':
            this.snakBar.openSnackBar('Неверный логин', this.action, this.styleNoConnect);
            break;
          default:
            break;
        }
      },
      error: error => {
        console.log(error)
        this.snakBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      }
    })
  }
}
