
/**
 * @description This is an internal function and is not supposed to be used directly. This function moves the window of size value along the values, applying the defined function on each chunk.
 * @param {object} objects list
 * @param {attrs} list of attributes to look for
 * @return {value} object attribute
 */
export function resolveParam<T = any>(obj: T, attrs: Array<keyof T>): T[keyof T] | T {
    for (var i = 0; i < attrs.length; i++) {
        var field = attrs[i];
        if (obj[field] != undefined)
            return obj[field];
        else
            return obj;
    }
    throw new Error("No valid (" + attrs + ") found in obj");
}

/**
 * @description returns the given value if the object is undefined
 * @param obj object to check
 * @param val value to return
 * @returns 
 */
export function valueIfUndef<T = any, Tout = any>(obj: T, val: Tout): Tout | T {
    return isUndef(obj) ? val : obj;
};

/**
 * @description check given value is undefined
 * @param obj object to check
 * @returns 
 */
export function isUndef(obj: any): boolean {
    return typeof obj === "undefined";
};


export function reverseAppend<T, Tadd, K extends keyof Tadd>(refList: T[], addList: Tadd[], field: K): Array<T & Pick<Tadd, K>>;
export function reverseAppend<T, Tadd, Key extends string>(refList: T[], addList: Tadd[], field: Key): Array<T & { [K in Key]: Tadd; }>;
export function reverseAppend<T, Key extends string>(refList: T[], addList: number[] | any[], field: Key): Array<T & { [K in Key]: number; }>;
/**
 * @description append given list to target as reversed order
 * @param refList target list
 * @param addList add list
 * @param field parameters to add
 * @returns target list
 */
export function reverseAppend(refList: any[], addList: any[], field: string) {
    if (isUndef(field))
        throw new Error("Unable to append values, no field given");
    addList.forEach(function (add: any, i) {
        refList[refList.length - addList.length + i][field] = add[field] ? add[field] : add;
    });
    return refList;
};

/**
 * @description vectorize the given property of the given object
 * @param list list of objects
 * @param attr attribute to vectorize
 * @returns vector of the given attribute
 */
export function flat<T>(list: T[], attr: keyof T): Array<number> {
    return list.map(function (i) {
        return isUndef(i[attr]) ? 0 : i[attr] as number;
    });
};

/**
 * @description vectorize the given property of the given object
 * @param list list of objects
 * @param attr attribute to be filled
 * @param value fill value
 * @returns list of objects
 */
export function fill<T>(list: T[], attr: keyof T, value: T[keyof T]): T[] {
    list.forEach(function (l) {
        if (isUndef(l[attr]))
            l[attr] = value;
    });
    return list;
};

/**
 * @description This is an internal function and is not supposed to be used directly. This function moves the window of size value along the values, applying the defined function on each chunk.
 * @param {array} values values array
 * @param {value} value size of the window
 * @param {function} fun function to apply on each chunk
 * @return {array} values returned by the given function in each chunck
 */
export function windowOp<Tout>(values: any[], value: number, fun: (...args: any[]) => Tout, targetAttr?: any): Tout[] {
    let result = new Array();
    for (var i = value; i <= values.length; i++) {
        var windowVal = fun(values.slice(i - value, i), targetAttr);
        result.push(windowVal);
    }
    return result;
};

