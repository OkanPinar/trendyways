import 'jest';
import * as tw from "../src";

describe("Averages Test", () => {
	test("Bollinger bands values for a sample serie", () => {
		var serie = [{ close: 2.1 }, { close: 4.3 }, { close: 4.5 }, { close: 4.8 }, { close: 5.0 }, { close: 5.8 }, { close: 7.1 }, { close: 9.1 }];
		for (var k = 1; k < 4; k++) {
			for (var n = 1; n < serie.length; n++) {
				var bands = tw.bollinger(serie, n, k, 'close'); // window size n = 3, k = 3
				for (var i = n; i < serie.length - n + 1; i++) {
					var stdDev = tw.sd(serie.slice(i, i + n), 'close');
					expect(bands[i].ub).toEqual(bands[i].ma + stdDev * k);
					expect(bands[i].lb).toEqual(bands[i].ma - stdDev * k);
				}
			}
		}
	});
});
