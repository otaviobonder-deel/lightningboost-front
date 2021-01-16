import React, { useEffect, useRef, useState } from 'react';
import ReactGlobe, { GlobeMethods } from 'react-globe.gl';
import earthBlueMarble from '../../assets/earth-blue-marble.jpg';
import nightSky from '../../assets/night-sky.png';
import api from '../../services/api';
import {
  IProps, ILabels, INodeInfo, INodePairs,
} from './interfaces';

export const Map: React.FC<IProps> = ({ data, height }) => {
  const globeEl = useRef<GlobeMethods>();

  const [arcs, setArcs] = useState<INodePairs[]>([]);

  const labels: ILabels[] = data.map((d) => {
    if (d.lat && d.long) {
      return {
        alias: d.alias || d.publicKey,
        publicKey: d.publicKey,
        lat: d.lat,
        long: d.long,
      };
    }
    return null;
  }).filter(<T, >(x: T | null): x is T => x !== null);

  const handleClick = async ({ id, startLat, startLong }: {
      id: string,
      startLat: number,
      startLong: number}) => {
    try {
      const { data: nodeInfo } = await api.get<INodeInfo[]>(`/lightning/nodeinfo/${id}`);
      const nodePairs: INodePairs[] = [];
      nodeInfo.forEach((node) => {
        const matchedNode = labels.find((label) => label.publicKey === node.publicKey);
        if (matchedNode) {
          const { lat, long } = matchedNode;
          nodePairs.push({
            endLat: lat,
            endLng: long,
            startLat,
            startLng: startLong,
            ...node,
          });
        }
      });
      setArcs(nodePairs);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const globeElement = globeEl.current;
    if (globeElement) {
      const controls: any = globeElement.controls();
      controls.minDistance = 150;
    }
  }, [globeEl]);

  return (
    <ReactGlobe
      ref={globeEl}
      height={height}
      globeImageUrl={earthBlueMarble}
      backgroundImageUrl={nightSky}
      onGlobeClick={() => setArcs([])}
      pointsData={labels}
      pointLat={(d: any) => d.lat}
      pointLng={(d: any) => d.long}
      pointAltitude={0}
      onPointClick={(point: any, event) => handleClick({
        id: point.publicKey,
        startLat: point.lat,
        startLong: point.long,
      })}
      arcsData={arcs}
      arcDashLength={() => Math.random()}
      arcDashGap={() => Math.random()}
      arcDashAnimateTime={() => Math.random() * 4000 + 500}
    />
  );
};
