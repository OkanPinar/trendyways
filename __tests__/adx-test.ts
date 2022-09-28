import 'jest';
import * as tr from "../src";

describe("Average Directional Index Test", () => {
    test("Check the sampleFunction function", () => {
        var data = [
            { high: 30.20, low: 29.41, close: 29.87 }, { high: 30.28, low: 29.32, close: 30.24 }, { high: 30.45, low: 29.96, close: 30.10 },
            { high: 29.35, low: 28.74, close: 28.90 }, { high: 29.35, low: 28.56, close: 28.92 }, { high: 29.29, low: 28.41, close: 28.48 },
            { high: 28.83, low: 28.08, close: 28.56 }, { high: 28.73, low: 27.43, close: 27.56 }, { high: 28.67, low: 27.66, close: 28.47 },
            { high: 28.85, low: 27.83, close: 28.28 }, { high: 28.64, low: 27.40, close: 27.49 }, { high: 27.68, low: 27.09, close: 27.23 },
            { high: 27.21, low: 26.18, close: 26.35 }, { high: 26.87, low: 26.13, close: 26.33 }, { high: 27.41, low: 26.63, close: 27.03 },
            { high: 26.94, low: 26.13, close: 26.22 }, { high: 26.52, low: 25.43, close: 26.01 }, { high: 26.52, low: 25.35, close: 25.46 },
            { high: 27.09, low: 25.88, close: 27.03 }, { high: 27.69, low: 26.96, close: 27.45 }, { high: 28.45, low: 27.14, close: 28.36 },
            { high: 28.53, low: 28.01, close: 28.43 }, { high: 28.67, low: 27.88, close: 27.95 }, { high: 29.01, low: 27.99, close: 29.01 },
            { high: 29.87, low: 28.76, close: 29.38 }, { high: 29.80, low: 29.14, close: 29.36 }, { high: 29.75, low: 28.71, close: 28.91 },
            { high: 30.65, low: 28.93, close: 30.61 }, { high: 30.60, low: 30.03, close: 30.05 }, { high: 30.76, low: 29.39, close: 30.19 },
            { high: 31.17, low: 30.14, close: 31.12 }, { high: 30.89, low: 30.43, close: 30.54 }, { high: 30.04, low: 29.35, close: 29.78 },
            { high: 30.66, low: 29.99, close: 30.04 }, { high: 30.60, low: 29.52, close: 30.49 }, { high: 31.97, low: 30.94, close: 31.47 },
            { high: 32.10, low: 31.54, close: 32.05 }, { high: 32.03, low: 31.36, close: 31.97 }];
        let adxValues = tr.adx(data);
        expect(adxValues[28].adx).not.toBeUndefined();
        expect((adxValues[28].adx as number).toFixed(2)).toEqual("33.71");
    });
});

