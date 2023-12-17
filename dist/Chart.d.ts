import { getChart } from "./types/Requests.js";
declare function getChart(chartId: string, plataformToken: string): Promise<getChart | null>;
declare function setChart(chartId: string, plataformToken: string, data: string[], fragment: string, change?: string): Promise<any>;
declare const _default: {
    getChart: typeof getChart;
    setChart: typeof setChart;
};
export default _default;
