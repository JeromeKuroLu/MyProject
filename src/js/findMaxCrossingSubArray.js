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
    for (var i = midIndex + 1; i <= endIndex; i++) {
        rightSum += array[i];
        if (rightSum > rightSubArrayMaxSum) {
            rightSubArrayMaxSum = rightSum;
            resultRightIndex = i;
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