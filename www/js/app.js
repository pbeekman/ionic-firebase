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
        $state.go('order', {id: $scope.data.orderID})
    }
}]);

ionicfirebase.controller('orderController', ['$scope', '$state', '$stateParams', '$firebaseObject',  function($scope, $state, $stateParams, $firebaseObject) {
    
    var ref = new Firebase('https://justin-beeper.firebaseio.com/orders/' + $stateParams.id);
    var fbData = $firebaseObject(ref);

    $scope.data = fbData
    
    fbData.$watch(function() {
        if(fbData.complete)
        {
            alert('Je bestelling is klaar!');
            //$cordovaVibration.vibrate(1000);
        }
    });
}]);
