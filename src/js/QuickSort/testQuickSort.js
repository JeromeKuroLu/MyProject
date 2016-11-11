/**
 * Created by LUJE4 on 11/10/2016.
 */
var quickSort = require('./quickSort').quickSort;
(function () {
    var arr = [10, 3, 9, 11, 7, 8, 10, 6, 3, 15, 7, 9, 12, 2, 4, 17, 1, 6, 18];
    quickSort(arr, 0, arr.length - 1, true);
    console.log(arr);
})();
