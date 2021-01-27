import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import dayjs from "dayjs";
import { IChartApiResponse, IChartState } from "./interfaces";
import { ChartForm } from "./ChartForm";
import api from "../../services/api";
import { Chart } from "./Chart";
import { Loader } from "../Loader";

interface ISimulation {
  loading: boolean;
  error: boolean;
  data: IChartApiResponse | undefined;
}

const checkAllData = ({ stock, investment }: IChartState): boolean =>
  stock !== "" && investment !== "";

export const ChartComparison: React.FC = () => {
  const [simulation, setSimulation] = useState<ISimulation>({
    loading: false,
    error: false,
    data: undefined,
  });

  const handleSimulate = async ({
    periodicity,
    investment,
    stock,
    date,
  }: IChartState) => {
    try {
      setSimulation({
        data: undefined,
        loading: true,
        error: false,
      });
      const { data } = await api.get<IChartApiResponse>("/finance/simulate", {
        params: {
          periodicity,
          investment,
          symbol: typeof stock === "string" ? stock : stock.value,
          start_date: dayjs(date).format("YYYY-MM-DD"),
        },
      });
      setSimulation({
        data,
        loading: false,
        error: false,
      });
    } catch (e) {
      setSimulation({
        data: undefined,
        loading: false,
        error: true,
      });
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <ChartForm handleSimulate={handleSimulate} />
      </Grid>
      {simulation.loading && (
        <Grid item xs={12}>
          <Loader>
            <Typography align="center">Loading chart</Typography>
          </Loader>
        </Grid>
      )}
      {simulation.data && (
        <Grid item xs={12}>
          <Chart
            invested={simulation.data.invested}
            stockTotal={simulation.data.stockTotal}
            btcTotal={simulation.data.btcTotal}
            chart={simulation.data.chart}
            symbol={simulation.data.symbol}
          />
        </Grid>
      )}
    </Grid>
  );
};
