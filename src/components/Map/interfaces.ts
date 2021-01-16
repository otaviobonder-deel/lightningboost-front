export interface IData {
    alias?: string
    publicKey: string
    lat?: number
    long?: number
}

export interface IProps {
    data: IData[]
    height: number
}

export interface ILabels {
    alias: string
    publicKey: string
    lat: number
    long: number
}

export interface INodeInfo {
    publicKey: string;
    capacity: number;
}

export interface INodePairs extends INodeInfo {
    endLat: number
    endLng: number
    startLat: number
    startLng: number
}
