import 'jest';
import * as tw from "../src";

describe("Supports and resistances", () => {
	test("Floor pivot level, supports and resistances", function () {
		var point = [{ close: 15, high: 18, low: 5 }];
		var values = tw.floorPivots(point);
		expect(Math.round(values[0].floor.r3 * 1e3) / 1e3).toEqual(33.333);
		expect(Math.round(values[0].floor.r2 * 1e3) / 1e3).toEqual(25.667);
		expect(Math.round(values[0].floor.pl * 1e3) / 1e3).toEqual(12.667);
		expect(Math.round(values[0].floor.r1 * 1e3) / 1e3).toEqual(20.333);
		expect(Math.round(values[0].floor.s1 * 1e3) / 1e3).toEqual(7.333);
		expect(Math.round(values[0].floor.s2 * 1e3) / 1e3).toEqual(-0.333);
		expect(Math.round(values[0].floor.s3 * 1e3) / 1e3).toEqual(-5.667);
	});
	test("Tom Demarks's predicted low and high value (support and resistance)", function () {
		var points = [{ high: 10, low: 5, open: 6, close: 7 },
		{ high: 15, low: 8, open: 10, close: 11 },
		{ high: 25, low: 10, open: 17, close: 12 }];
		var values = tw.tomDemarksPoints(points);
		expect(values.length).toEqual(3);
		// first predicted values
		expect(values[0].tom.newLow).toEqual(6);
		expect(values[0].tom.newHigh).toEqual(11);
		// second predicted values
		expect(values[1].tom.newLow).toEqual(9.5);
		expect(values[1].tom.newHigh).toEqual(16.5);
		// third predicted values
		expect(values[2].tom.newLow).toEqual(3.5);
		expect(values[2].tom.newHigh).toEqual(18.5);
	});
	test("Woodies predicted points (support and resistance)", function () {
		var points = [{ high: 10, low: 5, close: 7 }, { high: 15, low: 8, close: 11 },
		{ high: 25, low: 10, close: 12 }, { high: 10, low: 8, close: 9 }];
		var values = tw.woodiesPoints(points);
		expect(values.length).toEqual(4);
		// first predicted values
		expect(values[0].wood.pivot).toEqual(7.25);
		expect(values[0].wood.r1).toEqual(9.5);
		expect(values[0].wood.r2).toEqual(12.25);
		expect(values[0].wood.s1).toEqual(4.5);
		expect(values[0].wood.s2).toEqual(2.25);
		// second predicted values
		expect(values[1].wood.pivot).toEqual(11.25);
		expect(values[1].wood.r1).toEqual(14.5);
		expect(values[1].wood.r2).toEqual(18.25);
		expect(values[1].wood.s1).toEqual(7.5);
		expect(values[1].wood.s2).toEqual(4.25);
		// third predicted values
		expect(values[2].wood.pivot).toEqual(14.75);
		expect(values[2].wood.r1).toEqual(19.5);
		expect(values[2].wood.r2).toEqual(29.75);
		expect(values[2].wood.s1).toEqual(4.5);
		expect(values[2].wood.s2).toEqual(-0.25);
		// fourth predicted values
		expect(values[3].wood.pivot).toEqual(9);
		expect(values[3].wood.r1).toEqual(10);
		expect(values[3].wood.r2).toEqual(11);
		expect(values[3].wood.s1).toEqual(8);
		expect(values[3].wood.s2).toEqual(7);
	});
	test("Camarilla predicted points (supports and resistances)", function () {
		var points = [
			{ high: 10, low: 5, close: 7 },
			{ high: 15, low: 8, close: 11 },
			{ high: 25, low: 10, close: 12 },
			{ high: 10, low: 8, close: 9 }
		];
		var values = tw.camarillaPoints(points);
		expect(values.length).toEqual(4);
		// first predicted values
		expect(Math.round(values[0].cam.r1 * 1e3) / 1e3).toEqual(7.458);
		expect(Math.round(values[0].cam.r2 * 1e3) / 1e3).toEqual(7.917);
		expect(Math.round(values[0].cam.r3 * 1e3) / 1e3).toEqual(8.375);
		expect(Math.round(values[0].cam.r4 * 1e3) / 1e3).toEqual(9.75);
		expect(Math.round(values[0].cam.s1 * 1e3) / 1e3).toEqual(6.542);
		expect(Math.round(values[0].cam.s2 * 1e3) / 1e3).toEqual(6.083);
		expect(Math.round(values[0].cam.s3 * 1e3) / 1e3).toEqual(5.625);
		expect(Math.round(values[0].cam.s4 * 1e3) / 1e3).toEqual(4.25);
		// second predicted values
		expect(Math.round(values[1].cam.r1 * 1e3) / 1e3).toEqual(11.642);
		expect(Math.round(values[1].cam.r2 * 1e3) / 1e3).toEqual(12.283);
		expect(Math.round(values[1].cam.r3 * 1e3) / 1e3).toEqual(12.925);
		expect(Math.round(values[1].cam.r4 * 1e3) / 1e3).toEqual(14.850);
		expect(Math.round(values[1].cam.s1 * 1e3) / 1e3).toEqual(10.358);
		expect(Math.round(values[1].cam.s2 * 1e3) / 1e3).toEqual(9.717);
		expect(Math.round(values[1].cam.s3 * 1e3) / 1e3).toEqual(9.075);
		expect(Math.round(values[1].cam.s4 * 1e3) / 1e3).toEqual(7.150);
		// third predicted values
		expect(Math.round(values[2].cam.r1 * 1e3) / 1e3).toEqual(13.375);
		expect(Math.round(values[2].cam.r2 * 1e3) / 1e3).toEqual(14.75);
		expect(Math.round(values[2].cam.r3 * 1e3) / 1e3).toEqual(16.125);
		expect(Math.round(values[2].cam.r4 * 1e3) / 1e3).toEqual(20.25);
		expect(Math.round(values[2].cam.s1 * 1e3) / 1e3).toEqual(10.625);
		expect(Math.round(values[2].cam.s2 * 1e3) / 1e3).toEqual(9.25);
		expect(Math.round(values[2].cam.s3 * 1e3) / 1e3).toEqual(7.875);
		expect(Math.round(values[2].cam.s4 * 1e3) / 1e3).toEqual(3.75);
		// fourth predicted values
		expect(Math.round(values[3].cam.r1 * 1e3) / 1e3).toEqual(9.183);
		expect(Math.round(values[3].cam.r2 * 1e3) / 1e3).toEqual(9.367);
		expect(Math.round(values[3].cam.r3 * 1e3) / 1e3).toEqual(9.55);
		expect(Math.round(values[3].cam.r4 * 1e3) / 1e3).toEqual(10.1);
		expect(Math.round(values[3].cam.s1 * 1e3) / 1e3).toEqual(8.817);
		expect(Math.round(values[3].cam.s2 * 1e3) / 1e3).toEqual(8.633);
		expect(Math.round(values[3].cam.s3 * 1e3) / 1e3).toEqual(8.45);
		expect(Math.round(values[3].cam.s4 * 1e3) / 1e3).toEqual(7.9);
	});
	test("Fibonacci retracement uptrend ([5,8,7,6,9], [10,12,9,15,16], 'UPTREND')", function () {
		var points = [{ high: 10, low: 5 }, { high: 12, low: 8 }, { high: 9, low: 7 }, { high: 15, low: 6 }, { high: 16, low: 9 }];
		var values = tw.fibonacciRetrs(points, tw.eTrend.uptrend);
		expect(values.length).toEqual(5);
		for (var i = 0; i < values.length; i++) {
			expect(values[i].length).toBe(6);
		}
		var solsUptrend = [[10, 8.09, 7.5, 6.91, 6.18, 5],
		[12, 10.47, 10, 9.53, 8.94, 8],
		[9, 8.24, 8, 7.76, 7.47, 7],
		[15, 11.56, 10.50, 9.44, 8.12, 6],
		[16, 13.33, 12.50, 11.67, 10.65, 9]];
		var retracement = [100, 61.8, 50, 38.2, 23.6, 0]; // only for the text output
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 6; j++) {
				expect(values[i][j].toFixed(2)).toBe(solsUptrend[i][j].toFixed(2));
			}
		}
	});
	test("Fibonacci retracement uptrend([10,9,5,7,2], [5,6,3,6,1], 'DOWNTREND')", function () {
		const points = [{ high: 10, low: 5 }, { high: 9, low: 6 }, { high: 5, low: 3 }, { high: 7, low: 6 }, { high: 2, low: 1 }];
		const values = tw.fibonacciRetrs(points, tw.eTrend.downtrend);
		expect(values.length).toEqual(5);
		for (var i = 0; i < values.length; i++) {
			expect(values[i].length).toBe(6);
		}
		var solsDownTrend = [[5, 6.91, 7.5, 8.09, 8.82, 10],
		[6, 7.15, 7.5, 7.85, 8.29, 9],
		[3, 3.76, 4, 4.24, 4.53, 5],
		[6, 6.38, 6.5, 6.62, 6.76, 7],
		[1, 1.38, 1.5, 1.62, 1.76, 2]];
		var retracement = [100, 61.8, 50, 38.2, 23.6, 0]; // only for the text output
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 6; j++) {
				expect(values[i][j].toFixed(2)).toBe(solsDownTrend[i][j].toFixed(2));
			}
		}
	});
});

