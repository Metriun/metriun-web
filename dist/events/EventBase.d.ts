export default class EventBase {
    protected chart_id: string;
    protected plataformToken: string;
    constructor(chart_id: string, plataformToken: string);
    load(): void;
    unload(): void;
}
