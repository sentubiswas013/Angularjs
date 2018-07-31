(function(angular, window){
	'use strict'

	angular.module("demoIRCTC", ["ngRoute", "header", "footer", "dashboard", "bookticket", "pnrstatus", "seatavailibility", "APIManager"])
    
    .config(['$routeProvider', '$locationProvider', '$httpProvider',
        function config($routeProvider, $locationProvider, $httpProvider) {
            $locationProvider.hashPrefix('!');
            $httpProvider.defaults.withCredentials = true;
            $routeProvider.
            when('/dashboard', {
                template: '<dashboard></dashboard>'
            }).  
            when('/bookticket', {
                template: '<bookticket></bookticket>'
            }). 
            when('/pnrstatus', {
                template: '<pnrstatus></pnrstatus>'
            }).
            when('/seatavailibility', {
                template: '<seatavailibility></seatavailibility>'
            }).              		
            otherwise('/dashboard');
        }
    ]);

})(angular, window)