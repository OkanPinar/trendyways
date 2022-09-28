import { isUndef, resolveParam, reverseAppend, valueIfUndef, windowOp } from './utils';
import { avgVector } from './vector';


/*
 * Moving Average: 
 * also known as simple moving average, rolling average, moving mean
 * and a million of similar combinations
 */
export function ma(serie: number[], order: number): number[];
export function ma<T, Key extends string>(serie: T[], order: number, targetAttr: keyof T, outAttr?: Key): Array<T & { [K in Key]: number; }>;
export function ma<T>(serie: T[], order: number, targetAttr: keyof T): Array<T & { 'ma': number; }>;
export function ma<T, Key extends string>(serie: T[] | number[], order: number, targetAttr?: keyof T, outAttr?: Key) {
    if (serie.length === 0) {
        return [0];
    }
    let sumWindow = function (serie: T[] | number[]): number {
        var sum = 0;
        for (var init = 0; init < serie.length; init++) {
            if (typeof serie[init] === 'number') {
                sum += serie[init] as number;
            }
            else {
                if (!targetAttr) throw new Error("targetAttr must be specified");
                sum += (serie[init] as T)[targetAttr] as number;
            }
        }
        return (sum / serie.length);
    };
    let newVal = windowOp(serie, order, sumWindow);
    if (typeof serie[0] === 'number') {
        return newVal;
    }
    else {
        const _key = outAttr ? outAttr : "ma" as Key;
        return reverseAppend((serie as T[]), newVal, _key);
    }
}


///////////////////////////////////////////////////////

/**
 * Exponential moving average
 */
export function ema(serie: number[], period: number): number[];
export function ema<T, Key extends string>(serie: T[], period: number, targetAttr: keyof T, outAttr: Key): Array<T & { [K in Key]: number; }>;
export function ema<T, Key extends string>(serie: T[], period: number, targetAttr: keyof T): Array<T & { 'ema': number; }>;
export function ema<T, Key extends string>(serie: T[], period: number, targetAttr?: keyof T, outAttr?: Key) {
    if (serie.length === 0) {
        return [0];
    }
    if (typeof serie[0] == "object" && !targetAttr)
        throw new Error("targetAttr not provided");
    let emaValues = [] as number[];
    let k = (2 / (period + 1));
    let initSlice = serie.slice(0, period);
    let previousDay = avgVector(initSlice, targetAttr);
    emaValues.push(previousDay);
    let emaSlice = serie.slice(period);
    emaSlice.forEach(function (elem: T | number) {
        let value = 0;
        if (typeof elem === 'number') {
            value = elem as number;
        }
        else {
            if (!targetAttr) throw new Error("targetAttr must be specified");
            value = (elem as T)[targetAttr] as number;
        }
        previousDay = value * k + previousDay * (1 - k);
        emaValues.push(previousDay);
    });
    let newSerie = serie.slice();
    if (typeof serie[0] === 'number') {
        return emaValues;
    }
    else {
        const _key = outAttr ? outAttr : "ema" as Key;
        return reverseAppend(newSerie, emaValues, _key);
    }
};

///////////////////////////////////////////////////////


/**
 * Weighted moving average.
 * The order of the mean (the number of elements to sum) is based on the weight's length.
 * The sum of weights should be 1.
 */
export function wma(serie: number[], weights: number[]): number[];
export function wma<T, Key extends string>(serie: T[], weights: number[], targetAttr: keyof T): Array<T & { wma: number; }>;
export function wma<T, Key extends string>(serie: T[], weights: number[], targetAttr: keyof T, outAttr: Key): Array<T & { [K in Key]: number; }>;
export function wma<T, Key extends string>(serie: T[] | number[], weights: number[], targetAttr?: keyof T, outAttr?: Key) {
    let sumWindow = function (elems: T[] | number[]) {
        let sum = 0;
        elems.forEach(function (elem: T | number, i) {
            if (typeof elem === 'number') {
                sum += (elem as number) * weights[i];
            }
            else {
                if (!targetAttr) throw new Error("targetAttr must be specified");
                sum += ((elem as T)[targetAttr] as number) * weights[i];
            }
        });
        return (sum / elems.length);
    };
    let wmaValues = windowOp(serie, weights.length, sumWindow);
    if (typeof serie[0] === 'number') {
        return wmaValues;
    }
    else {
        let newSerie = serie.slice() as T[];
        const _key = outAttr ? outAttr : "wma" as Key;
        return reverseAppend(newSerie, wmaValues, _key);
    }
};


