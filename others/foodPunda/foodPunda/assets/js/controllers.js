angular.module('app.controllers', [])


.controller('menuCtrl', function($scope,$http,sharedCartService,sharedFilterService) {
	//put cart after menu
	var cart = sharedCartService.cart;
	$scope.slide_items=[    {"p_id":"1",
						 "p_name":"New Chicken Maharaja",
						 "p_description":"Product Description",
						 "p_image_id":"slide_1",
						 "p_price":"183"},

						{"p_id":"2",
						"p_name":"Big Spicy Chicken Wrap",
						"p_description":"Product Description",
						"p_image_id":"slide_2",
						"p_price":"171"},

						{"p_id":"3",
						"p_name":"Big Spicy Paneer Wrap",
						"p_description":"Product Description",
						"p_image_id":"slide_3",
						"p_price":"167"}
				   ];

	$scope.noMoreItemsAvailable = false; // lazy load list

  	//loads the menu----onload event
	$scope.$on('$stateChangeSuccess', function() {
		$scope.loadMore();  //Added Infine Scroll
	});

	// Loadmore() called inorder to load the list
	$scope.loadMore = function() {
		str=sharedFilterService.getUrl();
		$http.get(str).success(function (response){
			//alert(response.records);
			$scope.menu_items = response.records;
			$scope.hasmore=response.has_more;	//"has_more": 0	or number of items left
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});

		//more data can be loaded or not
		if ( $scope.hasmore == 0 ) {
		  $scope.noMoreItemsAvailable = true;
		}
	};

	 //show product page
	$scope.showProductInfo=function (id,desc,img,name,price) {
		 sessionStorage.setItem('product_info_id', id);
		 sessionStorage.setItem('product_info_desc', desc);
		 sessionStorage.setItem('product_info_img', img);
		 sessionStorage.setItem('product_info_name', name);
		 sessionStorage.setItem('product_info_price', price);
		 //window.location.href = "#/page13";
		 $state.go('nav-left.tabs.page-productPage');
	 };

	 //add to cart function
	 $scope.addToCart=function(id,image,name,price){
		cart.add(id,image,name,price,1);
	 };
})

.controller('cartCtrl', function($scope,sharedCartService,$ionicPopup,$state) {
	//onload event-- to set the values
	$scope.$on('$stateChangeSuccess', function () {
		$scope.cart=sharedCartService.cart;
		$scope.total_qty=sharedCartService.total_qty;
		$scope.total_amount=sharedCartService.total_amount;
	});

	//remove function
	$scope.removeFromCart=function(c_id){
		$scope.cart.drop(c_id);
		$scope.total_qty=sharedCartService.total_qty;
		$scope.total_amount=sharedCartService.total_amount;
	};

	$scope.inc=function(c_id){
		$scope.cart.increment(c_id);
		$scope.total_qty=sharedCartService.total_qty;
		$scope.total_amount=sharedCartService.total_amount;
	};

	$scope.dec=function(c_id){
		$scope.cart.decrement(c_id);
		$scope.total_qty=sharedCartService.total_qty;
		$scope.total_amount=sharedCartService.total_amount;
	};

	$scope.checkout=function(){
		if($scope.total_amount>0){
			$state.go('nav-left.tabs.page-checkOut');
		}
		else{
			var alertPopup = $ionicPopup.alert({
				title: 'No item in your Cart',
				template: 'Please add Some Items!'
			});
		}
	};

})

.controller('checkOutCtrl', function($scope) {
	$scope.loggedin=function(){
		if(sessionStorage.getItem('loggedin_id')==null){return 1;}
		else{
			$scope.loggedin_name= sessionStorage.getItem('loggedin_name');
			$scope.loggedin_id= sessionStorage.getItem('loggedin_id');
			$scope.loggedin_phone= sessionStorage.getItem('loggedin_phone');
			$scope.loggedin_address= sessionStorage.getItem('loggedin_address');
			$scope.loggedin_pincode= sessionStorage.getItem('loggedin_pincode');
			return 0;
		}
	};
})

.controller('indexCtrl', function($scope,sharedCartService) {
	//$scope.total = 10;
})

