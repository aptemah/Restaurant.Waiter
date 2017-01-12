angular.module('waiter').directive('bottomMenu', ['$location', '$rootScope', function($location, $rootScope) {

  return {
    restrict: 'E',
    templateUrl: 'app/pages/components/bottom-menu.directive.html',
    link: function($scope) {
      $scope.goToClientSelect = function() {
        $rootScope.pageToReturn = '/closeOrder';
        $location.path('/clientSelect');
      }
    }
  };
}]);