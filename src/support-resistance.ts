import { BarData, eTrend } from './type-definitions';
import { reverseAppend } from './utils';

export type FloorPivotsInput = Pick<BarData, 'close' | 'high' | 'low'>;
export type FloorPivotLevel = {
    pl: number;
    r1: number;
    r2: number;
    r3: number;
    s1: number;
    s2: number;
    s3: number;
};

export function floorPivots(values: FloorPivotsInput[]): Array<FloorPivotsInput & { 'floor': FloorPivotLevel; }>;
export function floorPivots<Key extends string>(values: FloorPivotsInput[], outAttr: Key): Array<FloorPivotsInput & { [K in Key]: FloorPivotLevel; }>;

/**
 * Returns the Floor pivot level, three support levels (s1,s2 and s3)
 * and three resistance levels (r1, r2 and r3) of the
 * given data series.
 * These values for a given day are calculated based on the day before
 * so expect n values as output for a given list of n days.
 * Note that all three must have the same length.
 * Params: - higList: list of high values
 *         - lowList: list of low values
 *         - cliseList: list of closing values
 * The result is a list of elements with fields:
 *         - r3: resistence third level
 *         - r2: resistance second level
 *         - r1: resistance first level
 *         - pl: pivot level
 *         - s3: support third level
 *         - s2: support second level
 *         - s1: support first level
 */
export function floorPivots<Key extends string>(values: FloorPivotsInput[], outAttr?: Key) {
    var result = [] as FloorPivotLevel[];
    for (var i = 0; i < values.length; i++) {
        let pivotLevel = (values[i].high + values[i].low + values[i].close) / 3;
        let r1 = 2 * pivotLevel - values[i].low;
        let r2 = pivotLevel + values[i].high - values[i].low;
        let r3 = r1 + values[i].high - values[i].low;
        let s1 = 2 * pivotLevel - values[i].high;
        let s2 = pivotLevel - values[i].high + values[i].low;
        let s3 = s1 - values[i].high + values[i].low;
        let elem = { r3: r3, r2: r2, r1: r1, pl: pivotLevel, s1: s1, s2: s2, s3: s3 };
        result.push(elem);
    }
    if (outAttr) {
        return reverseAppend(values, result, outAttr);
    }
    else {
        return reverseAppend(values, result, "floor");
    }
};


////////////////////////////////////////////////////////
export type TomDemarksPointsInput = Pick<BarData, 'close' | 'high' | 'low' | 'open'>;
export type TomDemarkPoint = { newLow: number, newHigh: number; };

export function tomDemarksPoints(values: TomDemarksPointsInput[]): Array<TomDemarksPointsInput & { 'tom': TomDemarkPoint; }>;
export function tomDemarksPoints<Key extends string>(values: TomDemarksPointsInput[], outAttr: Key): Array<TomDemarksPointsInput & { [K in Key]: TomDemarkPoint; }>;

/**
 * Returns the Tom Demark points, the predicted low and highs
 * of the period.
 * These values for a given day are calculated based on the day before
 * so expect n values as output for a given list of n days.
 * The result is a list of elements with fields:
 *         - low: predicted low value.
 *         - high: predicted high value.
 */
export function tomDemarksPoints<Key extends string>(values: TomDemarksPointsInput[], outAttr?: Key) {
    var result = [] as TomDemarkPoint[];
    for (var i = 0; i < values.length; i++) {
        let x = 0;
        if (values[i].close < values[i].open) {
            x = values[i].high + (2 * (values[i].low) + values[i].close);
        }
        if (values[i].close > values[i].open) {
            x = (2 * values[i].high) + values[i].low + values[i].close;
        }
        if (values[i].close == values[i].open) {
            x = values[i].high + values[i].low + (2 * values[i].close);
        }
        let newHigh = (x / 2) - values[i].low;
        let newLow = (x / 2) - values[i].high;
        let elem = { newLow, newHigh };
        result.push(elem);
    }
    if (outAttr) {
        return reverseAppend(values, result, outAttr);
    }
    else {
        return reverseAppend(values, result, "tom");
    }
};

