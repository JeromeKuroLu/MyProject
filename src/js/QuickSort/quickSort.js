/**
 * Created by LUJE4 on 11/10/2016.
 */
var partion = require('./partition').partition;

// status == true is positive sequence like 1, 2, 3
function quickSort(arr, status) {
    if (arr.length > 1) {
        var pivotIndex = parseInt(Math.random() * arr.length, 10),
            t = partion(arr, pivotIndex, status),
            leftSubArr = arr.slice(0, t),
            rightSubArr = arr.slice(t + 1);
        quickSort(leftSubArr, status);
        quickSort(rightSubArr, status);
    }
}

module.exports = {
    quickSort: quickSort
};