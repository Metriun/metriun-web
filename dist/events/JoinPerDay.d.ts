import EventBase from "./EventBase.js";
export default class JoinPerDay extends EventBase {
    constructor(chart_id: string, plataformToken: string);
    private createCookie;
    private getCookie;
    private getInfos;
    private callback;
    load(): void;
    unload(): void;
}
