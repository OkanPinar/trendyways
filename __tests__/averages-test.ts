import 'jest';
import * as tw from "../src";

describe("Averages Test", () => {
	test("Moving Average of a sample serie", () => {
		var serie = [{ close: 2 }, { close: 6 }, { close: 5 }, { close: 7 }, { close: 10 }, { close: 9 }, { close: 12 }, { close: 5 }];
		var correctValues = [5, 7, 7.75, 9.5, 9];
		const period = 4;
		var movingAvg = tw.ma(serie, period, 'close');
		expect(movingAvg.length).toEqual(serie.length);
		for (var i = 0; i < serie.length - period + 1; i++) {
			expect(movingAvg[i + period - 1].ma).toEqual(correctValues[i]);
		}
	});
	test("Moving Average of a vector", () => {
		var serie = [2, 6, 5, 7, 10, 9, 12, 5];
		const period = 4;
		var movingAvg = tw.ma(serie, period);
		var correctValues = [5, 7, 7.75, 9.5, 9];
		expect(movingAvg.length).toEqual(correctValues.length);
		for (var i = 0; i < serie.length - period + 1; i++) {
			expect(movingAvg[i]).toEqual(correctValues[i]);
		}
	});
	test("Exponential moving average of serie", () => {
		var serie = [{ close: 64.75 }, { close: 63.79 }, { close: 63.73 }, { close: 63.73 }, { close: 63.55 },
		{ close: 63.19 }, { close: 63.91 }, { close: 63.85 }, { close: 62.95 }, { close: 63.37 },
		{ close: 61.33 }, { close: 61.51 }, { close: 61.87 }, { close: 60.25 }, { close: 59.35 },
		{ close: 59.95 }, { close: 58.93 }, { close: 57.68 }, { close: 58.82 }, { close: 58.87 }];
		var expected = [63.682, 63.254, 62.937, 62.743, 62.290,
			61.755, 61.427, 60.973, 60.374, 60.092,
			59.870];
		const period = 10;
		var result = tw.ema(serie, period, 'close');
		expect(result.length).toEqual(serie.length);
		for (var i = 0; i < expected.length; i++) {
			expect(Math.round(result[i + period - 1].ema * 1e3) / 1e3).toEqual(expected[i]);
		}
	});
	test("Exponential moving average of vector", () => {
		var serie = [64.75, 63.79, 63.73, 63.73, 63.55,
			63.19, 63.91, 63.85, 62.95, 63.37,
			61.33, 61.51, 61.87, 60.25, 59.35,
			59.95, 58.93, 57.68, 58.82, 58.87];
		var expected = [63.682, 63.254, 62.937, 62.743, 62.290,
			61.755, 61.427, 60.973, 60.374, 60.092,
			59.870];
		const period = 10;
		var result = tw.ema(serie, period);
		expect(result.length).toEqual(expected.length);
		for (var i = 0; i < result.length; i++) {
			expect(Math.round(result[i] * 1e3) / 1e3).toEqual(expected[i]);
		}
	});
	test("Weighted moving average or serie", function () {
		var serie = [{ close: 1 }, { close: 2 }, { close: 3 }, { close: 4 }, { close: 5 }, { close: 6 }];
		var expected = [0.5, 0.833, 1.167, 1.5];
		var weights = [0.6, 0.3, 0.1];
		var result = tw.wma(serie, weights, 'close');
		expect(result.length).toEqual(serie.length);
		for (var i = 0; i < expected.length; i++) {
			expect(Math.round(result[i + weights.length - 1].wma * 1e3) / 1e3).toEqual(expected[i]);
		}
	});
	test("Weighted moving average of vector", function () {
		var vector = [1, 2, 3, 4, 5, 6];
		var expected = [0.5, 0.833, 1.167, 1.5];
		var weights = [0.6, 0.3, 0.1];
		var result = tw.wma(vector, weights);
		expect(result.length).toEqual(expected.length);
		for (var i = 0; i < expected.length; i++) {
			expect(Math.round(result[i] * 1e3) / 1e3).toEqual(expected[i]);
		}
	});
});
