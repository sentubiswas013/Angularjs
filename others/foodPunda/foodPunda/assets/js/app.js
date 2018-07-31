//Servie URL
//var domain = "http://localhost/demos/angularjs/05-shopping/server/"
// var signUp = domain + "signup.php";
// var userDetails = domain + "user-details.php";
// var foodMenu = domain + "food_menu.php";

angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives'  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

})
