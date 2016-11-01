/**
 * Created by Jerome on 2016/11/1.
 */
function merge(preArr, postArr) {
    var sortedArr = [];
    for (var i = 0, j = 0, preLen = preArr.length, postLen = postArr.length; i != preLen || j != postLen;) {
        var preArrItem = preArr[i],
            postArrItem = postArr[j];
        if (i == preLen || preArrItem >= postArrItem) {
            sortedArr.push(postArrItem);
            j++;
        }
        else if (j == postLen || preArrItem < postArrItem) {
            sortedArr.push(preArrItem);
            i++;
        }
    }
    return sortedArr;
}

module.exports = {
  merge: merge
};