/**
 * Created by Jerome on 2016/11/1.
 */
var mergeSortArray = require('./mergeSort').mergeSortArray;
(function test() {
    var arr = [3, 8, 10, 15, 2, 7, 9, 11, 12, 9, 6, 1];
    console.log(mergeSortArray(arr));
})();