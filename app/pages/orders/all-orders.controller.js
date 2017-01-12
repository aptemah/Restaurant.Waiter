angular.module('waiter').controller('allOrdersController', ['waiter.api', '$route', '$scope', '$location', 'waiterOrders', 'allOrders', '$http', 'waiter.config', 'waiter.config.delivery', 'waiter.config.payment',
    function (service, $route, $scope, $location, waiterOrders, allOrders, $http, config, delivery, payment) {
    $scope.contentUrl = config.contentUrl + "icons/menu";
    $scope.selectedProduct = 0;
    $scope.orders = allOrders;
    $scope.waiterOrders = waiterOrders;

    $scope.getDelivery = function (value) {
        return delivery.filter(function (item) { return item.value == value }).map(function (item) { return item.name })[0];
    }

    $scope.getPayment = function (value) {
        return payment.filter(function (item) { return item.value == value }).map(function (item) { return item.name })[0];
    }

    $scope.changeProductQuantity = service.changeProductQuantity;
    $scope.addTableNo = function (orderId) {
        var tableNo = prompt();
        service.addTableNo(orderId, tableNo).then(function () {
            $route.reload();
        });
    }
}]);