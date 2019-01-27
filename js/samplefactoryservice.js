'use strict';
angular.module('harbinger').factory( 'samplefactoryservice',
function( $rootScope, $http)
{
return {
//data($scope.list) from controller
myServicefunction : function( data  )
{
 var data = {
   value:data.value ,
   somedata :data.data
  };
 
 var url = 'your webservcie url';
 //Sending to service ( backend )
 $http.post( url, angular.toJson(data) )
 
 .success( function( data )
 {
//Getting data from backend

  success(data);

 //Send back to controller
 })
 .error( function( data)
 {
  error(data);
 });
 
 
}