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
    $scope.colorObj = driverService.colorObj;
    
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
                case 'r':$scope.colorObj = driverService.setColor('red');break;
                case 'b':$scope.colorObj = driverService.setColor('blue');break;
                case 'g':$scope.colorObj = driverService.setColor('green');break;
                case 'w':$scope.colorObj = driverService.setColor('white');break;
                case 'y':$scope.colorObj = driverService.setColor('yellow');break;
                default: $scope.colorObj = driverService.setColor('');break;
            }
        }catch(ex){
            exHandler.logError(ex);
        }
    };
}]).
controller('ModalDemoCtrl',['$scope','$timeout','$modal','$log',function($scope,$timeout, $modal,$log){
  //define a scope object with items to be pushed to the modal
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.modalLabels = {'ttl':'I\'m a modal!','lbl1':'selected','btnOk':'OK','btnCancel':'Cancel'};

    //invoke the modal automatically after 5 seconds
  $timeout(function() {
       open();
    }, 5000);

  var open = function () {
      //create a closure of the modal's open method
      //the modal's controller will be used to talk to the contents within the modal
    var modalInstance = $modal.open({
      templateUrl: 'views/modalDemo.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
          //pass the parent scope's items into the modal's scope
        items: function () {
          return $scope.items;
        },
          labels:function(){
            return $scope.modalLabels;
          }
      }
    });

      //use the modal's result PROMISE property to talk to the parent controller
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}]).
controller('ModalInstanceCtrl',['$scope','$modalInstance','items','labels',function($scope, $modalInstance, items, labels){
  //modal specific controller
  $scope.items = items;
    $scope.modalLabels = labels;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
