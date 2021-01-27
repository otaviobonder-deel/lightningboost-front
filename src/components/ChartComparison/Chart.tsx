import React from "react";
import {
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Line,
} from "recharts";
import dayjs from "dayjs";
import { IChartApiResponse } from "./interfaces";
import Currency from "../../utils/Currency";

const formatDate = (tickItem: string): string =>
  dayjs(tickItem).format("MMM Do YY");

const formatYAxis = (tickItem: number): string =>
  Currency(tickItem, { symbol: "$", precision: 0 }).format();

const formatTooltip = (value: number): string =>
  Currency(value, { symbol: "$", precision: 0 }).format();

export const Chart: React.FC<IChartApiResponse> = ({
  invested,
  btcTotal,
  stockTotal,
  chart,
  symbol,
}) => (
  <ResponsiveContainer height={400}>
    <ComposedChart data={chart}>
      <defs>
        <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ff9500" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#ff9500" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#00a1e4" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#00a1e4" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="date" tickFormatter={formatDate} />
      <YAxis tickFormatter={formatYAxis} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip formatter={formatTooltip} labelFormatter={formatDate} />
      <Area
        dataKey="investmentTotalBtc"
        name="Total amount in BTC"
        type="monotone"
        stroke="#ff9500"
        fillOpacity={1}
        fill="url(#colorBtc)"
      />
      <Area
        name={`Total amount in ${symbol}`}
        type="monotone"
        dataKey="investmentTotalStock"
        stroke="#00a1e4"
        fillOpacity={1}
        fill="url(#colorStock)"
      />
      <Line
        name="Total invested in $"
        dataKey="invested"
        type="monotone"
        stroke="#ff0000"
        dot={false}
      />
    </ComposedChart>
  </ResponsiveContainer>
);
