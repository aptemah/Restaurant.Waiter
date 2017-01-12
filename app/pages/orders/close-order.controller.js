angular.module('waiter').controller('closeOrderController', ['$routeParams', 'popup', 'waiter.api', '$route', '$scope', '$rootScope', '$location',
    function ($routeParams, popup, service, $route, $scope, $rootScope, $location) {


      service.getUserInfo($rootScope.closeOrderInfo.userId).then(function(data){
        $scope.userName = data.name;
        $scope.userPhone = data.phone;
      });


      $scope.payByCash = function() {

        if ($rootScope.pageToReturn == '/closeOrder') {//Если это начисление бонусов
          service.chargeBonus($rootScope.closeOrderInfo.userId, $rootScope.closeOrderInfo.orderSum).then(function(data){
            popup.showPopup("Начислено: " + data.list + " бонусов", true);
            $location.path('/allOrders');
          });

        } else {//Если это полноценное закрытие заказа

          service.payByCash($rootScope.closeOrderInfo.orderSum, $rootScope.closeOrderInfo.OrderBonusSum, $rootScope.closeOrderInfo.orderId).then(function(data){
            service.closeOrder($rootScope.closeOrderInfo.orderId).then(function(data){
              if (data.Status == 'Ваш заказ был успешно закрыт.') {
                $location.path('/allOrders');
              }
            });
          });

        }

      };


}]);