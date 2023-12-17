import EventBase from "./EventBase.js";
export default class AccessContry extends EventBase {
    constructor(chart_id: string, plataformToken: string);
    private createCookie;
    private getCookie;
    private contry;
    private getInfos;
    private callback;
    load(): void;
    unload(): void;
}
