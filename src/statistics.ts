
/**
 * @description Max value in a series
 * @param values array of numerical values
 * @param targetAttr attribute to be searched
 * @returns the max element in the series
 */
export function max<T>(values: T[], targetAttr?: keyof T): number;

/**
 * @description Max value in a series
 * @param{array} values array of numerical values
 * @returns the max element in the series
 */
export function max(values: number[]): number;


export function max<T>(values: T[] | number[], targetAttr?: keyof T): number {
    let ret = Number.MIN_VALUE;
    if (values.length == 0)
        return ret;
    if (typeof values[0] === "number") {
        for (var i = 0; i < values.length; i++) {
            if (values[i] > ret) {
                ret = values[i] as number;
            }
        }
    }
    else {
        if (!targetAttr) {
            throw new Error("Target attribute must be specified");
        }
        for (var i = 0; i < values.length; i++) {
            const val = (values[i] as T)[targetAttr] as number;
            if (val > ret) {
                ret = val;
            }
        }
    }
    return ret;
}

//////////////////////////////////////////////////////////

/**
 * @description Min value in a series
 * @param values array of numerical values
 * @param targetAttr attribute to be searched
 * @returns the min element in the series
 */
export function min<T>(values: T[], targetAttr?: keyof T): number;

/**
 * @description Min value in a series
 * @param{array} values array of numerical values
 * @returns the min element in the series
 */
export function min(values: number[]): number;


export function min<T>(values: T[] | number[], targetAttr?: keyof T): number {
    var ret = Number.MAX_VALUE;
    if (values.length == 0)
        return ret;
    if (typeof values[0] === "number") {
        for (var i = 0; i < values.length; i++) {
            if (values[i] < ret) {
                ret = values[i] as number;
            }
        }
    }
    else {
        if (!targetAttr) {
            throw new Error("Target attribute must be specified");
        }
        for (var i = 0; i < values.length; i++) {
            const val = (values[i] as T)[targetAttr] as number;
            if (val < ret) {
                ret = val;
            }
        }
    }
    return ret;
};

//////////////////////////////////////////////////////////

/**
 * @description Mean of values in a serie
 * @param values array of numerical values
 * @param targetAttr attribute to be calculated as mean
 * @return mean of the series
 */
export function mean<T>(values: T[], targetAttr?: keyof T): number;
/**
 * @description Mean of values in a serie
 * @param values array of numerical values
 * @return mean of the series
 */
export function mean(values: number[]): number;

export function mean<T>(values: T[] | number[], targetAttr?: keyof T): number {
    var mean = 0;
    if (values.length == 0)
        return mean;
    if (typeof values[0] === "number") {
        for (var i = 0; i < values.length; i++) {
            mean += values[i] as number;
        }
    }
    else {
        if (!targetAttr) {
            throw new Error("Target attribute must be specified");
        }
        for (var i = 0; i < values.length; i++) {
            mean += (values[i] as T)[targetAttr] as number;
        }
    }
    return mean / values.length;
};


//////////////////////////////////////////////////////////

/**
 * @description Standar deviation of values in a serie.
 * @param values array of numerical values
 * @param targetAttr attribute to be calculated as standard deviation
 * @return standard deviation of the series values.
 */
export function sd<T>(values: T[], targetAttr: keyof T): number;

/**
 * @description Standar deviation of values in a serie.
 * @param values array of numerical values
 * @return standard deviation of the series values.
 */
export function sd<T>(values: number[]): number;

export function sd<T>(values: T[] | number[], targetAttr?: keyof T): number {
    if (values.length === 0) {
        return 0;
    }
    let meanVal = 0;
    let sqrSum = 0;
    if (typeof values[0] === "number") {
        meanVal = mean(values as number[]);
        for (var i = 0; i < values.length; i++) {
            var value = values[i] as number;
            sqrSum += Math.pow(value - meanVal, 2);
        }
    }
    else {
        if (!targetAttr) {
            throw new Error("attribute must be specified");
        }
        meanVal = mean(values as T[], targetAttr);
        for (var i = 0; i < values.length; i++) {
            var value = (values[i] as T)[targetAttr] as number;
            sqrSum += Math.pow(value - meanVal, 2);
        }
    }
    return Math.sqrt(sqrSum / values.length);
};
