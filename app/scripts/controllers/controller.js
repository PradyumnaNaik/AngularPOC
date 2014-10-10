angular.module('F1App.controllers',[]).
controller('driversController',['$scope','driverService',function($scope,driverService){
    $scope.driverList=[];
    
    driverService.getDriverList().success(function(res){
        $scope.driverList = res.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });

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