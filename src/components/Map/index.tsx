import React, { useMemo, useRef, useState } from "react";
import {
  CesiumComponentRef,
  Globe,
  ImageryLayer,
  PointPrimitive,
  PointPrimitiveCollection,
  Viewer,
} from "resium";
import {
  Cartesian3,
  Color,
  JulianDate,
  Ion,
  IonImageryProvider,
  SampledPositionProperty,
  Viewer as CViewer,
  Cartographic,
  Math,
  PolylineGlowMaterialProperty,
  LagrangePolynomialApproximation,
  SceneTransforms,
} from "cesium";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {
  IArcCreation,
  INodeInfo,
  INodePairs,
  INode,
  IPoints,
  IProps,
} from "./interfaces";
import api from "../../services/api";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODRkYjExNy00YmI0LTQ4YjItOWNkYS01ZGQ2MjkxNTNiNjIiLCJpZCI6NDI3NjQsImlhdCI6MTYxMTc2ODM2NX0.Cb1d6lzAD9_d41gKZgUbyqU3YCJmDJSvC9NpRF1m14I";

const useStyles = makeStyles({
  info: {
    position: "absolute",
    top: 50,
    right: 5,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  nodeInfoLoading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  nodeInfoData: {
    margin: "10px 0",
    maxHeight: 350,
    overflow: "scroll",
  },
  hoveredNode: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    borderRadius: 4,
    padding: 5,
  },
  hoveredText: {
    color: "white",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    marginLeft: 5,
    "&:hover": {
      cursor: "pointer",
      fill: "red",
    },
  },
});

const createArc = ({
  cesiumElement,
  startLng,
  startLat,
  endLng,
  endLat,
}: IArcCreation) => {
  const color = Color.fromRandom({ alpha: 1 });

  const { startTime } = cesiumElement.clock;
  const midTime = JulianDate.addSeconds(startTime, 43200, new JulianDate());
  const stopTime = JulianDate.addSeconds(startTime, 86400, new JulianDate());

  // create path
  let property = new SampledPositionProperty();
  const startPosition = Cartesian3.fromDegrees(startLng, startLat);
  property.addSample(startTime, startPosition);
  const stopPosition = Cartesian3.fromDegrees(endLng, endLat);
  property.addSample(stopTime, stopPosition);

  // find the midpoint
  const midPoint = Cartographic.fromCartesian(property.getValue(midTime));
  midPoint.height = Math.nextRandomNumber() * 500000 + 2500000;
  const midPosition = cesiumElement.scene.globe.ellipsoid.cartographicToCartesian(
    midPoint,
    new Cartesian3()
  );

  // redo the path to be the new arc
  property = new SampledPositionProperty();
  property.addSample(startTime, startPosition);
  property.addSample(midTime, midPosition);
  property.addSample(stopTime, stopPosition);
  property.setInterpolationOptions({
    interpolationDegree: 5,
    interpolationAlgorithm: LagrangePolynomialApproximation,
  });

  // create the entity to show the arc
  cesiumElement.entities.add({
    position: property,
    point: {
      pixelSize: 8,
      color: Color.TRANSPARENT,
      outlineColor: color,
      outlineWidth: 3,
    },
    path: {
      resolution: 1200,
      material: new PolylineGlowMaterialProperty({
        glowPower: 0.16,
        color,
      }),
      width: 10,
      leadTime: 1e10,
      trailTime: 1e10,
    },
  });
};

const imageryProvider = new IonImageryProvider({ assetId: 3 });

