import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { PageContainer } from "../../components/Container/PageContainer";
import { ChartComparison } from "../../components/ChartComparison";
import { HelmetMetaTag } from "../../components/Helmet";

const Comparison: React.FC = () => (
  <>
    <HelmetMetaTag
      title="Compare bitcoin against any investment | LightningBoost"
      description="Ever wondered how much would you have right now if you had bought bitcoin instead of a traditional investment? Compare the bitcoin gains against any kind of investment!"
      keywords="bitcoin, compare bitcoin, investment, compare bitcoin investment, buy bitcoin"
    />
    <PageContainer maxWidth="md">
      <div style={{ padding: 24 }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography align="center" component="h1" variant="h4">
              Compare an investment in bitcoin against any traditional
              investment
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" component="h2" gutterBottom>
              Here you can simulate how would bitcoin compare against others
              investments. Choose the date you would like to begin, the amount
              to invest and the periodicity of the investment. You can visualize
              the comparison of the investment against bitcoin in the chart
              below.
            </Typography>
            <Typography align="center" variant="body2">
              Important! The algorithm is not considering some stock splits,
              like the TSLA split. I&apos;ll fix the algorithm when I have time.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ChartComparison />
          </Grid>
        </Grid>
      </div>
    </PageContainer>
  </>
);

export default Comparison;
