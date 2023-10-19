import { Component, Inject, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';
import { HistoryModel } from '../models/history-models/history-models';
import { HistoryService } from '../services/history/history.service';
import { formatDate } from '@angular/common';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeliveryModel } from '../../delivery-menagment/models/delivery.model';


export interface ActionSetting {
  name: string,
  value: string
}
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  constructor(
    private historyService: HistoryService,
    private snackBar: SnackBarService,
    public dialog: MatDialog
  ) { }
  selectAction: ActionSetting[] = [
    { name: 'Все', value: 'all' },
    { name: 'Добавление', value: 'Insert' },
    { name: 'Удаление', value: 'Delete' },
    { name: 'Изменение', value: 'Update' },
  ]
  actionSelected: string
  filterDelivery: ActionSetting[] = [
    { name: 'Пользователь', value: 'User' },
    { name: 'Адрес доставки', value: 'Adress' },
    { name: 'Водитель', value: 'Driver' },
    { name: 'Номер телефона клиента', value: 'ClientPhone' },
  ]
  messageNoConnect = 'Нет соединения, попробуйте позже.'
  messageFailLogin = 'Вход не разрешен, имя или пароль неверны.'
  messageStatusTrue = 'Ваша сообщение в обработке.'
  action = 'Ok'
  styleNoConnect = 'red-snackbar'
  selectedFilter: string
  input: string
  selectedAction: string
  historyList: HistoryModel[]
  selectedDate: Date = new Date()
  searchByDate: boolean = true;

  ngOnInit(): void {
  }


  getLogs() {
    if (this.searchByDate === true) {
      if (!this.input) {
        this.getLogsByActionAndDate()
      } else {
        this.getLogsBySearchInputWithDate()
      }
    } else {
      if (!this.input) {
        this.getLogsByAction()
      } else {
        this.getLogsBySearchInput()
      }
    }

  }

  getLogsByAction() {
    this.historyService.GetLogs(this.actionSelected).subscribe({
      next: result => {
        this.historyList = result
        console.log(this.historyList)
      },
      error: error => {
        console.log(error)
        this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    })
  }

  getLogsByActionAndDate() {
    console.log(this.selectedAction)
    this.historyService.GetLogsByDate(formatDate(this.selectedDate, 'dd.MM.yyyy', 'en-US'), this.actionSelected).subscribe({
      next: result => {
        this.historyList = result
        console.log(this.historyList)
      },
      error: error => {
        console.log(error)
        this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    })
  }

  getLogsBySearchInput() {
    this.historyService.GetLogsBySearch(this.input, this.selectedFilter, this.actionSelected, null).subscribe({
      next: result => {
        this.historyList = result
        console.log(this.historyList)
      },
      error: error => {
        console.log(error)
        this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    })
  }
  getLogsBySearchInputWithDate() {
    this.historyService.GetLogsBySearch(this.input, this.selectedFilter, this.actionSelected, formatDate(this.selectedDate, 'dd.MM.yyyy', 'en-US')).subscribe({
      next: result => {
        this.historyList = result
        console.log(this.historyList)
      },
      error: error => {
        console.log(error)
        this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    })
  }
  openDialog(element: HistoryModel) {
    const dialogRef = this.dialog.open(HistoryDialog, {
      data: {
        detail: element
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }
    );
  }
}

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history.dialog.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryDialog implements OnInit {
  columnNames: string[] = ['Дата доставки', 'Время доставки', 'Тип доставки', 'Поставщик', 'Адрес выгрузки', 'Адрес загрузки', 'Вес, кол-во', 'Зона доставки', 'Сумма доставки', 'Телефон', 'Водитель', 'Комментарий']
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  newData: DeliveryModel
  oldData: DeliveryModel
  ngOnInit(): void {
    this.newData = this.data.detail.newData
    this.oldData = this.data.detail.oldData
  }


}
