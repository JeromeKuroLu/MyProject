/**
 * Created by Jerome on 2016/11/7.
 */
function displayHeap(heapArr) {
    var height = Math.ceil(Math.log(heapArr.length + 1) / Math.log(2)) - 1;

    for (var h = 0; h <= height; h++) {
        var outPutRowStr = '';
        for (var b = 0; b < Math.pow(2, height - h); b++) {
            outPutRowStr += ' ';
        }
        for (var i = (Math.pow(2, h) - 1); i < (Math.pow(2, h + 1) - 1) && i < heapArr.length; i++) {
            if (heapArr[i]) {
                outPutRowStr += heapArr[i] + ' ';
            }
            else {
                break;
            }
        }
        console.log(outPutRowStr);
    }
}

module.exports = {
    displayHeap: displayHeap
};