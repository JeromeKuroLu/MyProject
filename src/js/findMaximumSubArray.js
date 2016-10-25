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
var array = [13,-3,-25,20,-3,-16,-23,18,20,-7,12,-5,-22,15,-4,7,-11,17,-5,-3,-5,7,-10,15,2];
console.log(findMaximumSubArray(array, 0, array.length - 1));