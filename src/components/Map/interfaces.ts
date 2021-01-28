import { Viewer } from "cesium";

export interface IData {
  alias?: string;
  publicKey: string;
  color: string;
  lat?: number;
  lng?: number;
}

export interface IProps {
  data: IData[];
  height?: number;
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
