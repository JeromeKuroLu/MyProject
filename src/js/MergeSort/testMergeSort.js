/**
 * Created by Jerome on 2016/11/1.
 */
var mergeSortArray = require('./mergeSort').mergeSortArray,
    mergeSort = require('./mergeSort').mergeSort;
(function () {
    var arr = [3, 8, 10, 15, 2, 7, 9, 11, 12, 9, 6, 1];
    console.log(mergeSortArray(arr));
    console.log(mergeSort(arr, 1, arr.length - 1));
})();