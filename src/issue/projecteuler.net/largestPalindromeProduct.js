/**
 * Created by LUJE4 on 1/25/2017.
 */
function findLargestPalindromeProduct(factorDigit) {
    var lowRange = Math.pow(10, factorDigit - 1),
        highRange = Math.pow(10, factorDigit),
        cLowRange = highRange - 10,
        cHighRange = highRange - 1,
        palindromeProductArray = [];
    while (cLowRange >= lowRange) {
        for (var i = cHighRange; i >= cLowRange; i--) {
            for (var j = cHighRange; j >= cLowRange; j--) {
                var product = i * j;
                if (isPalindrome(product)) {
                    palindromeProductArray.push(product);
                }
            }
        }
        cHighRange = cLowRange - 1;
        cLowRange -= 10;
    }
    console.log(palindromeProductArray.join(','));
}

function isPalindrome(num) {
    var numStr = num.toString(),
        midIndex = Math.ceil(numStr.length / 2) - 1,
        isPalindrome = true;
    for (var i = 0; i <= midIndex; i++) {
        var startNum = numStr[i],
            endNum = numStr[numStr.length - 1 - i];
        if (startNum != endNum) {
            isPalindrome = false;
            break;
        }
    }
    return isPalindrome;
}

(function () {
    findLargestPalindromeProduct(3);
}());


