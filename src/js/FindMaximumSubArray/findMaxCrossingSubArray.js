/**
 * Created by Jerome on 2016/9/21.
 */
function findMaxCrossingSubArray(array, startIndex, midIndex, endIndex) {
    var leftSubArrayMaxSum = Number.NEGATIVE_INFINITY,
        rightSubArrayMaxSum = Number.NEGATIVE_INFINITY,
        resultLeftIndex,
        resultRightIndex,
        leftSum = 0,
        rightSum = 0;
    for (var i = midIndex; i >= startIndex; i--) {
        leftSum += array[i];
        if (leftSum > leftSubArrayMaxSum) {
            leftSubArrayMaxSum = leftSum;
            resultLeftIndex = i;
        }
    }
    for (var j = midIndex + 1; j <= endIndex; j++) {
        rightSum += array[j];
        if (rightSum > rightSubArrayMaxSum) {
            rightSubArrayMaxSum = rightSum;
            resultRightIndex = j;
        }
    }
    return {
        startIndex: resultLeftIndex,
        endIndex: resultRightIndex,
        sum: leftSubArrayMaxSum + rightSubArrayMaxSum
    }
}

module.exports = {
    findMaxCrossingSubArray: findMaxCrossingSubArray
};