angular.module('ExceptionHandler',[]).
factory('exHandler',[function(){
    /*
        debug/release. 
        This switch can be used to differentiate behavior in dev/production. would be very helpful in Hybrid app.
    */
    var ex = {},
        isDebug = true;
    ex.logError = function(err){
        if(isDebug){
            alert(err.message +'\n\n'+err.stack);//or some fancy modal
        }else{
            //log the exception details to the server
        }    
    };
    return ex;
}]);