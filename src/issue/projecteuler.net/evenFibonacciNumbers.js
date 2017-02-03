/**
 * Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
 * By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.
 */
function getAllFibNum(upperLimit) {
    if (upperLimit < 1) {
        console.log('There is no such sequence.');
    }
    else {
        if (upperLimit == 1) {
            return [1];
        }
        else if (upperLimit == 2) {
            return [1, 2];
        }
        else {
            var allFibNumArray = [1, 2],
                l = allFibNumArray[1],
                s = allFibNumArray[0],
                n = s + l;
            while (n <= upperLimit) {
                allFibNumArray.push(n);
                s = l;
                l = n;
                n = s + l;
            }
            return allFibNumArray;
        }
    }
}

function calculateSumOfFibSequence(upperLimit) {
    var sum = 0,
        allFibNumArray = getAllFibNum(upperLimit);
    for (var i = 0; i < allFibNumArray.length; i++) {
        if (allFibNumArray[i] % 2 == 0) {
            sum += allFibNumArray[i];
        }
    }
    console.log(allFibNumArray.join(','));
    console.log('the sum is: ' + sum);
}

calculateSumOfFibSequence(4000000);