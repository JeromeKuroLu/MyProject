/**
 * Created by Jerome on 2016/12/17.
 */
// to use pointer concept store object in multiple arrays
function ObjManager() {
    var me = this;

    this.objNames = {};
    this.prePtArrManager = [];
    this.nextPtArrManager = [];
    this.attrPtObjManager = [];
    this.freeListArrManager = [];

    /** use reflection to get object name(or other identification)
     *  but it's not suitable to achieve in JS
     *  so deliver a param to present objName
     */
    this.registerObj = function (obj, objName, scope) {
        if (isEmpty(scope.objNames[objName])) {
            var initStartIndex = 0,
                assignArrManagerIndex = scope.nextPtArrManager.length,
                objInfo = {startIndex: initStartIndex, arrManagerIdx: assignArrManagerIndex},
                objAttrInfo = {};
            scope.prePtArrManager.push([]);
            scope.nextPtArrManager.push([]);
            scope.freeListArrManager.push([]);
            for (key in obj) {
                objAttrInfo[key] = [];
            }
            scope.attrPtObjManager.push(objAttrInfo);
            scope.objNames[objName] = objInfo;
        }
    };

    this.addObj = function (obj, objName, scope) {
        var objInfo = scope.objNames[objName],
            startIdx = objInfo.startIndex,
            arrManagerIdx = objInfo.arrManagerIdx,
            prePtArray = scope.prePtArrManager[arrManagerIdx],
            nextPtArray = scope.nextPtArrManager[arrManagerIdx],
            attrPtObj = scope.attrPtObjManager[arrManagerIdx],
            freeListArray = scope.freeListArrManager[arrManagerIdx],
            insertIdx = 0,
            lastItemIdx = getLastValues(nextPtArray, startIdx);
        if (freeListArray.length > 0) {
            insertIdx = freeListArray.shift();
        }
        if (!isEmpty(lastItemIdx)) {
            prePtArray[insertIdx] = lastItemIdx;
        }
        else {
            prePtArray[insertIdx] = -1;
        }
        nextPtArray[insertIdx] = -1;
        for (attr in obj) {
            var attrArray = attrPtObj[attr];
            attrArray[insertIdx] = obj[attr];
        }
    };

    this.createNewObj = function (obj, objName, scope) {
        if (!scope) {
            scope = me;
        }
        if (typeof obj == 'function') {
            obj = obj();
        }
        scope.registerObj(obj, objName, scope);
        scope.addObj(obj, objName, scope);
    };

    function getNextValue(linkedArr, startIdx, t) {
        if (!t || typeof t != 'number') {
            t = 1;
        }
        var time = 0,
            currentValue = linkedArr[startIdx];
        if (time >= t) {
            return currentValue;
        }
        while (time < t) {
            time++;
            currentValue = linkedArr[currentValue];
            if (!isEmpty(currentValue) || time == t) {
                return currentValue;
            }
            else {
                throw 'out of boundary to get the next value';
            }
        }
    }

    function getLastValues(linkedArr, startIdx) {
        var currentValue = linkedArr[startIdx],
            nextValue = getNextValue(linkedArr, startIdx);
        while (!isEmpty(nextValue)) {
            currentValue = nextValue;
            nextValue = getNextValue(linkedArr, startIdx);
        }
        return currentValue;
    }

    function isEmpty(v) {
        return (!v || v < 0)
    }
}

module.exports = {
    ObjManager: ObjManager
};
