/**
 * Created by LUJE4 on 1/25/2017.
 */
function findLargestPrimeFactor(product) {
    var sortedPrimeFactorArray = [];

    while (product > 1) {
        var factor = getPrimeFactor(product);
        product = product / factor;
        sortedPrimeFactorArray.push(factor);
    }
    sortedPrimeFactorArray.sort();
    console.log(sortedPrimeFactorArray.join(','));
}

function getPrimeFactor(product) {
    for (var f = 2; f <= product; f++) {
        if (product % f == 0) {
            return f;
        }
    }
}

(function () {
    findLargestPrimeFactor(600851475143);
}());