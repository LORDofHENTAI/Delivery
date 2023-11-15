import { Component, OnInit } from '@angular/core';
import { DeliveryModel } from '../models/delivery.model';
import { formatDate } from '@angular/common';
import { DelvieryQuery } from '../state/delivery.query';
import { DeliveryStore } from '../state/delivery.store';
import { DeliveryService } from '../service/delivery.service';
import { filter, mergeMap, switchMap, take } from 'rxjs';
import { state } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryDialogComponent } from '../delivery-dialog/delivery-dialog.component';
import { DeleteDeliveryModel } from '../models/delete-delivery-model';
import { TokenService } from 'src/app/services/token/token.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {
  loading = false
  searchingRow: string
  tableColumns = ['Дата', 'Время', 'Тип доставки', 'Поставщик', 'Адрес загрузки', 'Адрес выгрузки', 'Кол-во полетомест, ВЕС', 'Зона доставки', 'Сумма доставки', 'Телефон клиента', 'Водитель', 'Примечание', '']
  deliverys: DeliveryModel[]
  selectedDate = new Date()
  nowFormatted: string

  messageNoConnect = 'Нет соединения, попробуйте позже.'
  messageFailLogin = 'Вход не разрешен, имя или пароль неверны.'
  messageStatusTrue = 'Ваша сообщение в обработке.'
  action = 'Ok'
  styleNoConnect = 'red-snackbar'

  constructor(
    private deliveryQuery: DelvieryQuery,
    private deliveryStore: DeliveryStore,
    private deliveryService: DeliveryService,
    private dialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    // this.deliveryQuery.getIsLoading().subscribe(res => this.loading = res)
    // this.deliveryQuery.getDelviery().subscribe(res => this.deliverys = res)
    // this.deliveryQuery.getLoaded().pipe(
    //   filter(res => !res),
    //   mergeMap(() => {
    //     this.deliveryStore.setLoading(true);

    //     return this.deliveryService.GetDeliveryList('dev')
    //   })
    // ).subscribe({
    //   next: res => {
    //     this.deliveryStore.update(state => {
    //       return {
    //         delivery: res
    //       };
    //     });
    //     this.deliveryStore.setLoading(false)
    //   },
    //   error: error => {
    //     console.log(error)
    //     this.deliveryStore.setLoading(false)
    //   }
    // });
    this.getDeliveryList()
  }
  getDeliveryList() {
    this.deliveryService.GetDeliveryList(this.tokenService.getToken()).subscribe({
      next: result => {
        this.deliverys = result
      },
      error: error => {
        console.log(error)
        this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      }
    })
  }
  search() {
    this.deliveryService.SearchDelivery(this.searchingRow).subscribe({
      next: result => {
        this.deliverys = result
      },
      error: error => {
        console.log(error)
        this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      }
    })
  }
  searchByDate() {

    this.deliveryService.DeliveryByDate(formatDate(this.selectedDate, 'dd.MM.yyyy', 'en-US')).subscribe({
      next: result => {
        console.log(result)
        this.deliverys = result
      },
      error: error => {
        console.log(error)
        this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeliveryDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case 'true':
          this.snackBar.openSnackBar('Запись добавлена', this.action, 'green-snackbar');
          this.getDeliveryList()
          break;
        case 'null':
          this.snackBar.openSnackBar('Ошибка отправления запроса', this.action, this.styleNoConnect);
          break;
        case 'BadAuth':
          this.snackBar.openSnackBar('Неверный логин', this.action, this.styleNoConnect);
          break;
        case 'error':
          this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
          break;
        default:
          break;
      }
    });
  }
  openUpdateDialog(element: DeliveryModel) {
    const dialogRef = this.dialog.open(DeliveryDialogComponent, {
      data: {
        update: element
      }
    })
    dialogRef.afterClosed().subscribe({
      next: result => {
        switch (result) {
          case 'true':
            this.snackBar.openSnackBar('Запись обновлена', this.action, 'green-snackbar');
            this.getDeliveryList()
            break;
          case 'null':
            this.snackBar.openSnackBar('Ошибка отправления запроса', this.action, this.styleNoConnect);
            break;
          case 'BadAuth':
            this.snackBar.openSnackBar('Неверный логин', this.action, this.styleNoConnect);
            break;
          case 'error':
            this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
            break;
          default:
            break;
        }
      }
    })
  }
  deleteOrder(id: any) {
    this.deliveryService.DeleteDelivery(new DeleteDeliveryModel(this.tokenService.getToken(), id)).subscribe({
      next: result => {
        switch (result.status) {
          case 'true':
            this.snackBar.openSnackBar('Запись удалена', this.action, 'green-snackbar');
            this.getDeliveryList()
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
        this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      }
    })
  }
  print() {
    this.deliveryService.PrintDelivery(this.deliverys).subscribe({
      next: result => {
        saveAs(result, 'Доставки')
      },
      error: error => {
        console.log(error)
        this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    })
  }
}
