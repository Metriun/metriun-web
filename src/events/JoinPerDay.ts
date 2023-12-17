import Chart from "../Chart.js";
import { getChart } from "../types/Requests.js";
import EventBase from "./EventBase.js";

export default class JoinPerDay extends EventBase {
  constructor(chart_id: string, plataformToken: string) {
    super(chart_id, plataformToken);
    this.callback = this.callback.bind(this);
  }

  private createCookie() {
    const expire = new Date();
    expire.setTime(expire.getTime() + 24 * 60 * 60 * 1000);
    const expires = "expires=" + expire.toUTCString();
    document.cookie = "x0631=true;" + expires + ";path=/";
  }

  private getCookie() {
    const name = "x0631=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) == " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return undefined;
  }

  private getInfos(chart: getChart, fragment: string) {
    const date = new Date();
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const access = chart.chart.graphic_values[fragment];

    let count = 1;
    if (access && access.length > 0) {
      access.forEach((value) => {
        if (String(value[0]) === String(day)) {
          count += Number(value[1]);
        }
      });
    }

    return count;
  }

  private async callback() {
    if (!this.getCookie()) {
      const chart = await Chart.getChart(this.chart_id, this.plataformToken);
      if (chart) {
        const date = new Date();
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const mounth =
          date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
        const year = date.getFullYear();
        const fragment = `${mounth}/${year}`;
        const count = this.getInfos(chart, fragment);
        const data = [String(day), String(count)];

        this.createCookie();
        await Chart.setChart(
          this.chart_id,
          this.plataformToken,
          data,
          fragment,
          `${day}`
        );
      }
    }
  }

  load() {
    window.addEventListener("load", this.callback);
  }

  unload() {
    window.removeEventListener("load", this.callback);
  }
}
