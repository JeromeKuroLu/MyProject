/**
 * A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
 a^2 + b^2 = c2
 For example, 3^2 + 4^2 = 9 + 16 = 25 = 52.
 There exists exactly one Pythagorean triplet for which a + b + c = 1000.
 Find the product abc.

 *  My middle formula b = (s^2 - 2as) / 2(s - a)
 */

function findPythagoreanTripletBySum(sum) {
    let ra,
        rb,
        rc;
    if (sum < 1) {
        console.log("Please input available number.")
    }
    else {
        let upperLimit = Math.floor(sum / 3);
        for (let a = 3; a < upperLimit; a++) {
            let b = (Math.pow(sum, 2) - 2 * a * sum) / (2 * (sum - a)),
                ib = Math.floor(b);
            if (ib === b && b > a) {
                ra = a;
                rb = b;
                rc = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
                break;
            }
            else if (a == upperLimit - 1) {
                console.log("There is no special Pythagorean Triplet.");
            }
        }
    }
    if (ra && rb && rc) {
        console.log("The Pythagorean Triplet are: " + ra + ", " + rb + ", " + rc);
        console.log("The Product is " + ra * rb * rc);
    }
}

(function () {
    findPythagoreanTripletBySum(1000);
}());
