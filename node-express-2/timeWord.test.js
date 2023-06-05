const { timeWord } = require("./timeWord");

describe("#timeWord", () => {
	test("it is a function", () => {
		expect(typeof timeWord).toBe("function");
	});
	test("convert am time correctly", () => {
		expect(timeWord("00:00")).toBe("midnight");
		// expect(timeWord("00:12")).toBe("twelve twelve am");
		expect(timeWord("01:00")).toBe("one o'clock am");
		expect(timeWord("06:01")).toBe("six oh one am");
		expect(timeWord("06:10")).toBe("six ten am");
		expect(timeWord("06:18")).toBe("six eighteen am");
		expect(timeWord("06:30")).toBe("six thirty am");
		expect(timeWord("10:34")).toBe("ten thirty-four am");
	});
	test("convert pm time correctly", () => {
		expect(timeWord("12:00")).toBe("noon");
		expect(timeWord("13:00")).toBe("one o'clock pm");
		expect(timeWord("15:23")).toBe("three twenty-three pm");
		// expect(timeWord("12:09")).toBe("twelve oh nine pm");
		expect(timeWord("23:23")).toBe("eleven twenty-three pm");
	});
});
