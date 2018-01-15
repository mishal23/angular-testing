describe('friends',function(){

	// Before each test load our app module
	beforeEach(angular.mock.module('app'));

	var $controller;

	// Before each test set our injected friends factory to our local controller variable
	beforeEach(angular.mock.inject(function(_$controller_){
	  $controller = _$controller_;
	}));

	// A simple test to verify the toRadians() function
	describe('toRadians',function(){
		it('checking toRadians function',function(){
			var $scope={};
			var $http={};
			var controller = $controller('AppCtrl',{$scope:$scope, $http:$http});
			var x = $scope.toRadians(1);
			expect(x).toBe(0.0174533);
		});
	});

	// A simple test to verify the getDistance() function
	describe('getDistance',function(){
		it('checking getDistance function',function(){
			var $scope={};
			var $http={};
			var controller = $controller('AppCtrl',{$scope:$scope, $http:$http});
			var x = $scope.getDistance(12.986375,12.9611159,77.043701,77.6362214,6371);
			expect(x).toBe(3461.423561668541);
		});
	});

	// Fake HTTP backend implementation suitable for unit testing application that use $http service
	describe('checking HTTP',function(){
		it('should demonstrate using when (200 status)', inject(function($httpBackend,$http) {

		  var $scope = {};
		  
		  $http.get('friends.json')
		    .then(function success(response) {
		      $scope.show_table = true;
		      $scope.response = response.data.foo;		     
		    })
		    ,function error(data, status, headers, config) {
		      $scope.show_table = false;
		  };
	
		  $httpBackend
		    .when('GET', 'friends.json')
		    .respond(200, { foo: "bar" });

		 expect($httpBackend.flush).not.toThrow();
		 expect($scope.show_table).toBe(true);
		 expect($scope.response).toEqual('bar');

		}));
	});

});
