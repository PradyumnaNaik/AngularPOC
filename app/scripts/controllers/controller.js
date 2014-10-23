angular.module('F1App.controllers',[]).
controller('driversController',['$scope','driverService',function($scope,driverService){
    $scope.driverList=[];
    $scope.color='';
    //implementation with callbacks
    driverService.getDriverList().success(function(res){
        $scope.driverList = res.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });
}]).
controller('driverController',['$scope','$routeParams','driverService',function($scope,$routeParams,driverService){
    var id=$routeParams.id;
    $scope.driver=null;
    $scope.races=[];
    //implementation with promises
    driverService.getDriverDetails(id).then(function(res){
        $scope.driver=res.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
    }, function(err){
        alert('An error occurred while fetching the driver details!');
    });
    
    driverService.getDriverRaces(id).then(function(res){
        $scope.races = res.MRData.RaceTable.Races;
    },function(err){
        alert('An error occurred while fetching the Race info!');
    });
}]).
controller('ngClassDemoController',['$scope','exHandler','driverService',function($scope,exHandler,driverService){
    $scope.colorObj = {
        red:true,
        green:true,
        blue:true,
        white:true,
        yellow:true
    };
    
    $scope.checkColor = function(){
        try{
            //probable Angular defect: ng-keypress/down/up don't seem to fire immediately on key press. 
            //Can cause issue if user types fast
            var color = $scope.color;
            if(color.length === 0){
                angular.forEach($scope.colorObj,function(val,key){
                  $scope.colorObj[key] = true;                
                });
                return;
            }

            switch(color[0].toLowerCase()){
                case 'r':$scope.colorObj = driverService.setColor('red',$scope.colorObj);break;
                case 'b':$scope.colorObj = driverService.setColor('blue',$scope.colorObj);break;
                case 'g':$scope.colorObj = driverService.setColor('green',$scope.colorObj);break;
                case 'w':$scope.colorObj = driverService.setColor('white',$scope.colorObj);break;
                case 'y':$scope.colorObj = driverService.setColor('yellow',$scope.colorObj);break;
                default: $scope.colorObj = driverService.setColor('',$scope.colorObj);break;
            }
        }catch(ex){
            exHandler.logError(ex);
        }
    };
}]);
