/**
 * Created by LUJE4 on 1/24/2017.
 */
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
    return primeArray;
}

(function () {
    findPrimeNumber(231879);
}());