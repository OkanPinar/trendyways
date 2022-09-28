import { BarData } from './type-definitions';
import { windowOp } from './utils';
import { avgVector, sumVector } from './vector';

export type ADXInput = Pick<BarData, 'close' | 'high' | 'low'>;
/**
 * @description Calculates the ADX (Average Directional Index) of a serie
 * @dmp directional movement positive
 * @dmn directional movement negative
 * @di14p positive directional indicator
 * @di14n negative directional indicator
 * @tr true range
 */
export interface ADXOutput {
    dmp: number;
    dmn: number;
    tr: number;
    tr14?: number;
    dmp14?: number;
    dmn14?: number;
    di14p?: number;
    di14n?: number;
    diff?: number;
    sum?: number;
    dx?: number;
    adx?: number;
};

/**
 * @description Average Directional Index (ADX)
 * @param {array} list of _ohlc_ values
 * @return {array} the afx values list
 *
 * Source: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:average_directional_index_adx
 */
export function adx(values: ADXInput[]): ADXOutput[] {
    let dmWindow = function (serie: ADXInput[]): ADXOutput {
        let sum = 0;
        let todayMax = serie[1].high - serie[0].high;
        let todayMin = serie[0].low - serie[1].low;
        let dmPos = 0, dmNeg = 0;
        if (todayMax > 0 || todayMin > 0) {
            dmPos = todayMax > todayMin ? Math.abs(todayMax) : 0;
            dmNeg = todayMax < todayMin ? Math.abs(todayMin) : 0;
        }
        else {
            dmPos = 0;
            dmNeg = 0;
        }
        let tr = Math.max(Math.abs(serie[1].high - serie[1].low),
            Math.abs(serie[1].high - serie[0].close),
            Math.abs(serie[1].high - serie[0].close));
        return { dmp: dmPos, dmn: dmNeg, tr: tr };
    };
    let result = windowOp(values, 2, dmWindow);
    result.unshift({ dmp: 0, dmn: 0, tr: 0 });

    let firstTr14 = sumVector(result.slice(0, 15), "tr"),
        firstDM14Pos = sumVector(result.slice(0, 15), "dmp"),
        firstDM14Neg = sumVector(result.slice(0, 15), "dmn");
    result[14].tr14 = firstTr14;
    result[14].dmp14 = firstDM14Pos;
    result[14].dmn14 = firstDM14Neg;
    result[14].di14p = 100 * (result[14].dmp14 / result[14].tr14);
    result[14].di14n = 100 * (result[14].dmn14 / result[14].tr14);
    result[14].diff = Math.abs(result[14].di14p - result[14].di14n);
    result[14].sum = result[14].di14p + result[14].di14n;
    result[14].dx = 100 * (result[14].diff / result[14].sum);
    for (var i = 15; i < result.length; i++) {
        const _previousResult = result[i - 1] as Required<ADXOutput>;
        const _currentResult = result[i] as Required<ADXOutput>;
        _currentResult.tr14 = _previousResult.tr14 - (_previousResult.tr14 / 14) + _currentResult.tr;
        _currentResult.dmp14 = _previousResult.dmp14 - (_previousResult.dmp14 / 14) + _currentResult.dmp;
        _currentResult.dmn14 = _previousResult.dmn14 - (_previousResult.dmn14 / 14) + _currentResult.dmn;
        result[i].di14p = 100 * (_currentResult.dmp14 / _currentResult.tr14);
        result[i].di14n = 100 * (_currentResult.dmn14 / _currentResult.tr14);
        result[i].diff = Math.abs(_currentResult.di14p - _currentResult.di14n);
        result[i].sum = _currentResult.di14p + _currentResult.di14n;
        result[i].dx = 100 * (_currentResult.diff / _currentResult.sum);
        if (i >= 28) {
            let _adxResult = 0;
            if (i == 28) { _adxResult = avgVector(result.slice(i - 14, i), "dx"); }
            else {
                _adxResult = ((_previousResult.adx * 13) + _currentResult.dx) / 14;
            }
            _currentResult.adx = _adxResult;
        }
    }
    return result;
};

