
function findPrimeNumber(rangeNum) {
    var primeArray = [];

    if (rangeNum > 2) {
        primeArray.push(2);
    }

    for (var i = 3; i <= rangeNum; i++) {
        for (var j = 0; j < primeArray.length; j++) {
            var divisor = primeArray[j];
            if (i % divisor == 0) {
                break;
            }
            else if (i % divisor != 0 && j == primeArray.length - 1) {
                primeArray.push(i);
            }
        }
    }
    console.log(primeArray.join(','));
    var sum = 0;
    for (var t = 0; t < primeArray.length; t++) {
        sum += primeArray[t];
    }
    console.log('The sum is ' + sum);
    return primeArray;
}

// (function () {
//     findPrimeNumber(2000000);
// }());

module.exports = {
    findPrimeNumber: findPrimeNumber
};