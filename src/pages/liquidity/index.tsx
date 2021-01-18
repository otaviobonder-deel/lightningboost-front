import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { PageContainer } from "../../components/Container/PageContainer";
import { useApiRequest } from "../../hooks/useApiRequest";
import { Loader } from "../../components/Loader";
import { ChannelOpen } from "../../components/ChannelOpen";

interface IWalletBalance {
  chainBalance: number;
}

const Loading: React.FC = () => (
  <Loader>
    <Typography align="center">Loading available balance</Typography>
  </Loader>
);

const Error: React.FC = () => (
  <PageContainer maxWidth="md">
    <Typography align="center">Error loading the available balance</Typography>
  </PageContainer>
);

const OutOfFunds: React.FC = () => (
  <PageContainer maxWidth="md">
    <Typography align="center">
      Sorry, my node is currently out of onchain funds. Check back later!
    </Typography>
  </PageContainer>
);

export const LiquidityProvider: React.FC = () => {
  const { data, loading, error } = useApiRequest<IWalletBalance>({
    initialLoading: true,
    url: "/lightning/walletbalance",
  });

  return (
    <PageContainer maxWidth="md">
      <div style={{ padding: 24 }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography align="center" component="h1" variant="h4">
              Need liquidity to your node?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">
              Here you can create a channel to your node. Paste your node public
              key and select the amount to open a channel. I&apos;ll
              automatically open a channel with you, providing you liquidity to
              receive payments
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {loading && <Loading />}
            {error && <Error />}
            {data && data.chainBalance >= 10000 && (
              <ChannelOpen walletBalance={data.chainBalance} />
            )}
            {data && data.chainBalance < 10000 && <OutOfFunds />}
          </Grid>
        </Grid>
      </div>
    </PageContainer>
  );
};
