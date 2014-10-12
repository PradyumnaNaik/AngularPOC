angular.module('ExceptionHandler',[]).
factory('exHandler',[function(){
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