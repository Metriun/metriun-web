export default class EventBase {
  protected chart_id: string;
  protected plataformToken: string;

  constructor(chart_id: string, plataformToken: string) {
    if (typeof chart_id !== "string") {
      throw new Error("chart_id must be a string");
    }

    if (typeof plataformToken !== "string") {
      throw new Error("plataformToken must be a string");
    }

    this.chart_id = chart_id;
    this.plataformToken = plataformToken;
  }

  load() {
    //
  }

  unload() {
    //
  }
}
