/*jshint browser: false, devel: false*/
/// <reference path='Controller/Controller.js' />

var assert = chai.assert;
var expect = chai.expect;

// Test case for controller
describe("Test the controller ", function () {
    // Define variable
	var $rootScope, $scope, $controller;

    // load scope and controller before run test cases
    beforeEach(function () {
        // Define application module
        module('F1App');

        // Inject dependency
        angular.mock.inject(function (_$rootScope_, _$controller_) {
            $rootScope = _$rootScope_;
            // create scope object with the help of global scope ($rootScope)
            $scope = $rootScope.$new();
            $controller = _$controller_;
            // Defien controller
            $controller('ngClassDemoController', {'$scope': $scope });
        });
    });

    // Test cases

    // bootstrap app module
    it("should bootstrap the app module", function () {
        angular.bootstrap(window, ["F1App"]);
    });

    // check scope is define or not
    it('should have scope defined', function () {
        angular.isDefined($scope);
    });

    describe("Testing the default colors", function(){
        it("should set the default colors to true", function () {
            expect($scope.colorObj.blue).to.equal(true);
            expect($scope.colorObj.green).to.equal(true);
            expect($scope.colorObj.red).to.equal(true);
            expect($scope.colorObj.white).to.equal(true);
            expect($scope.colorObj.yellow).to.equal(true);
        });
    })


    describe("Testing the checkColor method", function(){
        it("should set all the colors if no entry is made",function(){
            $scope.color = '';
            $scope.checkColor();
            expect($scope.colorObj.blue).to.equal(true);
            expect($scope.colorObj.green).to.equal(true);
            expect($scope.colorObj.red).to.equal(true);
            expect($scope.colorObj.white).to.equal(true);
            expect($scope.colorObj.yellow).to.equal(true);
        });

        it("first character entered is 'b', only BLUE color should be set", function(){
            $scope.color ='b';
            $scope.checkColor();
            expect($scope.colorObj.blue).to.equal(true);
            expect($scope.colorObj.green).to.equal(false);
            expect($scope.colorObj.red).to.equal(false);
            expect($scope.colorObj.white).to.equal(false);
            expect($scope.colorObj.yellow).to.equal(false);
        });

        it("first character is not among [b,g,r,w,y], all colors to be set", function(){
            $scope.color ='f';
            $scope.checkColor();
            expect($scope.colorObj.blue).to.equal(false);
            expect($scope.colorObj.green).to.equal(false);
            expect($scope.colorObj.red).to.equal(false);
            expect($scope.colorObj.white).to.equal(false);
            expect($scope.colorObj.yellow).to.equal(false);
        });

    });




});
