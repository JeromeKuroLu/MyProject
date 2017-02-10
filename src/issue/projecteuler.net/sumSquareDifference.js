/**
 * The sum of the squares of the first ten natural numbers is,
 * 1^2 + 2^2 + ... + 10^2 = 385
 * The square of the sum of the first ten natural numbers is,
 * (1 + 2 + ... + 10)^2 = 55^2 = 3025
 * Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.
 * Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.
 */

function getDifference(rangeNum) {
    if (rangeNum < 1) {
        console.log("Please input positive number.")
    }
    else {
        var firstMultiplier = 1,
            difference = 0;
        while (firstMultiplier < rangeNum) {
            for (var secondMultiplier = firstMultiplier + 1; secondMultiplier <= rangeNum; secondMultiplier++) {
                difference += firstMultiplier * secondMultiplier;
            }
            firstMultiplier++;
        }
        difference *= 2;
        console.log("The difference is " + difference);
        return difference;
    }
}

(function () {
    getDifference(100);
}());