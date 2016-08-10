
/**
 * Given a roman numeral as input, write a function that converts the roman
 * numeral to a number and outputs it.
 *
 * Example:
 * translateRomanNumeral("XXI") // 21
 *
 * When a smaller numeral appears before a larger one, it becomes
 * a subtractive operation. You can assume only one smaller numeral
 * may appear in front of larger one.
 *
 * Example:
 * translateRomanNumeral("IV") // 4
 *
 * You should return `null` on invalid input.
 */

var DIGIT_VALUES = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

var translateRomanNumeral = function(romanNumeral){
	var numbers = romanNumeral.split('');
	var sum = 0;
	for(var i=0; i<numbers.length-1; i++){
		if(!DIGIT_VALUES[numbers[i]] || !DIGIT_VALUES[numbers[i+1]]){
			return null;
		}
		if(DIGIT_VALUES[numbers[i]] < DIGIT_VALUES[numbers[i+1]]){
			sum -= DIGIT_VALUES[numbers[i]];
		} else {
			sum += DIGIT_VALUES[numbers[i]];
		}
	}
	sum += DIGIT_VALUES[numbers[numbers.length-1]];
	return sum;
};
