angular.module('waiter').controller('createOrderController', ['$scope', '$rootScope', '$location', '$route', '$routeParams', 'waiter.api', 'waiter.config', 'waiter.config.delivery', 'waiter.config.payment',
    function ($scope, $rootScope, $location, $route, $routeParams, service, config, delivery, payment) {
        $scope.contentUrl = config.contentUrl + "icons/menu";
        $scope.numbers = config.numberArray;
        $scope.emptyForms = false;

        if (!$rootScope.newOrderInfo){$rootScope.newOrderInfo = {}};

        $scope.productsLength = function(){

          if ($rootScope.newOrderInfo.products){
            return Object.keys($rootScope.newOrderInfo.products).length
          }

        };

        $scope.createOrder = function(){

            var products = [];
            if ($rootScope.newOrderInfo.userId && $rootScope.newOrderInfo.tableNo && $rootScope.newOrderInfo.products) {
                for ( var item in $rootScope.newOrderInfo.products ) {
                    products.push({id: item, quant: $rootScope.newOrderInfo.products[item].quantity})
                }
                service.createOrder(JSON.stringify(products), $rootScope.newOrderInfo.tableNo, $rootScope.newOrderInfo.userId).then(function(data){
                    $rootScope.newOrderInfo.products = null;
                    $location.path('/orderDetails/' + data.orderId);
                });
            } else { $scope.emptyForms = true }

        };


        $scope.addDish = function() {

            $rootScope.newOrderInfo.pageToReturn = '/createOrder';
            $location.path('/dishSelect/null');

        };


        $rootScope.newOrderInfo.price = function() {
            var allPrice = 0;
            for (var product in $rootScope.newOrderInfo.products) {
                allPrice += (parseInt($rootScope.newOrderInfo.products[product].price) * parseInt($rootScope.newOrderInfo.products[product].quantity));
            }
            return allPrice;
        };


        $scope.clientSelect = function(){
            $rootScope.pageToReturn = '/createOrder';
          $location.path('/clientSelect');
        };


}]);