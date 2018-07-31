angular.module('sampleproject').controller( 'LoginController',
function ($rootScope, $scope ,$location )
{
 console.log('login controller') ;
 
 $scope.showotherPage = function(){
  
  $location.path('/subpage');
 };
});
	