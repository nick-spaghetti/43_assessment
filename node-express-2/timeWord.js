function timeWord(time) {
	const hours = parseInt(time.slice(0, 2));
	const minutes = parseInt(time.slice(3));
	let output = "";

	const hoursWords = [
		"midnight",
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine",
		"ten",
		"eleven",
		"noon",
		"twelve",
	];

	const minutesWords = [
		" ",
		"oh one",
		"oh two",
		"oh three",
		"oh four",
		"oh five",
		"oh six",
		"oh seven",
		"oh eight",
		"oh nine",
		"ten",
		"eleven",
		"twelve",
		"thirteen",
		"fourteen",
		"fifteen",
		"sixteen",
		"seventeen",
		"eighteen",
		"nineteen",
		"twenty",
		"twenty-one",
		"twenty-two",
		"twenty-three",
		"twenty-four",
		"twenty-five",
		"twenty-six",
		"twenty-seven",
		"twenty-eight",
		"twenty-nine",
		"thirty",
		"thirty-one",
		"thirty-two",
		"thirty-three",
		"thirty-four",
		"thirty-five",
		"thirty-six",
		"thirty-seven",
		"thirty-eight",
		"thirty-nine",
		"forty",
		"forty-one",
		"forty-two",
		"forty-three",
		"forty-four",
		"forty-five",
		"forty-six",
		"forty-seven",
		"forty-eight",
		"forty-nine",
		"fifty",
		"fifty-one",
		"fifty-two",
		"fifty-three",
		"fifty-four",
		"fifty-five",
		"fifty-six",
		"fifty-seven",
		"fifty-eight",
		"fifty-nine",
	];

	if (hours === 0 && minutes === 0) {
		output = hoursWords[0];
	} else if (hours === 12 && minutes === 0) {
		output = hoursWords[12];
	} else {
		if (hours > 12) {
			output += hoursWords[hours % 12];
		} else {
			output += hoursWords[hours];
		}
		if (minutes === 0) {
			output += " o'clock";
		} else {
			if (minutes < 10) {
				output += " " + minutesWords[minutes];
			} else {
				output += " " + minutesWords[minutes];
			}
		}
		if (hours <= 11) {
			output += " am";
		} else {
			output += " pm";
		}
	}

	return output;
}

module.exports = { timeWord };