.controller('loginCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory) {
	$scope.user = {};

	$scope.login = function() {
		//str="https://vishwaas.000webhostapp.com/vishwaas_app/foodPunda/food_punda_tab_user_details.php?e="+$scope.user.email+"&p="+$scope.user.password;
		$http.get(str)
		.success(function (response){
			$scope.user_details = response.records;
			sessionStorage.setItem('loggedin_name', $scope.user_details.u_name);
			sessionStorage.setItem('loggedin_id', $scope.user_details.u_id );
			sessionStorage.setItem('loggedin_phone', $scope.user_details.u_phone);
			sessionStorage.setItem('loggedin_address', $scope.user_details.u_address);
			sessionStorage.setItem('loggedin_pincode', $scope.user_details.u_pincode);

			$ionicHistory.nextViewOptions({
				disableAnimate: true,
				disableBack: true
			});
			lastView = $ionicHistory.backView();
			console.log('Last View',lastView);
			//BUG to be fixed soon
			/*if(lastView.stateId=="checkOut"){ $state.go('checkOut', {}, {location: "replace", reload: true}); }
			else{*/
	        	$state.go('nav-left.tabs.page-profile', {}, {location: "replace", reload: true});
			//}

		}).error(function() {
				var alertPopup = $ionicPopup.alert({
					title: 'Login failed!',
					template: 'Please check your credentials!'
				});
		});
	};
})


.controller('signupCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory) {
	$scope.signup=function(data){
		//var link = 'https://vishwaas.000webhostapp.com/vishwaas_app/foodPunda/food_punda_tab_user_signup.php';
		$http.post(link, {n : data.name, un : data.username, ps : data.password , ph: data.phone , add : data.address , pin : data.pincode })
		.then(function (res){
			$scope.response = res.data.result;

			if($scope.response.created=="1"){
				$scope.title="Account Created!";
				$scope.template="Your account has been successfully created!";

				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				$state.go('nav-left.tabs.page-login', {}, {location: "replace", reload: true});

			}else if($scope.response.exists=="1"){
				$scope.title="Email Already exists";
				$scope.template="Please click forgot password if necessary";

			}else{
				$scope.title="Failed";
				$scope.template="Contact Our Technical Team";
			}

			var alertPopup = $ionicPopup.alert({
					title: $scope.title,
					template: $scope.template
			});
		});
	}
})

.controller('filterByCtrl', function($scope,sharedFilterService,$state) {
  $scope.Categories = [
    {id: 1, name: 'Burgers & Wraps'},
    {id: 2, name: 'Drinks'}
  ];

  $scope.getCategory = function(cat_list){
    categoryAdded = cat_list;
	var c_string=""; // will hold the category as string

	for(var i=0;i<categoryAdded.length;i++){ c_string+=(categoryAdded[i].id+"||"); }

	c_string = c_string.substr(0, c_string.length-2);
	sharedFilterService.category=c_string;
	//window.location.href = "#/page1";
	$state.go('nav-left.tabs.page-food-menu');
  };
})

.controller('sortByCtrl', function($scope,$state,sharedFilterService) {
	$scope.sort=function(sort_by){
		//alert("sdd");
		sharedFilterService.sort=sort_by;
		console.log('sort',sort_by);
		//window.location.href = "#/page1";
		$state.go('nav-left.tabs.page-food-menu');
	};
})

.controller('paymentCtrl', function($scope) {

})

.controller('profileCtrl', function($scope,$rootScope,$ionicHistory,$state) {
	$scope.loggedin_name= sessionStorage.getItem('loggedin_name');
	$scope.loggedin_id= sessionStorage.getItem('loggedin_id');
	$scope.loggedin_phone= sessionStorage.getItem('loggedin_phone');
	$scope.loggedin_address= sessionStorage.getItem('loggedin_address');
	$scope.loggedin_pincode= sessionStorage.getItem('loggedin_pincode');

	$scope.logout=function(){
	    //alert("dad");
		delete sessionStorage.loggedin_name;
		delete sessionStorage.loggedin_id;
		delete sessionStorage.loggedin_phone;
		delete sessionStorage.loggedin_address;
		delete sessionStorage.loggedin_pincode;

		console.log('Logoutctrl',sessionStorage.getItem('loggedin_id'));

		$ionicHistory.nextViewOptions({
			disableAnimate: true,
			disableBack: true
		});
		$state.go('page-home', {}, {location: "replace", reload: true});
	};
})

.controller('myOrdersCtrl', function($scope) {

})

.controller('editProfileCtrl', function($scope) {

})

.controller('favoratesCtrl', function($scope) {

})

.controller('productPageCtrl', function($scope) {
	//onload event
	angular.element(document).ready(function () {
		$scope.id= sessionStorage.getItem('product_info_id');
		$scope.desc= sessionStorage.getItem('product_info_desc');
		$scope.img= "img/menu/"+ sessionStorage.getItem('product_info_img')+".jpg";
		$scope.name= sessionStorage.getItem('product_info_name');
		$scope.price= sessionStorage.getItem('product_info_price');
	});
})

