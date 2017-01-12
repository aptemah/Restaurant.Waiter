angular.module('waiter').controller('ordersController', ['waiter.api', '$route', '$scope', '$location', 'waiterOrders', '$http', 'waiter.config', 'waiter.config.delivery', 'waiter.config.payment',
    function (service, $route, $scope, $location, waiterOrders, $http, config, delivery, payment) {
    $scope.contentUrl = config.contentUrl + "icons/menu";
    $scope.selectedProduct = 0;
    $scope.waiterOrders = waiterOrders;

    $scope.getDelivery = function (value) {
        return delivery.filter(function (item) { return item.value == value }).map(function (item) { return item.name })[0];
    }

    $scope.getPayment = function (value) {
        return payment.filter(function (item) { return item.value == value }).map(function (item) { return item.name })[0];
    }
}]);