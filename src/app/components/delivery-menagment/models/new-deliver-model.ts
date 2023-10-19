import { DeliveryModel } from "./delivery.model";
export class NewDeliveryModel {
    constructor(
        public token: string,
        public date: string,
        public deliveryModel: DeliveryModel
    ) { }
}