////////////////////////////////////////////////////////
export type WoodiesPointsInput = Pick<BarData, 'close' | 'high' | 'low'>;
export type WoodiesPoint = { pivot: number, r1: number, s1: number, s2: number, r2: number; };
export function woodiesPoints(values: WoodiesPointsInput[]): Array<BarData & { 'wood': WoodiesPoint; }>;
export function woodiesPoints<Key extends string>(values: WoodiesPointsInput[], outAttr: Key): Array<BarData & { [K in Key]: WoodiesPoint; }>;
/**
 * Returns the Woodies points: pivot, supports (s1 and s2) and
 * resistance values (r1 and r2).
 * These values for a given day are calculated based on the day before
 * so expect n values as output for a given list of n days.
 * The result is a list of elements with fields:
 *         - pivot: predicted pivot value.
 *         - s1: predicted support (s1).
 *         - r1: predicted resistance (r1).
 *         - r2: predicted secondary resistance (r2).
 *         - s2: predicted secondary support (s2).
 */
export function woodiesPoints<Key extends string>(values: WoodiesPointsInput[], outAttr?: Key) {
    var result = [] as WoodiesPoint[];
    for (var i = 0; i < values.length; i++) {
        let pivot = (values[i].high + values[i].low + 2 * values[i].close) / 4;
        let r1 = (2 * pivot) - values[i].low;
        let r2 = pivot + values[i].high - values[i].low;
        let s1 = (2 * pivot) - values[i].high;
        let s2 = pivot - values[i].high + values[i].low;
        let elem = { pivot: pivot, r1: r1, s1: s1, s2: s2, r2: r2 };
        result.push(elem);
    }
    if (outAttr) {
        return reverseAppend(values, result, outAttr);
    }
    else {
        return reverseAppend(values, result, "wood");
    }
};

////////////////////////////////////////////////////////
export type CamarillaPointsInput = Pick<BarData, 'close' | 'high' | 'low'>;
export type CamarillaPoint = { r4: number, r3: number, r2: number, r1: number, s1: number, s2: number, s3: number, s4: number; };
export function camarillaPoints(values: CamarillaPointsInput[]): Array<CamarillaPointsInput & { 'cam': CamarillaPoint; }>;
export function camarillaPoints<Key extends string>(values: CamarillaPointsInput[], outAttr: Key): Array<CamarillaPointsInput & { [K in Key]: CamarillaPoint; }>;
/**
 * Returns the Camarilla points: supports (s1,s2,3 and s4)) and
 * resistance values (r1, r2, r3 and r4).
 * The result is a list of elements with fields:
 *         - s1: predicted s1 support.
 *         - s2: predicted s2 support.
 *         - s3: predicted s3 support.
 *         - s4: predicted s4 support.
 *         - r1: predicted r1 resistance.
 *         - r2: predicted r2 resistance.
 *         - r3: predicted r3 resistance.
 *         - r4: predicted r4 resistance.
 */
export function camarillaPoints<Key extends string>(values: CamarillaPointsInput[], outAttr?: Key) {
    let result = [] as CamarillaPoint[];
    for (var i = 0; i < values.length; i++) {
        let diff = values[i].high - values[i].low;
        let r4 = (diff * 1.1) / 2 + values[i].close;
        let r3 = (diff * 1.1) / 4 + values[i].close;
        let r2 = (diff * 1.1) / 6 + values[i].close;
        let r1 = (diff * 1.1) / 12 + values[i].close;
        let s1 = values[i].close - (diff * 1.1 / 12);
        let s2 = values[i].close - (diff * 1.1 / 6);
        let s3 = values[i].close - (diff * 1.1 / 4);
        let s4 = values[i].close - (diff * 1.1 / 2);
        let elem = { r4: r4, r3: r3, r2: r2, r1: r1, s1: s1, s2: s2, s3: s3, s4: s4 };
        result.push(elem);
    }
    if (outAttr) {
        return reverseAppend(values, result, outAttr);
    }
    else {
        return reverseAppend(values, result, "cam");
    }
};

////////////////////////////////////////////////////////
export type FibonacciInput = Pick<BarData, 'high' | 'low'>;
export function fibonacciRetrs(values: FibonacciInput[], trend: eTrend): number[][] {
    let result = [] as number[][];
    let retracements = [1, 0.618, 0.5, 0.382, 0.236, 0];
    for (var i = 0; i < values.length; i++) {
        let diff = values[i].high - values[i].low;
        let elem = [] as number[];
        for (var r = 0; r < retracements.length; r++) {
            let level = 0;
            if (trend == 'DOWNTREND')
                level = values[i].high - diff * retracements[r];
            else
                level = values[i].low + diff * retracements[r];
            elem.push(level);
        }
        result.push(elem);
    }
    return result;
};
