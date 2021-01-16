export interface IData {
    alias?: string
    publicKey: string
    color: string
    lat?: number
    lng?: number
}

export interface IProps {
    data: IData[]
    height: number
}

export interface ILabels {
    alias: string
    publicKey: string
    color: string
    lat: number
    lng: number
}

export interface INodeInfo {
    publicKey: string;
    capacityRatio: number;
}

export interface INodePairs extends INodeInfo {
    color: string[]
    endLat: number
    endLng: number
    startLat: number
    startLng: number
}
