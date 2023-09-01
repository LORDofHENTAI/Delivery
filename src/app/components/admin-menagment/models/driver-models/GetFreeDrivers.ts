export class DelvieryTime {
    constructor(
        public time: number,
        public drivers: FreeDrivers[]
    ) { }
}
export class FreeDrivers {
    public driver: string
}