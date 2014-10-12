angular.module('F1App.controllers',[]).
controller('driversController',['$scope','exHandler','driverService',function($scope,exHandler,driverService){
    $scope.driverList=[];
    $scope.color='';
    $scope.colorObj = {
        red:true,
        green:true,
        blue:true,
        white:true,
        yellow:true
    };
    
    driverService.getDriverList().success(function(res){
        $scope.driverList = res.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });
    
    $scope.checkColor = function(evt){
        try{
            var color = $scope.color;
            if(color.length === 0){
                angular.forEach($scope.colorObj,function(val,key){
                  $scope.colorObj[key] = true;                
                });
                return;
            }

            switch(color[0].toLowerCase()){
                case 'r':setColor('red');break;
                case 'b':setColor('blue');break;
                case 'g':setColor('green');break;
                case 'w':setColor('white');break;
                case 'y':setColor('yellow');break;
                default: setColor('');break;
            };
        }catch(ex){
            exHandler.logError(ex);
        }
    };
    
    var setColor = function(type){
        try{
            a[0];
            angular.forEach($scope.colorObj,function(val,color){
            if(color === type){
                $scope.colorObj[color] = true;
            }else{
                $scope.colorObj[color] = false;
            }
            });
        }catch(ex){
            throw ex;
        }
        
    };

}]).
controller('driverController',['$scope','$routeParams','driverService',function($scope,$routeParams,driverService){
    var id=$routeParams.id;
    $scope.driver=null;
    $scope.races=[];

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
}]);