var ionicfirebase = angular.module('ionicfirebase', ['ionic', 'firebase']);

ionicfirebase.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});

ionicfirebase.config(function($stateProvider, $urlRouterProvider) {
	// Routing
	$stateProvider.state('index', {
		url: '/index',
		views: {
			'app-view': {
				templateUrl: 'templates/index.html',
				controller: 'indexController'
			}
		}
	})
	.state('order', {
		url: '/order/:id',
		views: {
			'app-view': {
				templateUrl: 'templates/order.html',
				controller: 'orderController'
			}
		}
	});

	$urlRouterProvider.otherwise('/index');
});

ionicfirebase.controller('indexController', ['$scope', '$state', function($scope, $state) {
	$scope.data = {};

	$scope.checkOrder = function() {
		$state.go('order', {id: $scope.data.orderID});
	};
}]);

ionicfirebase.controller('orderController', ['$scope', '$state', '$stateParams', '$firebaseObject', '$ionicLoading',  function($scope, $state, $stateParams, $firebaseObject, $ionicLoading) {

	var ref = new Firebase('https://justin-beeper.firebaseio.com/orders/' + $stateParams.id);
	$scope.data = $firebaseObject(ref);

	$ionicLoading.show({
		template: 'Bestelling ophalen...'
	});

	ref.on('value', function(snapshot) {
		$ionicLoading.hide();
		if(!snapshot.exists()) {
			$state.go('index');
		}
	});

	$scope.data.$watch(function() {
		if($scope.data.complete)
		{
			alert('Je bestelling is klaar!');
		}
	});
}]);
