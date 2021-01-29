import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { IProps } from "./interfaces";

export const Share: React.FC<IProps> = ({ quote }) => {
  const location = useLocation();

  const url = `https://lightningboost.info${location.pathname}${location.search}`;

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Typography align="center">Share this simulation</Typography>
      </Grid>
      <Grid item>
        <FacebookShareButton url={url} quote={quote}>
          <FacebookIcon size={24} round />
        </FacebookShareButton>
      </Grid>
      <Grid item>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={24} round />
        </LinkedinShareButton>
      </Grid>
      <Grid item>
        <TwitterShareButton url={url} title={quote}>
          <TwitterIcon size={24} round />
        </TwitterShareButton>
      </Grid>
      <Grid item>
        <WhatsappShareButton url={url} title={quote}>
          <WhatsappIcon size={24} round />
        </WhatsappShareButton>
      </Grid>
      <Grid item>
        <RedditShareButton url={url} title={quote}>
          <RedditIcon size={24} round />
        </RedditShareButton>
      </Grid>
    </Grid>
  );
};
