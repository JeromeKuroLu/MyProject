/**
 * A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
 * Find the largest palindrome made from the product of two 3-digit numbers.
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