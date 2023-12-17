import Chart from "../Chart.js";
import { getChart } from "../types/Requests.js";
import EventBase from "./EventBase.js";

type fragmentType = "day" | "mounth" | "year";
export default class ClientsDevices extends EventBase {
  fragmentType: fragmentType;

  constructor(chart_id: string, plataformToken: string, ft: fragmentType) {
    super(chart_id, plataformToken);

    if (typeof ft !== "string") {
      throw new Error("fragmentType must be a string");
    }

    this.fragmentType = ft;
    this.callback = this.callback.bind(this);
  }

  private createCookie() {
    const expire = new Date();
    expire.setTime(expire.getTime() + 24 * 60 * 60 * 1000);
    const expires = "expires=" + expire.toUTCString();
    document.cookie = "x06934=true;" + expires + ";path=/";
  }

  private getCookie() {
    const name = "x06934=";
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

  private getPlatform(): string {
    const userAgent = window.navigator.userAgent;

    if (/Android/.test(userAgent)) {
      return "Android";
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
      return "iOS";
    } else if (/Mac/.test(userAgent)) {
      return "Mac";
    } else if (/Win/.test(userAgent)) {
      return "Windows";
    } else if (/Linux/.test(userAgent)) {
      return "Linux";
    } else {
      return "Unknown";
    }
  }

  private getFragment() {
    const date = new Date();

    const MOUNTHS = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    function getCompleteDate(date: Date) {
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const mounth =
        date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
      const year = date.getFullYear();
      return `${mounth}/${year}`;
    }

    switch (this.fragmentType) {
      case "day":
        return getCompleteDate(date);
      case "mounth":
        return MOUNTHS[date.getMonth() - 1] ?? "Janeiro";
      case "year":
        return String(date.getFullYear());
      default:
        return getCompleteDate(date);
    }
  }

  private getInfos(chart: getChart) {
    const plataform = this.getPlatform();
    const access = chart.chart.graphic_values[this.getFragment()];

    let count = 1;

    if (access && access.length > 0) {
      access.forEach((value) => {
        if (value[0] === plataform) {
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
        const plataform = this.getPlatform();
        const count = this.getInfos(chart);
        const data = [plataform, String(count)];

        this.createCookie();
        await Chart.setChart(
          this.chart_id,
          this.plataformToken,
          data,
          this.getFragment(),
          `${plataform}`
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
