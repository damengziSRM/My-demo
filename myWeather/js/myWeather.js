
var app=angular.module('Weather',[]);
app.factory('WeatherApi',function($http){
	var obj={};
	obj.getIP=function(){
		return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
	}
	obj.getCurrent=function(ip){
		var api="http://v.juhe.cn/weather/index?format=2&cityname=%E9%83%91%E5%B7%9E&dtype=json&format=&key=7daa8fc7b1edaab63ed6e99287a2828e";
		var APPKey="7daa8fc7b1edaab63ed6e99287a2828e";
		var cb = "&callback=JSON_CALLBACK";
		return $http.jsonp(api+APPKey+ip+cb);

	};
	return obj
});
app.controller('MainCtrl',function($scope,WeatherApi){
	$scope.Data={};
	WeatherApi.getIP().success(function(data){
		var ip=data.ip;
		WeatherApi.getCurrent(ip).success(function(data){
			$scope.Data=data.result;
			$scope.items=data.result.info;
			delete $scope.items[Object.keys($scope.items)[0]];
		});
	})
});