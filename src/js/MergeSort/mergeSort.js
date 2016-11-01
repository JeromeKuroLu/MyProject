/**
 * Created by Jerome on 2016/11/1.
 */
var merge = require('./merge').merge;

function mergeSort(arr, startIdx, endIdx) {
    var midIdx = Math.floor((startIdx + endIdx) / 2),
        preArr = [],
        postArr = [];

    if (startIdx == endIdx) {
        return arr;
    }
    for (var i = startIdx; i <= midIdx; i++) {
        preArr.push(arr[i]);
    }
    for (var j = endIdx; j > midIdx; j--) {
        postArr.unshift(arr[j]);
    }
    preArr = mergeSort(preArr, 0, preArr.length - 1);
    postArr = mergeSort(postArr, 0, postArr.length - 1);
    arr = merge(preArr, postArr);
    return arr;
}

function mergeSortArray(arr) {
    return mergeSort(arr, 0, arr.length - 1);
}

module.exports = {
    mergeSort: mergeSort,
    mergeSortArray: mergeSortArray
};