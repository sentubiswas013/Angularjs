angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider
    .state('page-home', {
      url:'/page-home',
      templateUrl: 'templates/page-home.html',
      controller: 'ctrl-page-home'
    })
    /*For side nav*/
    .state('nav-left', {
      url:'/nav-left',
      templateUrl: 'templates/page-nav-left.html'
    })
    /*For bottom tab home*/
    .state('nav-left.tabs', {
      abstract: true,
      url: '/tabs',
      templateUrl: 'templates/page-tabs.html'
    })
    .state('nav-left.tabs.page-home', {
      url: '/page-home',
      views: {
        'tab-home': {
          templateUrl: 'templates/page-home.html'
        }
      }
    })
    .state('nav-left.tabs.page-indian-caterers', {
      url: '/page-indian-caterers',
      views: {
        'tab-home': {
          templateUrl: 'templates/page-indian-caterers.html',
          controller: 'ctrl-page-indian-caterers'
        }
      }
    })
    .state('nav-left.tabs.page-cash-rewards', {
      url: '/page-cash-rewards',
      views: {
        'tab-cash-rewards': {
          templateUrl: 'templates/page-cash-rewards.html'
        }
      }
    })
    .state('nav-left.tabs.page-request-quotation', {
      url: '/page-request-quotation',
      views: {
        'tab-home': {
          templateUrl: 'templates/page-request-quotation.html',
          controller: 'ctrl-request-quotation'
        }
      }
    })
    .state('nav-left.tabs.page-faq', {
      url: '/page-faq',
      views: {
        'tab-contacts': {
          templateUrl: 'templates/page-faq.html',
          controller: 'ctrl-page-faq'
        }
      }
    })
    .state('nav-left.tabs.page-contacts', {
      url: '/page-contacts',
      views: {
        'tab-contacts': {
          templateUrl: 'templates/page-contacts.html',
          controller: 'ctrl-page-contacts'
        }
      }
    })


    //-----------------dsdfs--------------//
    .state('nav-left.tabs.page-food-menu', {
      url: '/page1',
      views: {
        'tab-food-menu': {
          templateUrl: 'templates/menu.html',
          controller: 'menuCtrl'
        }
      }
    })
    /*.state('menu', {
      url: '/page1',
      templateUrl: 'templates/menu.html',
      controller: 'menuCtrl'
    })*/
    .state('nav-left.tabs.page-filterBy', {
      url: '/page6',
      views: {
        'tab-food-menu': {
          templateUrl: 'templates/filterBy.html',
          controller: 'filterByCtrl'
        }
      }
    })
    /*.state('filterBy', {
      url: '/page6',
      templateUrl: 'templates/filterBy.html',
      controller: 'filterByCtrl'
    })*/

    .state('nav-left.tabs.page-sortBy', {
      url: '/page7',
      views: {
        'tab-food-menu': {
          templateUrl: 'templates/sortBy.html',
          controller: 'sortByCtrl'
        }
      }
    })
    /*.state('sortBy', {
      url: '/page7',
      templateUrl: 'templates/sortBy.html',
      controller: 'sortByCtrl'
    })*/

    .state('nav-left.tabs.page-my-cart', {
      url: '/page2',
      views: {
        'tab-my-cart': {
          templateUrl: 'templates/cart.html',
          controller: 'cartCtrl'
        }
      }
    })
    /*.state('cart', {
      url: '/page2',
      templateUrl: 'templates/cart.html',
      controller: 'cartCtrl'
    })*/

    .state('nav-left.tabs.page-checkOut', {
      url: '/page3',
      views: {
        'tab-my-cart': {
          templateUrl: 'templates/checkOut.html',
          controller: 'checkOutCtrl'
        }
      }
    })
    /*
    .state('checkOut', {
      url: '/page3',
      templateUrl: 'templates/checkOut.html',
      controller: 'checkOutCtrl'
    })*/

    .state('nav-left.tabs.page-payment', {
      url: '/page8',
      views: {
        'tab-my-cart': {
          templateUrl: 'templates/payment.html',
          controller: 'paymentCtrl'
        }
      }
    })
    /*
    .state('payment', {
      url: '/page8',
      templateUrl: 'templates/payment.html',
      controller: 'paymentCtrl'
    })*/

    .state('nav-left.tabs.page-login', {
      url: '/page4',
      views: {
        'tab-profile': {
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl',
          resolve:{
          "check":function($location){
            if(sessionStorage.getItem('loggedin_id')){
              $location.path('/page9');
              //$state.go('nav-left.tabs.page-checkOut');
            }
            else {
              $location.path('/page4');
              //$state.go('nav-left.tabs.page-checkOut');
            }
           }
          }
        }
      }
    })
    /*
    .state('login', {
      url: '/page4',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl',

		resolve:{
			"check":function($location){
				if(sessionStorage.getItem('loggedin_id')){
          $location.path('/page9');
        }
				else {
          $location.path('/page4');
        }
			 }
		  }
    })*/

    .state('nav-left.tabs.page-signup', {
      url: '/page5',
      views: {
        'tab-profile': {
          templateUrl: 'templates/signup.html',
          controller: 'signupCtrl'
        }
      }
    })
    /*.state('signup', {
      url: '/page5',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })*/

    .state('nav-left.tabs.page-profile', {
      url: '/page9',
      views: {
        'tab-profile': {
          templateUrl: 'templates/profile.html',
          controller: 'profileCtrl'
        }
      }
    })
    /*
    .state('profile', {
      url: '/page9',
      templateUrl: 'templates/profile.html',
      controller: 'profileCtrl'
    })*/

    .state('nav-left.tabs.page-editProfile', {
      url: '/page11',
      views: {
        'tab-profile': {
          templateUrl: 'templates/editProfile.html',
          controller: 'editProfileCtrl'
        }
      }
    })
   /*.state('editProfile', {
      url: '/page11',
      templateUrl: 'templates/editProfile.html',
      controller: 'editProfileCtrl'
    })*/

    .state('nav-left.tabs.page-myOrders', {
      url: '/page10',
      views: {
        'tab-food-menu': {
          templateUrl: 'templates/myOrders.html',
          controller: 'myOrdersCtrl'
        }
      }
    })
    /*.state('myOrders', {
      url: '/page10',
      templateUrl: 'templates/myOrders.html',
      controller: 'myOrdersCtrl'
    })*/

    .state('nav-left.tabs.page-favorates', {
      url: '/page12',
      views: {
        'tab-food-menu': {
          templateUrl: 'templates/favorates.html',
          controller: 'favoratesCtrl'
        }
      }
    })
    /*.state('favorates', {
      url: '/page12',
      templateUrl: 'templates/favorates.html',
      controller: 'favoratesCtrl'
    })*/

    .state('nav-left.tabs.page-productPage', {
      url: '/page13',
      views: {
        'tab-food-menu': {
          templateUrl: 'templates/productPage.html',
          controller: 'productPageCtrl'
        }
      }
    })
    /*.state('productPage', {
      url: '/page13',
      templateUrl: 'templates/productPage.html',
      controller: 'productPageCtrl'
    });*/

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page-home');

});
