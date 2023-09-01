import { DriversModel } from "./drivers.model";

export class UpdateDriverModel {
    constructor(
        public token: string,
        public month: number,
        public drivers: DriversModel
    ) { }
}