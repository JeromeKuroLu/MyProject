/**
 * Created by LUJE4 on 11/11/2016.
 */
function bucketComparison(redArr, blueArr, status) {
    function Bucket(color, volume) {
        this.color = color;
        this.volume = volume;
    }

    let redBucketArr = [],
        blueBucketArr = [];
    // construct two color bucket arrays
    for (let i = 0, rLen = redArr.length; i < rLen; i++) {
        let rv = redArr[i],
            redBucket = new Bucket('red', rv);
        redBucketArr.push(redBucket);
    }
    for (let j = 0, bLen = blueArr.length; j < bLen; j++) {
        let bv = blueArr[j],
            blueBucket = new Bucket('blue', bv);
        blueBucketArr.push(blueBucket);
    }

    quickFindAndSort(redBucketArr, 0, rLen - 1, blueBucketArr, status);
    console.log(redBucketArr);
    console.log(blueBucketArr);
}

function quickFindAndSort(redBucketArr, startIndex, endIndex, blueBucketArr, status) {
    if (endIndex - startIndex > 0) {
        let pivotIndex = parseInt((Math.random() * (endIndex - startIndex + 1) + startIndex), 10),
            t = partition(redBucketArr, startIndex, endIndex, pivotIndex, blueBucketArr, status);
        if (typeof t == 'number') {
            quickFindAndSort(redBucketArr, startIndex, t - 1, blueBucketArr, status);
            quickFindAndSort(redBucketArr, t + 1, endIndex, blueBucketArr, status);
        }
    }
}

function partition(redBucketArr, startIndex, endIndex, pivotIndex, blueBucketArr, status) {
    let rPivotBucket = redBucketArr[pivotIndex],
        bPivotBucket = {},
        rBoundaryIndex = startIndex - 1,
        bBoundaryIndex = startIndex - 1,
        bPivotIndex;

    for (let k = startIndex; k <= endIndex; k++) {
        let bBucket = blueBucketArr[k];
        if (compare(rPivotBucket, bBucket) === 0) {
            bPivotBucket = bBucket;
            bPivotIndex = k;
            break;
        }
    }
    if (!bPivotBucket.volume) {
        console.error('there is something wrong.\ninput two arr are not totally same in value');
        return false;
    }

    if (pivotIndex !== endIndex) {
        redBucketArr[pivotIndex] = redBucketArr[endIndex];
        redBucketArr[endIndex] = rPivotBucket;
    }
    if (bPivotIndex !== endIndex) {
        blueBucketArr[bPivotIndex] = blueBucketArr[endIndex];
        blueBucketArr[endIndex] = bPivotBucket;
    }

    for (let i = startIndex; i < endIndex; i++) {
        let rcBucket = redBucketArr[i],
            bcBucket = blueBucketArr[i];
        if ((status || compare(rcBucket, bPivotBucket) > 0) && (!status || compare(rcBucket, bPivotBucket) < 0)) {
            rBoundaryIndex++;
            redBucketArr[i] = redBucketArr[rBoundaryIndex];
            redBucketArr[rBoundaryIndex] = rcBucket;
        }
        if ((status || compare(bcBucket, rPivotBucket) > 0) && (!status || compare(bcBucket, rPivotBucket) < 0)) {
            bBoundaryIndex++;
            blueBucketArr[i] = blueBucketArr[bBoundaryIndex];
            blueBucketArr[bBoundaryIndex] = bcBucket;
        }
    }

    rBoundaryIndex++;
    redBucketArr[endIndex] = redBucketArr[rBoundaryIndex];
    redBucketArr[rBoundaryIndex] = rPivotBucket;

    bBoundaryIndex++;
    blueBucketArr[endIndex] = blueBucketArr[bBoundaryIndex];
    blueBucketArr[bBoundaryIndex] = bPivotBucket;

    return rBoundaryIndex;
}

function compare(b1, b2) {
    if (b1.color === b2.color) {
        console.err('you can\'t compare the buckets with the same color.');
    }
    else {
        if (b1.volume === b2.volume) {
            return 0;
        }
        else if (b1.volume < b2.volume) {
            return -1;
        }
        else if (b1.volume > b2.volume) {
            return 1;
        }
    }
}

(function () {
    let redArr = [5, 10, 9, 6, 8, 2, 1, 7, 4, 3],
        blueArr = [3, 9, 7, 1, 10, 4, 6, 5, 2, 8];
    bucketComparison(redArr, blueArr, false);
})();