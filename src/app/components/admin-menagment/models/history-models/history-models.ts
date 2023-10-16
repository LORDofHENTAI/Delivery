import { DeliveryModel } from "src/app/components/delivery-menagment/models/delivery.model";

export class HistoryModel {
    constructor(
        public Id: string,
        public action: string,
        public actionDate: Date,
        public user: string,
        public newData: DeliveryModel,
        public oldData: DeliveryModel
    ) { }
}