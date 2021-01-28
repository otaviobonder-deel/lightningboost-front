/* eslint-disable camelcase */

import { Viewer } from "cesium";

export interface IData {
  nodes: INode[];
  links: ILink[];
}

export interface INode {
  alias?: string;
  publicKey: string;
  color: string;
  lat?: number;
  lng?: number;
}

export interface ILink {
  id: string;
  policies: [
    {
      public_key: string;
    }
  ];
  capacity: string;
  transaction_id: string;
  color?: string;
}

export interface IProps {
  data: IData;
}

export interface IPoints {
  alias: string;
  publicKey: string;
  color: string;
  startLat: number;
  startLng: number;
  endLat?: number;
  endLng?: number;
  capacityRatio: number;
  channelId: string;
}

export interface INodeInfo {
  publicKey: string;
  capacityRatio: number;
  channelId: string;
}

export interface INodePairs {
  loading: boolean;
  error: boolean;
  data: IPoints[];
}

export interface IArcCreation {
  cesiumElement: Viewer;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}
