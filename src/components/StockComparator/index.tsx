import React from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import Currency from "../../utils/Currency";
import { IProps, IResult } from "./interfaces";
import bitcoin from "../../assets/bitcoin.svg";
import stocks from "../../assets/stocks.svg";

const useStyles = makeStyles({
  container: {
    margin: "20px 0",
    padding: 10,
  },
  title: {
    fontWeight: 800,
  },
});

const Result: React.FC<IResult> = ({
  image,
  stock,
  amount,
  type,
  total,
  profit,
  invested,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2}>
          <img src={image} alt="logo" width={48} />
        </Grid>
        <Grid item xs={10} container spacing={1}>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h6">
              Investing in {stock}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>
              You would have accumulated{" "}
              {Currency(amount, { precision: 4 }).format()} {type}
            </Typography>
            <Typography gutterBottom>
              This would value {Currency(total, { symbol: "$" }).format()}
            </Typography>
            <Typography gutterBottom>
              Your {profit >= 0 ? "profit" : "deficit"} would be{" "}
              {Currency(profit, { precision: 2 }).multiply(100).format()}%
            </Typography>
            <Typography gutterBottom>
              And you would have invested{" "}
              {Currency(invested, { symbol: "$" }).format()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export const StockComparator: React.FC<IProps> = ({
  amountBitcoin,
  totalBitcoin,
  profitBitcoin,
  invested,
  stock,
  amountStock,
  profitStock,
  totalStock,
}) => (
  <Grid container spacing={4}>
    <Grid item xs={12} sm={6}>
      <Result
        image={bitcoin}
        stock="Bitcoin"
        amount={amountBitcoin}
        type="bitcoins"
        total={totalBitcoin}
        profit={profitBitcoin}
        invested={invested}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Result
        image={stocks}
        stock={stock}
        amount={amountStock}
        type="shares"
        total={totalStock}
        profit={profitStock}
        invested={invested}
      />
    </Grid>
  </Grid>
);
