import { getChart } from "./types/Requests.js";

async function getChart(
  chartId: string,
  plataformToken: string
): Promise<getChart | null> {
  const options = {
    headers: {
      Authorization: `Bearer ${plataformToken}`,
    },
  };

  try {
    const data = await fetch(
      `https://metriun.com/api/charts/${chartId}`,
      options
    );
    const response = await data.json();
    return response;
  } catch (error) {
    return null;
  }
}

async function setChart(
  chartId: string,
  plataformToken: string,
  data: string[],
  fragment: string,
  change?: string
) {
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${plataformToken}`,
    },
    body: JSON.stringify({
      time: Date.now(),
      data: data,
      fragment: fragment,
      change: change,
    }),
  };

  try {
    const data = await fetch(
      `https://metriun.com/api/charts/${chartId}/send`,
      options
    );
    const response = await data.json();
    return response;
  } catch (error) {
    return null;
  }
}

export default {
  getChart,
  setChart,
};
