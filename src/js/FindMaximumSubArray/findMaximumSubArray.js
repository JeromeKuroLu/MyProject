/**
 * Created by Jerome on 2016/9/21.
 */
var findMaxCrossingSubArray = require('./findMaxCrossingSubArray').findMaxCrossingSubArray;
function findMaximumSubArray(array, startIndex, endIndex) {
    if (startIndex == endIndex) {
        return {
            startIndex: startIndex,
            endIndex: endIndex,
            sum: array[startIndex]
        }
    }
    else {
        var midIndex = Math.floor((endIndex + startIndex - 1) / 2);
        var subArrayMaxOnLeft = findMaximumSubArray(array, startIndex, midIndex),
            subArrayMaxOnRight = findMaximumSubArray(array, midIndex + 1, endIndex),
            subArrayMaxCrossMid = findMaxCrossingSubArray(array, startIndex, midIndex, endIndex);

        if (subArrayMaxOnLeft.sum >= subArrayMaxOnRight.sum && subArrayMaxOnLeft.sum >= subArrayMaxCrossMid.sum) {
            return subArrayMaxOnLeft;
        }
        else if (subArrayMaxOnRight.sum >= subArrayMaxOnLeft.sum && subArrayMaxOnRight.sum >= subArrayMaxCrossMid.sum) {
            return subArrayMaxOnRight;
        }
        else {
            return subArrayMaxCrossMid;
        }
    }
}

module.exports = {
    findMaximumSubArray: findMaximumSubArray
};