
exports.once = function(fn){
    var returnValue, called = false;
    return function(){
        if(!called){
            called = true;
            returnValue = fn.apply(this, arguments);
        }
        return returnValue;
    };
}

exports.throttle = function(callback){
    var timer;
    return function(){
        clearTimeout(timer);
        var args = [].slice.call(arguments);
        timer = setTimeout(function(){
            callback.apply(this, args);
        }, 100);
    };
}

/*exports.getTodos = function(listId, callback){*/
    //$.ajax({
        //url: "/todo/" + listId + "/items",
        //success: function (data) {
            //// Node-style CPS: callback(err, data)
            //callback(null, data);
        //}
    //});
//}

