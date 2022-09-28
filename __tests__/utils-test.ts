import 'jest';
import * as tw from "../src";


describe("Utils test", () => {
	test("retrieves the attr", () => {
		let obj = { o: 45, c: 46, h: 40, l: 39 };
		let value = tw.resolveParam(obj, ["o"]);
		expect(value).toEqual(45);
	});
	test("retrieves the attrs in order", () => {
		let obj = { o: 45, open: 46 };
		let value = tw.resolveParam(obj, ["open", "o"]);
		expect(value).toEqual(46);
	});
	test("reverseAppend append values", () => {
		let refList = [{ val: 5 }, { val: 6 }, { val: 7 }, { val: 8 }];
		let addList = [{ id: 1 }, { id: 2 }];
		let ret = tw.reverseAppend(refList, addList, 'id');
		expect(ret[refList.length - 1].id).toEqual(2);
		expect(ret[refList.length - 2].id).toEqual(1);
	});
});
