/**
 * Created by Jerome on 2016/11/1.
 */
var findMaximumSubArray = require('./findMaximumSubArray').findMaximumSubArray;

(function test() {
    var array = [13,-3,-25,20,-3,-16,-23,18,20,-7,12,-5,-22,15,-4,7,-11,17,-5,-3,-5,7,-10,15,2];
    console.log(findMaximumSubArray(array, 0, array.length - 1));
})();