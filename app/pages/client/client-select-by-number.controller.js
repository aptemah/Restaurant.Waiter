angular.module('waiter').controller('clientSelectByNumberController', ['$scope', '$rootScope', '$route', '$routeParams', 'waiter.api', '$location',
    function ($scope, $rootScope, $route, $routeParams, service, $location) {
        $scope.searchPattern = '+7';
        $rootScope.newOrderInfo.userName = "";
        $scope.spinner = false;

        $scope.getUser = function(str){
            $scope.spinner = true;
            service.getUser(str).then(function(data){
                $scope.spinner = false;
                $rootScope.newOrderInfo.userId = data.userId;
                $rootScope.newOrderInfo.userName = data.name;
                $rootScope.closeOrderInfo.userId = data.userId;
                $rootScope.closeOrderInfo.bonus = data.bonus;
            });

        };

}]);