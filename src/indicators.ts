import { ema } from './averages';
import { BarData } from './type-definitions';
import { fill, isUndef, reverseAppend, windowOp } from "./utils";
import { avgVector, combineVectors, diffVectors, divVector, sumVector } from './vector';


/**
 * @description On-Balance Volume (obv).
 * @param closeList list of closing prices
 * @param volumeList list of volumes
 * @return the OBV values list
 */
export function obv(values: Pick<BarData, 'volume' | 'close'>[]) {
    if (values.length === 0) {
        return [];
    }
    let result = [] as number[];
    let prevObv = values[0].volume;
    result.push(prevObv);
    for (var i = 1; i < values.length; i++) {
        if (values[i].close > values[i - 1].close) {
            // bullish
            prevObv += values[i].volume;
            result.push(prevObv);
        }
        else if (values[i].close < values[i - 1].close) {
            // bearish
            prevObv -= values[i].volume;
            result.push(prevObv);
        }
        else {
            result.push(prevObv);
        }
    }
    return result;
};

/**
 * @description Returns the VPT (Volume-price Trend)
 * @param closeList list of closing prices
 * @param volumeList list of volume
 * @return vpt values array
 */
export function vpt(values: Pick<BarData, 'volume' | 'close'>[]) {
    if (values.length === 0) {
        return [];
    }
    let result = [] as number[];
    let vpt = values[0].volume;
    result.push(vpt);
    for (var i = 1; i < values.length; i++) {
        let newVpt = vpt + values[i].volume * ((values[i].close - values[i - 1].close) / values[i - 1].close);
        result.push(newVpt);
        vpt = newVpt;
    }
    return result;
};

/**
 * @description Returns the Money-flow Index
 * @param {array} highPrices list of high prices
 * @param {array} lowPrices list of low prices
 * @param {array} closePrices list of closing prices
 * @param {array} volumes list of volumes
 * @return {value} the money-flow index
 */
export function mfi(values: Omit<BarData, 'open'>[]): Array<Omit<BarData, 'open'> & { mfi?: number; }> {
    let typicalMoney = [] as number[];
    let moneyFlow = [] as number[];
    for (var i = 0; i < values.length; i++) {
        let tpMoney = (values[i].high + values[i].low + values[i].close) / 3;
        typicalMoney.push(tpMoney);
        moneyFlow.push(tpMoney * values[i].volume);
    }
    let posMoneyFlow = [] as number[];
    let negMoneyFlow = [] as number[];
    for (var i = 0; i < typicalMoney.length - 1; i++) {
        if (typicalMoney[i] <= typicalMoney[i + 1]) {
            posMoneyFlow.push(moneyFlow[i + 1]);
            negMoneyFlow.push(0);
        }
        else if (typicalMoney[i] > typicalMoney[i + 1]) {
            posMoneyFlow.push(0);
            negMoneyFlow.push(moneyFlow[i + 1]);
        }
        else // typical money unchanged implies day is discharged
        {
            posMoneyFlow.push(0);
            negMoneyFlow.push(0);
        }
    }

    let sumPosFlow = windowOp(posMoneyFlow, 14, sumVector);
    let sumNegFlow = windowOp(negMoneyFlow, 14, sumVector);
    let moneyRatio = divVector(sumPosFlow, sumNegFlow);

    let mfi = [] as number[];
    moneyRatio.forEach(function (value) {
        mfi.push(100 - (100 / (1 + value)));
    });
    return reverseAppend(values, mfi, 'mfi');
};

////////////////////////////////////////////
export type macdResult = { line: number, signal: number, hist: number; };
/**
 * @description Returns the MACD
 * @param {array} closePrices list of closing prices
 * @return {object} object containing the macd, signal
 *                  and hist series.
 */
export function macd<T>(values: T[], targetAttr: keyof T): Array<T & { macd: macdResult; }> {
    type SlowEma = T & { slowema: number; };
    type FastEma = T & { fastema: number; };
    let slow = 26;
    let fast = 12;
    let signal = 9;
    let slowEMA = ema(values, slow, targetAttr, "slowema");
    let fastEMA = ema(values, fast, targetAttr, "fastema");
    let macdLine = combineVectors<{ macd: number; }>(slowEMA, fastEMA, function (slow: SlowEma, fast: FastEma) {
        if (slow.slowema == 0 || isUndef(slow.slowema)) {
            return ({ macd: 0 }); // avoid div by 0
        };
        return ({ macd: 100 * ((fast.fastema / slow.slowema) - 1) });
    });
    let signalLine = ema(macdLine.slice(25), signal, "macd"); // avoid first 25 (padding)
    for (var i = 0; i < 25; i++) {
        signalLine.unshift({ macd: 0 } as any); // append again 25 zeros
    }
    fill(signalLine, "ema", 0);
    let macdItems = [] as { macd: macdResult; }[];
    for (var i = 0; i < macdLine.length; i++) {
        macdItems.push({ macd: { line: macdLine[i].macd, signal: signalLine[i].ema, hist: macdLine[i].macd - signalLine[i].ema } });
    }
    let returnList = values.slice();
    return reverseAppend(returnList, macdItems, 'macd');
};

////////////////////////////////////////////

