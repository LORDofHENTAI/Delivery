export class SettingsModel {
    constructor(
        public id: string,
        public settingName: string,
        public settingValue: string[] = []
    ) { }
}