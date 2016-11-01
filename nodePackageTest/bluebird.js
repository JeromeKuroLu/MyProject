/**
 * Created by Jerome on 2016/10/27.
 */
var Promise = require('bluebird');

var normalFn = function(a, b, c, cb) {
    /**
     *  your own logic code
     */
    var t = a + b + c;
    if (typeof cb == 'function') {
        cb('error', t);
    }
};

var promisifyFn = Promise.promisify(normalFn, {multiArgs: true});
promisifyFn('hello, ', 'world', '!').then(function(result){
    console.log(result);
}, function(error) {
    console.log(error);
});