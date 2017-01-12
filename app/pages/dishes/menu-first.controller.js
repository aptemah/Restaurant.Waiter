angular.module('waiter').controller('menuFirstController', [ '$scope', '$rootScope', '$routeParams', 'waiter.api', '$location',
  function( $scope, $rootScope, $routeParams, service, $location ) {
    $scope.defaultParent = false;
    service.getMenu($routeParams.catId).then(function(data){
      $scope.isBonus = data.isBonus;
      $scope.parentCategory = data.Parent;
      if (!data.Parent) {
        $scope.defaultParent = true;
      };
      
      if ($routeParams.catId == 'null') {
        $scope.menu = data;
        $scope.status = 'category';
      } else {
        $scope.menu = data.Array;
        $scope.status = data.status;//нужно для определения крайнего уровня меню
      }
    });
    $scope.go = function(Id, name, price, weight, isBonus){
      if ($scope.status == 'category') {
        $location.path('/dishSelect/' + Id);
      } else {
        if ($rootScope.newOrderInfo.products == undefined) {
          $rootScope.newOrderInfo.products = new Object();
        }
        $rootScope.newOrderInfo.products[Id] = {name: name, price: price, weight: weight, quantity: 1, isBonus : isBonus};
        $location.path($rootScope.newOrderInfo.pageToReturn);
      }

    };


    $scope.search = function(searchPattern){
      if (searchPattern != null) {
        service.searchProduct(searchPattern).then(function(data){
          if (data.length == 0) {
            $scope.noFound = true;
          } else {
            $scope.noFound = false;
            $scope.menu = data;
            $scope.status = 'product';
            $scope.parentCategory = 'Результаты поиска';
            $scope.defaultParent = false;
          }
        })
      };
    };


}]);