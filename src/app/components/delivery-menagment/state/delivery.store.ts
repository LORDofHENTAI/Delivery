import { DeliveryModel } from "../models/delivery.model";
import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core"
export interface DeliveryState {
    delivery: DeliveryModel[]
    isLoaded: boolean
}

export const getInitialState = () => {
    return {
        delivery: [],
        isLoaded: false
    }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'delivery' })
export class DeliveryStore extends Store<DeliveryState>{
    constructor() {
        super(getInitialState())
    }
}