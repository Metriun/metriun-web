interface graphic_values {
  [key: string]: string[];
}

export interface getChart {
  chart: {
    token: string;
    name: string;
    type: string;
    titles: string[];
    fails: 0;
    ms: 0;
    requests: 0;
    graphic_values: graphic_values;
  };
}

export interface sendChart {
  message: string;
  chart: {
    id: number;
    token: string;
    name: string;
    type: string;
    titles: string[];
    fails: 0;
    ms: 0;
    requests: 0;
    graphic_values: graphic_values;
  };
}
