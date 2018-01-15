var app=angular.module('app',[]);

app.controller('AppCtrl',['$scope','$http','$window',function ($scope,$http,$window) {
	$scope.show_table=false; 					// set table view false
	var radius = 6371;							// radius of earth
	$scope.friends = [];						// array of friends to be invited

	// query button function
	$scope.query = function(){
		if($scope.reference_latitude==undefined || $scope.reference_longitude==undefined){
			$window.alert("Please enter latitude and longitude");
		}					
		else
		{
			$http({									// HTTP request to access friends.json
				method: 'GET',
				url: 'friends.json'
			}).then(function success(response){		// promise for the request done
				var data = response.data;
				$scope.show_table = true;			// set table view true	
				$scope.foo(data,$scope.reference_latitude,$scope.reference_longitude);							// call function to find all friends with distance <=100
				
				$scope.tester($scope.find_friends(data,$scope.reference_latitude,$scope.reference_longitude), [{'name':"Bob",'user_id':18}]);
			}, function error(response){
				console.log(response);
			});
		}
	}

	// main mathematical function which finds the list of friends within <=100 km distance
	$scope.find_friends = function(data,latitude,longitude){
		var friends_list=[];
		for(var i=0;i<data.length;i++)
		{
			var phi1     = $scope.toRadians(latitude);
			var lambda1  = $scope.toRadians(longitude);			
			var phi2     = $scope.toRadians(data[i].latitude);
			var lambda2  = $scope.toRadians(data[i].longitude);
			var distance = $scope.getDistance(phi1,phi2,lambda1,lambda2,radius);
			if(distance <= 100)
			{
				friends_list.push({'name': data[i].name, 'user_id': data[i].user_id})
			}
		}
		return friends_list;
	}

	// arbitary function to call find_friends
	$scope.foo = function (data,latitude,longitude){
		$scope.friends=$scope.find_friends(data,latitude,longitude);
	}

	// funcion to convert degree to radians
	$scope.toRadians=function(input){	
		return 0.0174533*(input);
	}

	// function to calculate the distance between two given points
	$scope.getDistance = function (phi1,phi2,lambda1,lambda2,radius){
		var angle = Math.acos(Math.sin(phi1)*Math.sin(phi2) + Math.cos(phi1)*Math.cos(phi2)*Math.cos(Math.abs(lambda1-lambda2)));
		return radius*angle;
	}

	// tester function to compare the two datas(data found by our function and expected output)
	$scope.tester = function (data_found, data_given){
		console.assert(data_found.length==data_given.length);
		for(var i=0;i<data_found.length;i++){
			console.assert(data_found[i].name.localeCompare(data_given[i].name)==0);
			console.assert(data_found[i].user_id==(data_given[i].user_id));
		}
	}
}]);