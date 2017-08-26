/**
 * By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
 * What is the 10 001st prime number?
 */

function getOrdinalPrime(num) {
    let primeArray = [];

    if (num < 1) {
        console.log("Please input available number.");
    }
    else {
        primeArray.push(2);
        while (primeArray.length < num) {
            let len = primeArray.length,
                followNum = primeArray[len - 1];
            while (primeArray.length === len) {
                followNum++;
                for (let i = 0; i < len; i++) {
                    let divisor = primeArray[i];
                    if ((followNum % divisor !== 0) && (i === len - 1)) {
                        primeArray.push(followNum);
                    }
                    else if (followNum % divisor === 0) {
                        break;
                    }
                }
            }
        }
    }

    console.log('The ' + num + ' prime number is ' + primeArray[num - 1]);
    return primeArray;
}

(function () {
    getOrdinalPrime(10001);
}());
