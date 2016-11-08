/**
 * Created by Jerome on 2016/11/8.
 */
function insert(s, el, status) {
    if (typeof el === 'object' && el.key) {
        s.push(el);
        if (s.length > 1) {
            compareWithParent(s, s.length - 1, status);
        }
    }
    else {
        console.error('must insert a Object contains "key" value.');
    }
}

function getExtreme(s) {
    if (s.length < 1) {
        console.error('heap underflow');
    }
    else {
        return s[0];
    }
}

function extractExtreme(s, status) {
    if (s.length < 1) {
        console.error('heap underflow');
    }
    else {
        s.shift();
        buildHeap(s, status);
    }
}
// status: 0 = minimum, 1 = maximum
function increaseKey(s, el, k, status) {
    if (!el.key) {
        console.error('must input a Object contains "key" value. .....');
    }
    else if (el.key >= k) {
        console.log('increased "key" value is less than original value');
    }
    else {
        var elIndex = false;
        for (var i = 0, len = s.length; i < len; i++) {
            var currNode = s[i];
            if (currNode === el) {
                elIndex = i;
                break;
            }
        }
        if (typeof elIndex === 'number') {
            s[elIndex].key = k;

            if (status && elIndex > 0) {
                compareWithParent(s, elIndex, status);
            }
            else if (!status) {
                heapify(s, elIndex, status);
            }
        }
        else {
            console.log('the queue cannot find the Object');
        }
    }

}
// status: 0 = minimum, 1 = maximum
function buildHeap(s, status) {
    var leafIndexBoundary = Math.floor(s.length / 2);
    for (var i = leafIndexBoundary - 1; i >= 0; i--) {
        heapify(s, i, status);
    }
    return s;
}
// status: 0 = minimum, 1 = maximum
function heapify(s, i, status) {
    var root = s[i],
        leftChildIndex = 2 * i + 1,
        rightChildIndex = 2 * i + 2,
        leftChild = s[leftChildIndex],
        rightChild = s[rightChildIndex],
        extremeValueIndex = i;

    if (leftChild && leftChildIndex < s.length) {
        if ((!status || leftChild.key > s[extremeValueIndex].key) && (status || leftChild.key < s[extremeValueIndex].key)) {
            extremeValueIndex = leftChildIndex;
        }
    }

    if (rightChild && rightChildIndex < s.length) {
        if ((!status || rightChild.key > s[extremeValueIndex].key) && (status || rightChild.key < s[extremeValueIndex].key)) {
            extremeValueIndex = rightChildIndex;
        }
    }
    if (extremeValueIndex != i) {
        s[i] = s[extremeValueIndex];
        s[extremeValueIndex] = root;
        heapify(s, extremeValueIndex, status);
    }
}

function compareWithParent(s, i, status) {
    var child = s[i],
        parentIndex = Math.floor((i - 1) / 2),
        parent = s[parentIndex];

    var compareParent = (!status || child.key > parent.key) && (status || child.key < parent.key);
    if (compareParent) {
        s[parentIndex] = child;
        s[i] = parent;
        if (parentIndex > 0) {
            compareWithParent(s, parentIndex, status);
        }
    }
}

module.exports = {
    insert: insert,
    getExtreme: getExtreme,
    extractExtreme: extractExtreme,
    increaseKey: increaseKey
};