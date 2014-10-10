angular.module('F1App.services',[]).factory('driverService',['$http','$q',function($http,$q){
    var drivers = {};
    //with callback
    drivers.getDriverList = function(){        
        return $http({
            'url':'http://ergast.com/api/f1/2014/driverStandings.json'
        });    
    };

    //with promise
    drivers.getDriverDetails = function(id){
        return $http({
            'url':'http://ergast.com/api/f1/2014/drivers/'+ id +'/driverStandings.json'
        }).then(function(res){
            if(typeof(res.data)==='object'){
                return res.data;
            }else{
                return $q.reject(res.data);
            }
        },function(res){
            return $q.reject(res.data);
        });
    };

    //with promise
    drivers.getDriverRaces = function(id){
        return $http({
            'url':'http://ergast.com/api/f1/2013/drivers/'+ id +'/results.json'
        }).then(function(res){
            if(typeof(res.data)==='object'){
                return res.data;
            }else{
                return $q.reject(res.data);
            }
        },function(res){
            return $q.reject(res.data);
        });
    };
    return drivers;
}]);