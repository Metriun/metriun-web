import EventBase from "./EventBase.js";
type fragmentType = "day" | "mounth" | "year";
export default class ClientsDevices extends EventBase {
    fragmentType: fragmentType;
    constructor(chart_id: string, plataformToken: string, ft: fragmentType);
    private createCookie;
    private getCookie;
    private getPlatform;
    private getFragment;
    private getInfos;
    private callback;
    load(): void;
    unload(): void;
}
export {};
