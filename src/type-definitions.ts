

export type BarData = {
    volume: number;
    open: number;
    close: number;
    high: number;
    low: number;
}

export enum eTrend {
    downtrend = 'DOWNTREND',
    uptrend = 'UPTREND',
}