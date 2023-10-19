export class DeliveryModel {
    constructor(
        public id: string,
        public deliveryDate?: Date,
        public deliveryTime?: number,
        public deliveryType?: string,
        public provider?: string,
        public downloadAdress?: string,
        public uploadAdress?: string,
        public count_Weight?: string,
        public deliveryZone?: string,
        public deliverySum?: number,
        public clientPhone?: string,
        public driver?: string,
        public comment?: string
    ) { }
}