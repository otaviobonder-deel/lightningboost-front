import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { IChartApiResponse, IChartState } from "./interfaces";
import { ChartForm } from "./ChartForm";
import api from "../../services/api";
import { Chart } from "./Chart";
import { Loader } from "../Loader";
import { useQuery } from "../../hooks/useQuery";
import { StockComparator } from "../StockComparator";

interface ISimulation {
  loading: boolean;
  error: boolean;
  data: IChartApiResponse | undefined;
}

export const ChartComparison: React.FC = () => {
  const history = useHistory();
  const [simulation, setSimulation] = useState<ISimulation>({
    loading: false,
    error: false,
    data: undefined,
  });

  const query = useQuery();

  useEffect(() => {
    const stock = query.get("stock");
    const investment = query.get("investment");
    const periodicity = query.get("periodicity");
    const date = query.get("date");
    if (
      stock !== null &&
      stock !== "" &&
      investment !== null &&
      investment !== "" &&
      periodicity !== null &&
      (periodicity === "daily" ||
        periodicity === "monthly" ||
        periodicity === "weekly") &&
      date !== null &&
      dayjs(date).isValid()
    ) {
      handleSimulate({ stock, periodicity, investment, date: new Date(date) });
    }
    // eslint-disable-next-line
  }, []);

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
      history.push({
        pathname: "/comparison",
        search: `?stock=${
          typeof stock === "string" ? stock : stock.value
        }&investment=${investment}&periodicity=${periodicity}&date=${dayjs(
          date
        ).format("YYYY-MM-DD")}`,
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
          <StockComparator
            amountBitcoin={simulation.data.btcTotal}
            totalBitcoin={
              simulation.data.chart[simulation.data.chart.length - 1]
                .investmentTotalBtc
            }
            profitBitcoin={
              simulation.data.chart[simulation.data.chart.length - 1]
                .investmentTotalBtc /
                simulation.data.invested -
              1
            }
            invested={simulation.data.invested}
            stock={simulation.data.symbol}
            amountStock={simulation.data.stockTotal}
            totalStock={
              simulation.data.chart[simulation.data.chart.length - 1]
                .investmentTotalStock
            }
            profitStock={
              simulation.data.chart[simulation.data.chart.length - 1]
                .investmentTotalStock /
                simulation.data.invested -
              1
            }
          />
        </Grid>
      )}
    </Grid>
  );
};