const SelectedNodeInfo = ({
  selectedNode,
  handleCloseInfo,
  pairs,
}: {
  selectedNode: INode;
  handleCloseInfo: () => void;
  pairs: INodePairs;
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.info}>
      <div className={classes.title}>
        <Typography>{selectedNode.alias}</Typography>
        <CloseIcon onClick={handleCloseInfo} className={classes.icon} />
      </div>
      {pairs.loading && (
        <div className={classes.nodeInfoLoading}>
          <CircularProgress />
        </div>
      )}
      {pairs.data.length > 0 && (
        <div className={classes.nodeInfoData}>
          <Typography>Channels with:</Typography>
          <List>
            {pairs.data.map((item) => (
              <ListItem key={item.publicKey}>
                <ListItemText primary={item.alias} secondary={item.channelId} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </Paper>
  );
};

const HoveredNodeInfo = ({
  node,
  cesiumElement,
}: {
  node: INode;
  cesiumElement: CViewer;
}) => {
  const classes = useStyles();

  const position3d = Cartesian3.fromDegrees(node.lng || 0, node.lat || 0);
  const position2d = SceneTransforms.wgs84ToWindowCoordinates(
    cesiumElement.scene,
    position3d
  );

  return (
    <div
      className={classes.hoveredNode}
      style={{ top: position2d.y + 20, left: position2d.x }}
    >
      <Typography className={classes.hoveredText}>{node.alias}</Typography>
    </div>
  );
};

export const ResiumMap: React.FC<IProps> = ({ data }) => {
  const viewerRef = useRef<CesiumComponentRef<CViewer>>(null);
  const [selectedNode, setSelectedNode] = useState<INode | null>(null);
  const [selectedNodePairs, setSelectedNodePairs] = useState<INodePairs>({
    loading: false,
    error: false,
    data: [],
  });
  const [hoveredNode, setHoveredNode] = useState<INode | null>(null);

  const handleClick = async (node: INode) => {
    setSelectedNode(node);
    try {
      setSelectedNodePairs({ data: [], error: false, loading: true });
      const { data: nodeInfo } = await api.get<INodeInfo[]>(
        `/lightning/nodeinfo/${node.publicKey}`
      );
      const nodePairs: IPoints[] = [];
      nodeInfo.forEach((pairNode) => {
        const matchedNode = data.nodes.find(
          (point) => point.publicKey === pairNode.publicKey
        );
        if (
          matchedNode &&
          !nodePairs.find(
            (includedNode) => includedNode.publicKey === matchedNode.publicKey
          )
        ) {
          const { lat, lng, alias, publicKey, color } = matchedNode;
          nodePairs.push({
            publicKey,
            alias: alias || publicKey,
            color,
            startLat: node.lat || 0,
            startLng: node.lng || 0,
            endLat: lat,
            endLng: lng,
            capacityRatio: pairNode.capacityRatio,
            channelId: pairNode.channelId,
          });
        }
      });
      setSelectedNodePairs({ loading: false, error: false, data: nodePairs });
      if (viewerRef.current && viewerRef.current.cesiumElement) {
        const { cesiumElement } = viewerRef.current;
        cesiumElement?.entities.removeAll();
        nodePairs.forEach((pair) => {
          if (pair.endLng && pair.endLat) {
            createArc({
              cesiumElement,
              startLat: pair.startLat,
              startLng: pair.startLng,
              endLat: pair.endLat,
              endLng: pair.endLng,
            });
          }
        });
      }
    } catch (e) {
      setSelectedNodePairs({ data: [], error: true, loading: false });
    }
  };

  const handleCloseInfo = () => {
    setSelectedNode(null);
    setSelectedNodePairs({ loading: false, error: false, data: [] });
    if (viewerRef.current && viewerRef.current.cesiumElement) {
      const { cesiumElement } = viewerRef.current;
      cesiumElement?.entities.removeAll();
    }
  };

  return (
    <>
      {useMemo(
        () => (
          <Viewer
            ref={viewerRef}
            full
            timeline={false}
            animation={false}
            geocoder={false}
            homeButton={false}
            sceneModePicker={false}
            baseLayerPicker={false}
            infoBox={false}
          >
            <Globe enableLighting />
            <ImageryLayer imageryProvider={imageryProvider} />
            <PointPrimitiveCollection>
              {data.nodes.map((node) => {
                if (node.lat && node.lng) {
                  return (
                    <PointPrimitive
                      key={node.publicKey}
                      color={Color.fromCssColorString(node.color)}
                      position={Cartesian3.fromDegrees(node.lng, node.lat)}
                      onClick={() => handleClick(node)}
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                    />
                  );
                }
                return null;
              })}
            </PointPrimitiveCollection>
          </Viewer>
        ),
        // eslint-disable-next-line
        [data]
      )}
      {selectedNode && (
        <SelectedNodeInfo
          handleCloseInfo={handleCloseInfo}
          selectedNode={selectedNode}
          pairs={selectedNodePairs}
        />
      )}
      {hoveredNode && viewerRef.current && viewerRef.current.cesiumElement && (
        <HoveredNodeInfo
          node={hoveredNode}
          cesiumElement={viewerRef.current.cesiumElement}
        />
      )}
    </>
  );
};
