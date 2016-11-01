function insertionSort (inputArray) {
    for (var i = 1; i < inputArray.length; i++) {
        var key = inputArray[i],
            comparedOneIndex = i - 1;
        while (key > inputArray[comparedOneIndex] && comparedOneIndex > -1) {
            inputArray[comparedOneIndex + 1] = inputArray[comparedOneIndex];
            inputArray[comparedOneIndex] = key;
            comparedOneIndex--;
        }
    }
    console.log(inputArray);
    return inputArray;
}

module.exports = insertionSort;
