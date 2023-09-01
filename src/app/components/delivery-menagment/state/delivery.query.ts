import { Query } from "@datorama/akita/src/lib";
import { DeliveryState, DeliveryStore } from "./delivery.store";
import { state } from "@angular/animations"
import { Observable } from "rxjs";
import { DeliveryModel } from "../models/delivery.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DelvieryQuery extends Query<DeliveryState>{
    constructor(private delivery: DeliveryStore) {
        super(delivery);
    }

    getDelviery(): Observable<DeliveryModel[]> {
        return this.select(state => state.delivery)
    }
    getLoaded(): Observable<boolean> {
        return this.select(state => state.isLoaded)
    }
    getIsLoading(): Observable<boolean> {
        return this.selectLoading()
    }

}