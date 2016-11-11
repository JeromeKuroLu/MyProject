/**
 * Created by LUJE4 on 11/10/2016.
 */
function partition(arr, startIndex, endIndex, pivotIndex, status) {
    var boundaryIndex = startIndex - 1,
        pivotValue = arr[pivotIndex];

    if (pivotIndex !== endIndex) {
        arr[pivotIndex] = arr[endIndex];
        arr[endIndex] = pivotValue;
    }

    for (var i = startIndex; i < endIndex; i++) {
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