angular.module('waiter').controller('orderDetailsController', ['$scope', '$rootScope', '$route', '$routeParams', '$location', 'waiter.api', 'allOrders', 'waiterOrders', 'waiter.config', 'waiter.config.delivery', 'waiter.config.payment',
    function ($scope, $rootScope, $route, $routeParams, $location, service, allOrders, waiterOrders, config, delivery, payment) {
        $scope.contentUrl = config.contentUrl + "icons/menu";
        $scope.numbers = config.numberArray;
        var orderId = $routeParams.orderId;

        $scope.productsLength = function(){

          if ($rootScope.newOrderInfo.products){
            return Object.keys($rootScope.newOrderInfo.products).length
          }

        };

        $rootScope.newOrderInfo.price = function() {
          var allPrice = 0;
          for (var product in $rootScope.newOrderInfo.products) {
            allPrice += (parseInt($rootScope.newOrderInfo.products[product].price) * parseInt($rootScope.newOrderInfo.products[product].quantity));
          }
          return allPrice;
        };

        allOrders.forEach(function(item){
            if (item["Id"] == orderId) {$scope.order = item; $scope.isWaiterOrder = false;}
        });

        waiterOrders.forEach(function(item){
            if (item["Id"] == orderId) {$scope.order = item; $scope.isWaiterOrder = true;}
        });

        $scope.productsOrderedLength = function(){

          var counter = 0;

          $scope.order.OrderParts.forEach(function(item){
            counter += item.Products.length;
          });

          return counter;

        };

        $scope.getDelivery = function(value) {
          return delivery.filter(function (item) { return item.value == value }).map(function (item) { return item.name })[0];
        };

      $scope.getPayment = function (value) {
          return payment.filter(function (item) { return item.value == value }).map(function (item) { return item.name })[0];
      };


      $scope.addTableNo = function () {

          service.addTableNo($scope.order.Id, $scope.order.TableNo).then(function() {
              $route.reload();
          });

      };


      $scope.changeProductQuantity = function(id, quantity){

        service.changeProductQuantity(id, quantity).then(function(){
          $route.reload()
        });

      }


      $scope.approveOrder = function() {

        service.approveOrder(orderId).then(function(){
          $route.reload();
        });

      };


      $scope.closeOrder = function() {

        service.closeOrder($scope.order.Id).then(function(data){
          $rootScope.closeOrderInfo.orderSum = $scope.order.OrderSum;
          $rootScope.closeOrderInfo.OrderBonusSum = $scope.order.OrderBonusSum;
          $rootScope.closeOrderInfo.orderId = $scope.order.Id;
          $rootScope.closeOrderInfo.userId = $scope.order.UserId;
          $location.path('/closeOrder');

        });


      };


      $scope.addDish = function() {

        $rootScope.newOrderInfo.pageToReturn = '/orderDetails/' + orderId;
        $location.path('/dishSelect/null');

      };


      $scope.changeQuantityOfAdditional = function(id, quantity) {
        $rootScope.newOrderInfo.products[id].quantity = quantity;
      };


      $scope.getOrder = function(orderId) {
          service.getOrder(orderId).then(function(){
            $route.reload();
          });
      };


      $scope.addProduct = function() {

        var products = [];
        for ( var item in $rootScope.newOrderInfo.products ) {
            products.push({id: item, quant: $rootScope.newOrderInfo.products[item].quantity})
        }
        service.addProduct(JSON.stringify(products), $scope.order.Id).then(function(){
          $rootScope.newOrderInfo.products = null;
          $route.reload();
        });

      };


}]);