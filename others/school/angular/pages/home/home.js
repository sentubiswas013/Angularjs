angular.module('home',[])
.component("home", {
	templateUrl: 'pages/home/home.html',
	controller: ['$scope', function($scope){
		var self = this;
		self.name = "home"
	}]
})