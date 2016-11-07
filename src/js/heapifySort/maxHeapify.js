/**
 * Created by Jerome on 2016/11/7.
 */
function maxHeapify(arr, i) {
    var root = arr[i],
        leftChildIndex = 2 * i,
        rightChildIndex = 2 * i + 1,
        leftChild = arr[leftChildIndex],
        rightChild = arr[rightChildIndex],
        largestEleIndex = i;
    if (leftChild && leftChildIndex < arr.length && leftChild > arr[largestEleIndex]) {
        largestEleIndex = leftChildIndex;
    }
    if (rightChild && rightChildIndex < arr.length && rightChild > arr[largestEleIndex]) {
        largestEleIndex = rightChildIndex;
    }
    if (largestEleIndex != i) {
        arr[i] = arr[largestEleIndex];
        arr[largestEleIndex] = root;
        maxHeapify(arr, largestEleIndex);
    }
}

module.exports = {
    maxHeapify: maxHeapify
};