/**
 * @description Returns the Momentum
 * @param values list of closing prices
 * @param order order of the momentum 
 * @returns list containing the momentum series
 * @example 
 * var m = momemtum ([12,34,23, 81], 1) 
 * console.log(m)  // [22, -11, 58]
 */
export function momentum(values: Pick<BarData, 'close'>[], order: number): Array<BarData & { 'mom': number; }>;
export function momentum<Key extends string>(values: Pick<BarData, 'close'>[], order: number, outAttr?: Key) {
    let momentumN = function (chunk: Pick<BarData, 'close'>[]) {
        return chunk[chunk.length - 1].close - chunk[0].close;
    };
    let returnValues = values.slice();
    let newValues = windowOp(values, order + 1, momentumN);
    const _key = outAttr ? outAttr : "mom" as Key;
    return reverseAppend(returnValues, newValues, _key);
};

////////////////////////////////////////////

/**
 * @description Returns the Rate of Change value (ROC)
 * @param values list of closing prices
 * @param order order of the ROC
 * @returns list containing the ROC series
 * @example 
 * var roc = roc ([12, 11, 15, 10], 1) 
 * console.log(roc)  // [-0.09, 0.36, -0.33]
 */
export function roc(values: Pick<BarData, 'close'>[], order: number): Array<Pick<BarData, 'close'> & { 'roc': number; }>;
export function roc<Key extends string>(values: Pick<BarData, 'close'>[], order: number, outAttr?: Key) {
    let rocN = function (chunk: Pick<BarData, 'close'>[]) {
        return (chunk[chunk.length - 1].close - chunk[0].close) / chunk[0].close;
    };
    let returnValues = values.slice();
    let rocValues = windowOp(values, order + 1, rocN);
    const _key = outAttr ? outAttr : "roc" as Key;
    return reverseAppend(returnValues, rocValues, _key);
};

////////////////////////////////////////////
/**
 * @description Returns the RSI (Relative Strength Index)
 * @param values list of closing prices
 * @param {value} order RSI order (typically 14)
 * @returns {array} list containing the RSI for each period
 * @example 
 * var rsi = rsi ([45.34, 44, ..., 42,9, 45.23], 14) 
 * console.log(rsi)  // [70.53, 66.32, ..., 56.05]
 */
export function rsi(values: Pick<BarData, 'close'>[], order: number): Array<BarData & { 'rsi': number; }>;
export function rsi(values: Pick<BarData, 'close'>[], order: number, targetAttr: string = 'rsi') {
    if (values.length < order + 1) {
        return [-1]; // not enough params
    }
    let gains = [] as number[];
    let losses = [] as number[];
    for (var i = 0; i < values.length - 1; i++) {
        let diff = values[i + 1].close - values[i].close;
        if (diff > 0) {
            gains.push(diff);
            losses.push(0);
        }
        else if (diff < 0) {
            gains.push(0);
            losses.push(Math.abs(diff));
        }
        else {
            gains.push(0);
            losses.push(0);
        }
    }
    let result = [] as number[];
    let avgGain = avgVector(gains.slice(0, order));
    let avgLoss = avgVector(losses.slice(0, order));
    let firstRS = avgGain / avgLoss;
    result.push(100 - (100 / (1 + firstRS)));
    for (var i = order; i < values.length - 1; i++) {
        let partialCurrentGain = ((avgGain * (order - 1)) + gains[i]) / order;
        let partialCurrentLoss = ((avgLoss * (order - 1)) + losses[i]) / order;
        let smoothedRS = partialCurrentGain / partialCurrentLoss;
        let currentRSI = 100 - (100 / (1 + smoothedRS));
        result.push(currentRSI);
        avgGain = partialCurrentGain;
        avgLoss = partialCurrentLoss;
    }
    let newValues = values.slice();
    return reverseAppend(newValues, result, targetAttr);
};

//////////////////////////////
/**
 * @description Returns the ATR (Average True Value). ATR is provided after 14th element.
 * @param values containing {high,low,close}
 * @param period, default to 14
 * @returns list containing {tr,atr} values for each period.
 * @example 
 * var atr = atr ([{high:48.7, low:45.3, close:46}, ...])
 * console.log(atr)  // [{tr:2.4, atr:0}, ... 13 empty atr's, ... ,{atr:_value_, tr:_value_} ]
 */

export function atr(values: Omit<BarData, 'open' | 'volume'>[], period: number = 14, targetAttr: string = 'at') {
    let results = [] as { tr: number, atr: number; }[];
    for (var i = 0; i < values.length; i++) {
        if (i == 0) {
            results.push({ tr: values[i].high - values[i].low, atr: 0 });
        }
        else {
            let hl = values[i].high - values[i].low;
            let hcp = Math.abs(values[i].high - values[i - 1].close);
            let lcp = Math.abs(values[i].low - values[i - 1].close);
            let tr = Math.max(hl, hcp, lcp);
            let atr = 0;
            if (i == period - 1) {
                atr = tr;
                for (var j = 0; j < results.length; j++) {
                    atr += results[j].tr;
                }
                atr = atr / period;
            }
            else if (i > (period - 1)) {
                atr = ((results[i - 1].atr * (period - 1) + tr) / period);
            }
            results.push({ tr: tr, atr: atr });
        }
    }
    let newValues = values.slice();
    console.log(results.length);
    return reverseAppend(newValues, results, targetAttr);
};
