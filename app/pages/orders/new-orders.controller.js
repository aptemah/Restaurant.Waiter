angular.module('waiter').controller('newOrdersController', ['$scope', '$route', 'waiter.api', 'allOrders', 'waiter.config', 'waiter.config.delivery', 'waiter.config.payment',
    function ($scope, $route, service, allOrders, config, delivery, payment) {
    $scope.contentUrl = config.contentUrl + "icons/menu";
    $scope.orders = allOrders;
    $scope.getDelivery = function(value) {
        return delivery.filter(function (item) { return item.value == value }).map(function (item) { return item.name })[0];
    }

    $scope.getPayment = function (value) {
        return payment.filter(function (item) { return item.value == value }).map(function (item) { return item.name })[0];
    }

    $scope.addTableNo = function (orderId) {
        var tableNo = prompt();
        service.addTableNo(orderId, tableNo).then(function() {
            $route.reload();
        });
    }

    $scope.getOrder = function(orderId) {
        service.getOrder(orderId).then(function () {
            $scope.orders = $scope.orders.filter(function(i) {
                return i.Id != orderId;
            });
        });
    }
}]);