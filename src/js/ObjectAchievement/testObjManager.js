/**
 * Created by Jerome on 2016/12/17.
 */
var ObjManager = require('./objectMultipleArrayStore').ObjManager;

(function () {
    var objMng = new ObjManager();
    objMng.createNewObj({name: 'Lock', age: 34}, 'Person');
    console.log('test finish');
})();
