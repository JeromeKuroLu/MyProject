/**
 * If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
 * Find the sum of all the multiples of 3 or 5 below 1000.
 */
function findSumMultiplier(product, divisor) {
    let multiplier = 1,
        r = divisor * multiplier;
    while (r < product) {
        multiplier++;
        r = divisor * multiplier;
    }
    return (multiplier * (multiplier - 1) / 2);
}

function getResult() {
    let multiplierOf3 = findSumMultiplier(1000, 3),
        multiplierOf5 = findSumMultiplier(1000, 5),
        multiplierOf15 = findSumMultiplier(1000, 15);
    console.log(multiplierOf3);
    result = multiplierOf3 * 3 + multiplierOf5 * 5 - multiplierOf15 * 15;
    console.log(result);
}

(function () {
    getResult();
}());
