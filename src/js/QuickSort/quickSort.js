/**
 * Created by LUJE4 on 11/10/2016.
 */
var partition = require('./partition').partition;

// status == true is positive sequence like 1, 2, 3
function quickSort(arr, startIndex, endIndex, status) {
    if (endIndex - startIndex > 0) {
        // console.log("start index: " + startIndex + ' end index ' + endIndex);
        var pivotIndex = parseInt((Math.random() * (endIndex - startIndex + 1) + startIndex), 10),
            t = partition(arr, startIndex, endIndex, pivotIndex, status);
        quickSort(arr, startIndex, t - 1, status);
        quickSort(arr, t + 1, endIndex, status);
    }
}

module.exports = {
    quickSort: quickSort
};