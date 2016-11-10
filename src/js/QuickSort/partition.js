/**
 * Created by LUJE4 on 11/10/2016.
 */
function partition(arr, pivotIndex, status) {
    var boundaryIndex = -1,
        pivotValue = arr[pivotIndex],
        endIndex = arr.length - 1;

    if (pivotIndex !== endIndex) {
        arr[pivotIndex] = arr[endIndex];
        arr[endIndex] = pivotValue;
    }

    for (var i = 0; i < endIndex; i++) {
        var item = arr[i];
        // status == true is positive sequence like 1, 2, 3
        if ((status || item > pivotValue) && (!status || item < pivotValue)) {
            boundaryIndex++;
            arr[i] = arr[boundaryIndex];
            arr[boundaryIndex] = item;
        }
    }
    boundaryIndex++;
    arr[endIndex] = arr[boundaryIndex];
    arr[boundaryIndex] = pivotValue;

    return boundaryIndex;
}

module.exports = {
    partition: partition
};