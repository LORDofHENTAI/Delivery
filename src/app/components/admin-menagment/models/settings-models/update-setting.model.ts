import { SettingsModel } from "./setting-model";

export class UpdateSettingModel {
    constructor(
        public token: string,
        public settings: SettingsModel
    ) { }
}