// For new controller
.controller('ctrl-page-home', function($scope) {
	//put cart after menu
	$scope.slide_items=[    {"p_id":"1",
						 "p_name":"New Chicken Maharaja",
						 "p_description":"Product Description",
						 "p_image_id":"slide_1",
						 "p_price":"183"},

						{"p_id":"2",
						"p_name":"Big Spicy Chicken Wrap",
						"p_description":"Product Description",
						"p_image_id":"slide_2",
						"p_price":"171"},

						{"p_id":"3",
						"p_name":"Big Spicy Paneer Wrap",
						"p_description":"Product Description",
						"p_image_id":"slide_3",
						"p_price":"167"}
				   ];



})

.controller("ctrl-page-indian-caterers", function($scope, $timeout, $ionicSideMenuDelegate){
  //alert("ctrl-page-indian-caterers");

  $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
  };

  // Build Mock Data
  $scope.items = [{
    from: 'Lorem ipsum',
    face: 'img/catering/catering-01.jpg',
    address: '17 Burmahashell, Sodepur, Kol-700110'
  }, {
    from: 'Ipsum dolor',
    face: 'img/catering/catering-02.jpg',
    address: '17 Burmahashell, Sodepur, Kol-700110'
  }, {
    from: 'Lorolor',
    face: 'img/catering/catering-03.jpg',
    address: '17 Burmahashell, Sodepur, Kol-700110'
  }, {
    from: 'Molestie consequat',
    face: 'img/catering/catering-04.jpg',
    address: '17 Burmahashell, Sodepur, Kol-700110'
  }, {
    from: 'Dignissim qui',
    face: 'img/catering/catering-05.jpg',
    address: 'A cooked goose for everyone!'
  }, {
    from: 'Consuetudium',
    face: 'img/catering/catering-05.jpg',
    address: '17 Burmahashell, Sodepur, Kol-700110'
  }, {
    from: 'Investigationes',
    face: 'img/catering/catering-06.jpg',
    address: '17 Burmahashell, Sodepur, Kol-700110'
  }, {
    from: 'Demonstraverunt ',
    face: 'img/catering/catering-07.jpg',
    address: '17 Burmahashell, Sodepur, Kol-700110'
  },{
    from: 'Accumsan iusto',
    face: 'img/catering/catering-08.jpg',
    address: '17 Burmahashell, Sodepur, Kol-700110'
  },{
    from: 'Ullamcorper',
    face: 'img/catering/catering-09.jpg',
    address: '17 Burmahashell, Sodepur, Kol-700110'
  }];

  // List Toggles
  $scope.editBtnText = 'Edit';
  $scope.toggleDelete = function() {
    $scope.isDeletingItems = !$scope.isDeletingItems;
    $scope.isReorderingItems = false;
    $scope.editBtnText = ($scope.isDeletingItems ? 'Done' : 'Edit');
  };
  $scope.reorderBtnText = 'Reorder';
  $scope.toggleReorder = function() {
    $scope.isReorderingItems = !$scope.isReorderingItems;
    $scope.isDeletingItems = false;
    $scope.reorderBtnText = ($scope.isReorderingItems ? 'Done' : 'Reorder');
  };

  $scope.itemClick = function() {
    console.info('itemClick');
    document.getElementById('click-notify').style.display = 'block';
    setTimeout(function() {
      document.getElementById('click-notify').style.display = 'none';
    }, 500);
  };

  // Item Methods/Properties
  $scope.deleteItem = function(item, index) {
    console.log('onDelete from the "item" directive on-delete attribute. Lets not delete this item today ok!', item, index);
  };
  $scope.deleteListItem = function(item, index) {
    console.log('onDelete from the "list" on-delete attribute', item, index);
    $scope.items.splice(index, 1);
  };
  $scope.onReorder = function(el, start, end) {
    console.log('On reorder', el, start, end);
  };

  $scope.optionButtons1 = [{
    text: 'Edit',
    onTap: function(item, button) {
      alert(button.text + ' Button: ' + item.text)
    }
  }, {
    text: 'Share',
    type: 'button-balanced',
    onTap: function(item, button) {
      alert(button.text + ' Button: ' + item.text)
    }
  }];

  $scope.optionButtons2 = [{
    text: 'Cancel',
    onTap: function() {
      alert('CANCEL!')
    }
  }, {
    text: 'Submit',
    onTap: function() {
      alert('SUBMIT!')
    }
  }];

  $scope.urlItems = [{
    text: 'Biography',
    icon: 'ion-person',
    url: 'http://en.wikipedia.org/wiki/Nicolas_Cage'
  }, {
    text: 'Fan Club',
    icon: 'ion-star',
    url: 'http://cagealot.com/',
    isActive: true
  }];

})

.controller("ctrl-page-food-menu", function($scope){

})

.controller("ctrl-request-quotation", function($scope){

})

.controller("ctrl-page-faq", function($scope){

})

.controller("ctrl-page-contacts", function($scope){
	console.log("contacts");
});





