/**
 * Created by LUJE4 on 1/25/2017.
 */
function findSumMultiplier(product, divisor) {
    var multiplier = 1,
        r = divisor * multiplier;
    while (r < product) {
        multiplier++;
        r = divisor * multiplier;
    }
    return (multiplier * (multiplier - 1) / 2);
}

function getResult() {
    var multiplierOf3 = findSumMultiplier(1000, 3),
        multiplierOf5 = findSumMultiplier(1000, 5),
        multiplierOf15 = findSumMultiplier(1000, 15);
    console.log(multiplierOf3);
    result = multiplierOf3 * 3 + multiplierOf5 * 5 - multiplierOf15 * 15;
    console.log(result);
}

(function () {
    getResult();
}());
