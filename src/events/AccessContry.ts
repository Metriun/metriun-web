import Chart from "../Chart.js";
import { getChart } from "../types/Requests.js";
import EventBase from "./EventBase.js";

export default class AccessContry extends EventBase {
  constructor(chart_id: string, plataformToken: string) {
    super(chart_id, plataformToken);
    this.callback = this.callback.bind(this);
  }

  private createCookie() {
    const expire = new Date();
    expire.setTime(expire.getTime() + 24 * 60 * 60 * 1000);
    const expires = "expires=" + expire.toUTCString();
    document.cookie = "x08192=true;" + expires + ";path=/";
  }

  private getCookie() {
    const name = "x08192=";
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

  private contry(callback: (contry: string) => unknown) {
    const ipinfoApiUrl = "https://api.country.is/";

    fetch(ipinfoApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const country = data.country;
        callback(country);
      })
      .catch(() => {});
  }

  private getInfos(chart: getChart, fragment: string, contry: string) {
    const access = chart.chart.graphic_values[fragment];

    let count = 1;
    if (access && access.length > 0) {
      access.forEach((value) => {
        if (String(value[0]) === contry) {
          count += Number(value[1]);
        }
      });
    }

    return count;
  }

  private async callback() {
    if (!this.getCookie()) {
      this.contry(async (contry) => {
        const chart = await Chart.getChart(this.chart_id, this.plataformToken);
        if (chart) {
          const date = new Date();
          const year = date.getFullYear();
          const fragment = `${year}`;
          const count = this.getInfos(chart, fragment, contry);
          const data = [String(contry), String(count)];

          this.createCookie();
          await Chart.setChart(
            this.chart_id,
            this.plataformToken,
            data,
            fragment,
            `${contry}`
          );
        }
      });
    }
  }

  load() {
    window.addEventListener("load", this.callback);
  }

  unload() {
    window.removeEventListener("load", this.callback);
  }
}
