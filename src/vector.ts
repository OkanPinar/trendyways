import { max } from './statistics';
import { isUndef } from './utils';


/**
 * @description Alternative forEach for all those browsers like IE8 and below
 * @param {function} function to apply to each element
 * @param {scope} scope
 */
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
        for (var i = 0, len = this.length; i < len; ++i) {
            if (i in this) {
                fn.call(scope, this[i], i, this);
            }
        }
    };
}

////////////////////////////////////////////////////////

/**
 * @description Returns a vector containing the difference of the parameters.
 * @param series1 first values array of objects or numbers
 * @param series2 second values array of objects or numbers
 * @param targetAttr target attribute of object
 * @return series1 - series2
 */
export function diffVectors<T>(series1: T[] | number[], series2: T[] | number[], targetAttr?: keyof T): number[] {
    let size = max([series1.length, series2.length]);
    let result = [] as number[];
    let s1Size = series1.length;
    let s2Size = series2.length;
    for (var i = 0; i < size; i++) {
        let itemS1 = 0;
        let itemS2 = 0;
        if (s1Size > i) {
            itemS1 = isUndef(targetAttr) ? series1[i] as number : (series1[i] as T)[targetAttr as keyof T] as number;
        }
        if (s2Size > i) {
            itemS2 = isUndef(targetAttr) ? series2[i] as number : (series2[i] as T)[targetAttr as keyof T] as number;
        }
        result.push(itemS1 - itemS2);
    }
    return result;
};

////////////////////////////////////////////////////////

/**
 * @description Returns a vector to the 2nd power
 * @param {array} serie values array
 * @return {array} values array ^ 2
 */
export function powVector(serie: number[]): number[] {
    var result = [] as number[];
    let pow = function (x: number) {
        result.push(Math.pow(x, 2));
    };
    serie.forEach(pow);
    return result;
};

////////////////////////////////////////////////////////

/**
 * @description Returns the sum of all elements in a vector
 * @param vector values array
 * @returns the sum of all elements
 */
export function sumVector<T>(values: T[] | number[], targetAttr?: keyof T) {
    var result = 0;
    let sum = function (x: any) {
        if (isUndef(x[targetAttr]))
            result += x;
        else
            result += x[targetAttr];
    };
    values.forEach(sum);
    return result;
};
////////////////////////////////////////////////////////

/**
 * @description Returns the average of the sum of all vector elements
 * @param {array} vector values array
 * @returns {value} the average of the all elements
 */
export function avgVector<T>(vector: T[] | number[], targetAttr?: keyof T): number {
    let result = sumVector(vector, targetAttr);
    if (!vector.length)
        return 0;
    else
        return result / vector.length;
};
////////////////////////////////////////////////////////

/**
 * @description Returns the vector containing absolutes values of the input
 * @param {array} vector values array
 * @return {array} the absolute values of the given array
 */
let absVector = function (vector: number[]): number[] {
    let result = [] as number[];
    vector.forEach(function ab(x) {
        result.push(Math.abs(x));
    });
    return result;
};
////////////////////////////////////////////////////////

/**
 * @description Returns the values of the first vector divided by the second
 * @param v1 values array
 * @param v2 values array
 * @return v1 / v2
 */
export function divVector(v1: number[], v2: number[]): number[] {
    let result = [] as number[];
    for (var i = 0; i < v1.length; i++) {
        result.push(v1[i] / v2[i]);
    }
    return result;
};

////////////////////////////////////////////////////////

/**
 * @description Combine two vectors using the provided function.
 * Both series must have the same length.
 * @param serie1
 * @param serie2
 * @param fun
 * @return values fun(serie1, serie2)
 */
export function combineVectors<Tout>(serie1: any[], serie2: any[], fun: (value1: any, value2: any) => any): Tout[] {
    if (serie1.length != serie2.length || serie1.length + serie2.length < 2) {
        return [-1] as any;
    }
    else {
        let result = [] as Tout[];
        for (var i = 0; i < serie1.length; i++) {
            result.push(fun(serie1[i], serie2[i]));
        }
        return result;
    }
};

/**
 * @description Returns the MSE error of two series
 * @param{array} series1 values array
 * @param{array} series2 values array
 * @return{value} the mse error
 */
export function mse(series1: number[], series2: number[]): number {
    return avgVector(powVector(diffVectors(series1, series2)));
};

/**
 * @description Returns the RMSE error (squared MSE)
 * @param{array} series1 values array
 * @param{array} series2 values array
 * @return{value} the RMSE error
 */
export function rmse(series1: number[], series2: number[]): number {
    return Math.sqrt(mse(series1, series2));
};

/**
 * @description Returns the MAE erro (mean absolute error)
 * @param{array} series1 values array
 * @param{array} series2 values array
 * @return{value} the mae error
 */
export function mae(series1: number[], series2: number[]): number {
    return avgVector(absVector(diffVectors(series1, series2)));
};

