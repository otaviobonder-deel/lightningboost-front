module.exports = {
  plugins: [
    {
      // eslint-disable-next-line
      plugin: require("craco-cesium")({
        loadPartially: true,
        loadCSSinHTML: true,
        cesiumPath: "cesium",
      }),
    },
  ],
};
