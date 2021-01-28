/* eslint-disable camelcase */

import React from "react";
import { ForceGraphMethods } from "react-force-graph-3d";

export interface IProps {
  data: IGraph;
}

export interface IGraph {
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
    },
    {
      public_key: string;
    }
  ];
  capacity: string;
  transaction_id: string;
  color?: string;
}

export interface IOptionsProps {
  graphRef: React.RefObject<ForceGraphMethods | undefined>;
}

export interface IAdjacencyList {
  [key: string]: IEdgesFunc[];
}

export interface INodesFunc {
  publicKey: string;
  alias: string;
  color: string;
  visible: boolean;
  links?: IEdgesFunc[];
}

export interface IEdgesFunc {
  channelId: string;
  node1: string;
  node2: string;
  capacity: string;
  color: string;
}

export interface IGraphFunc {
  nodes: INodesFunc[];
  links: IEdgesFunc[];
}
