angular.module('F1App',['ngRoute',
                        'ExceptionHandler',
                        'F1App.controllers',
                        'F1App.services']).
config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/drivers',{
        templateUrl:'views/driverList.html',
        controller:'driversController'
    }).when('/driver/:id',{
        templateUrl:'views/driver.html',
        controller:'driverController'
    }).otherwise({
        redirectTo:'/drivers'
    });
}]);