/**
 * 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
 * What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
 */
let findPrimeNumber = require('../findPrimeNumber').findPrimeNumber;

function getSmallestMultiple(rangeNum) {
    let primeArray = findPrimeNumber(rangeNum),
        result = 1;
    for (let m = 0; m < primeArray.length; m++) {
        let primeNum = primeArray[m],
            n = 1,
            newNum = primeNum;
        while (newNum * primeNum <= rangeNum) {
            n++;
            newNum = Math.pow(primeNum, n);
        }
        if (n > 1) {
            primeArray.splice(m, 1, newNum);
        }
    }
    for (let i = 0; i < primeArray.length; i++) {
        result *= primeArray[i];
    }
    console.log(result);
    return result;
}

(function () {
    getSmallestMultiple(20);
}());