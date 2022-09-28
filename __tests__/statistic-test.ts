import 'jest';
import * as tw from "../src";

describe("Statistic test", () => {
    
    test("Max value in a simple serie", () => {
        var serie = [0, 6, 2, 7, 8, 9];
        expect(tw.max(serie)).toEqual(9);
    });

    test("Min value in a simple serie", function () {
        var serie = [0, 6, 2, 7, 8, 9];
        expect(tw.min(serie)).toEqual(0);
    });

    test("Mean of zero is zero", function () {
        var serie = [] as number[];
        expect(tw.mean(serie)).toEqual(0);
    });

    test("Mean of a simple serie", function () {
        var serie = [2,6,5,7,10,9,12,5]
        expect(tw.mean(serie)).toEqual(7);
    });

    test("Standard deviation of a serie", function () {
        var serie = [2,4,4,4,5,5,7,9]
        expect(tw.sd(serie)).toEqual(2);
    });

});
