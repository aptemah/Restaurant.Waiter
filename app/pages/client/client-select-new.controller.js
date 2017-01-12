angular.module('waiter').controller('clientSelectNewController', ['$scope', '$rootScope', '$route', '$routeParams', 'waiter.api', '$location',
    function ($scope, $rootScope, $route, $routeParams, service, $location) {

      $scope.phone = '+7';

        $scope.createUser = function(validation) {

            if (!validation){
              service.createUser($scope.name, $scope.phone).then(function(data){
                if (data.userId) {
                  $rootScope.newOrderInfo.userId = data.userId;
                  $rootScope.newOrderInfo.userName = $scope.name;
                  $location.path('/createOrder');
                } else {
                  $scope.allReadyRegistred = true;
                };
              });
            };
        };

}]);