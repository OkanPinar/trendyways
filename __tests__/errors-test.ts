import 'jest';
import * as tw from "../src";

describe("Error measurements", () => {
	test("MSE mean standard error test", () => {
		let s1 = [] as number[];
		let s2 = [] as number[];
		let mseResult = tw.mse(s1, s2);
		expect(mseResult).toEqual(0);
		s1 = [0, 0, 0, 0, 0];
		s2 = [0, 0, 0, 0, 0];
		mseResult = tw.mse(s1, s2);
		expect(mseResult).toEqual(0);
		s1 = [1.2, 3.4, -7.8, 2.3, 8.9, 5];
		s2 = [2.2, 8.4, 7.8, -2.3, -8.9, 5.1];
		expect(tw.mse(s1, s1)).toEqual(0);
		expect(Math.round(tw.mse(s1, s2) * 1e3) / 1e3).toEqual(101.228);
	});
	test("RMSE root-squared mean standard error test", function () {
		var s1 = [] as number[];
		var s2 = [] as number[];
		var mseResult = tw.rmse(s1, s2);
		expect(mseResult).toBe(0);
		s1 = [0, 0, 0, 0, 0];
		s2 = [0, 0, 0, 0, 0];
		mseResult = tw.rmse(s1, s2);
		expect(mseResult).toBe(0);
		s1 = [1.2, 3.4, -7.8, 2.3, 8.9, 5];
		s2 = [2.2, 8.4, 7.8, -2.3, -8.9, 5.1];
		expect(tw.rmse(s1, s1)).toEqual(0);
		expect(Math.round(tw.rmse(s1, s2) * 1e3) / 1e3).toEqual(10.061);
	});
	test("MAE mean absolute error test", function () {
		var s1 = [] as number[];
		var s2 = [] as number[];
		var mseResult = tw.rmse(s1, s2);
		expect(mseResult).toBe(0);
		s1 = [0, 0, 0, 0, 0];
		s2 = [0, 0, 0, 0, 0];
		mseResult = tw.rmse(s1, s2);
		expect(mseResult).toBe(0);
		s1 = [1.2, 3.4, -7.8, 2.3, 8.9, 5];
		s2 = [2.2, 8.4, 7.8, -2.3, -8.9, 5.1];
		expect(tw.mae(s1, s1)).toEqual(0);
		expect(Math.round(tw.mae(s1, s2) * 1e3) / 1e3).toEqual(7.35);
	});
});
