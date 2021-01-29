interface IStock {
  value: string;
  label: string;
}

export interface IChartState {
  periodicity: "daily" | "weekly" | "monthly";
  stock: IStock | string;
  date: Date;
  investment: string;
}

export interface IChartFormProps {
  handleSimulate: (arg0: IChartState) => Promise<void>;
}

interface IChartArray {
  date: string;
  invested: number;
  investmentTotalBtc: number;
  investmentTotalStock: number;
}

export interface IChartApiResponse {
  chart: IChartArray[];
  symbol: string;
}
