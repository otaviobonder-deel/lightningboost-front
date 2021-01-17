import React, { useEffect, useRef, useState } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";
import { makeStyles } from "@material-ui/core";
import earthBlueMarble from "../../assets/earth-blue-marble.jpg";
import nightSky from "../../assets/night-sky.png";
import api from "../../services/api";
import { IProps, IPoints, INodeInfo, INodePairs } from "./interfaces";

const useStyles = makeStyles({
  container: ({ cursor }: { cursor: string }) => ({
    cursor,
  }),
});

const getNodePairs = ({
  nodeInfo,
  startLng,
  startLat,
  points,
}: {
  nodeInfo: INodeInfo[];
  startLng: number;
  startLat: number;
  points: IPoints[];
}): INodePairs[] => {
  const nodePairs: INodePairs[] = [];
  nodeInfo.forEach((node) => {
    const matchedNode = points.find(
      (point) => point.publicKey === node.publicKey
    );
    if (matchedNode) {
      const { lat, lng, alias } = matchedNode;
      nodePairs.push({
        alias,
        endLat: lat,
        endLng: lng,
        startLat,
        startLng,
        color: [
          ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
          ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
        ],
        ...node,
      });
    }
  });
  return nodePairs;
};

export const Map: React.FC<IProps> = ({ data, height }) => {
  // cursor state
  const [cursor, setCursor] = useState("default");

  // globe ref
  const globeEl = useRef<GlobeMethods>();

  // arcs state
  const [arcs, setArcs] = useState<INodePairs[]>([]);

  const classes = useStyles({ cursor });

  // nodes
  const points: IPoints[] = data
    .map((d) => {
      if (d.lat && d.lng) {
        return {
          alias: d.alias || d.publicKey,
          publicKey: d.publicKey,
          color: d.color,
          lat: d.lat,
          lng: d.lng,
        };
      }
      return null;
    })
    .filter(<T,>(x: T | null): x is T => x !== null);

  // handle click on a node
  const handleClick = async ({
    id,
    startLat,
    startLng,
  }: {
    id: string;
    startLat: number;
    startLng: number;
  }) => {
    try {
      setCursor("wait");
      const { data: nodeInfo } = await api.get<INodeInfo[]>(
        `/lightning/nodeinfo/${id}`
      );
      const nodePairs = getNodePairs({
        nodeInfo,
        startLng,
        startLat,
        points,
      });
      setArcs(nodePairs);
      setCursor("default");
    } catch (e) {
      setCursor("default");
    }
  };

  // set map component height
  useEffect(() => {
    const globeElement = globeEl.current;
    if (globeElement) {
      const controls: any = globeElement.controls();
      controls.minDistance = 120;
    }
  }, [globeEl]);

  return (
    <div className={classes.container}>
      <ReactGlobe
        ref={globeEl}
        height={height}
        globeImageUrl={earthBlueMarble}
        backgroundImageUrl={nightSky}
        onGlobeClick={() => setArcs([])}
        pointsData={points}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor="color"
        pointAltitude={0}
        onPointClick={(point: any, event) =>
          handleClick({
            id: point.publicKey,
            startLat: point.lat,
            startLng: point.lng,
          })
        }
        arcsData={arcs}
        arcDashLength="capacityRatio"
        arcDashGap={0.1}
        arcDashAnimateTime={5000}
        arcColor="color"
      />
    </div>
  );
};
