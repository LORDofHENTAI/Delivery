import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';
import { HistoryModel } from '../models/history-models/history-models';
import { HistoryService } from '../services/history/history.service';
import { formatDate } from '@angular/common';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';


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
    private snackBar: SnackBarService
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

}
