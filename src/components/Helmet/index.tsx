import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

interface IProps {
  quote?: string;
  title?: string;
  image?: string;
  description?: string;
  hashtag?: string;
  keywords?: string;
}

export const HelmetMetaTag: React.FC<IProps> = ({
  quote = "",
  title = "LightningBoost - Explore the Lightning",
  image = `${process.env.PUBLIC_URL}/apple-touch-icon.png`,
  description = "Compare the price of bitcoin with any investment, get inbound liquidity for you Lightning Network node, connect to a WatchTower and explore the Lightning Network",
  hashtag = "#lightningboost",
  keywords = "lightning, lightningnetwork, network",
}) => {
  const location = useLocation();
  const currentUrl = `https://lightningboost.info${location.pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      <meta name="theme-color" content="#3e2e56" />
      <meta name="_token" content="" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={title} />
      <meta property="quote" content={quote} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={quote} />
      <meta property="og:hashtag" content={hashtag} />
      <meta property="og:image" content={image} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="CampersTribe" />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};
