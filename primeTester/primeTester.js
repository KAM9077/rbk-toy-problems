/**
 * A prime number is an integer number that cannot be divided by any number 
 * except itself and 1. Write a function that accepts a number and returns true if it's
 * a prime number, false if it's not.
 */

var primeTester = function(n) {

  	if(n===1 || n===2){
  		return true;
  	}
 	for(var i=2;i<n;i++){
 		if(n%i !== 0){
 			return true;
 		} 
 		return false;
 	}
};

 /* Extra credit: Write a function that generates a list of all prime numbers
  * in a user-specified range (inclusive). If you're not quite sure where to start,
  * check out the Sieve of Eratosthenes on Wikipedia. (And if you're feeling
  * saucy, check out the Sieve of Atkin.)
  */


var primeSieve = function(start, end) {
  var arr=[];
  for(var i=start;i<=end;i++){
  	if(primeTester(i)===true){
  		arr.push(i);
    }
  }
  return arr;
};
