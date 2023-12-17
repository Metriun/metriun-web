var EventBase = /** @class */ (function () {
    function EventBase(chart_id, plataformToken) {
        if (typeof chart_id !== "string") {
            throw new Error("chart_id must be a string");
        }
        if (typeof plataformToken !== "string") {
            throw new Error("plataformToken must be a string");
        }
        this.chart_id = chart_id;
        this.plataformToken = plataformToken;
    }
    EventBase.prototype.load = function () {
        //
    };
    EventBase.prototype.unload = function () {
        //
    };
    return EventBase;
}());
export default EventBase;
