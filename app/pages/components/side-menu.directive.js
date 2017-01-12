angular.module('waiter').directive('sideMenu', [ '$rootScope', '$timeout', '$location', function($rootScope, $timeout, $location) {

  return {
    restrict: 'E',
    templateUrl: 'app/pages/components/side-menu.directive.html',
    link: function(scope, element, attrs) {

      scope.hideMenu = function(){
        $rootScope.sideMenu = false;
      }

      element.on('click', function(){
        scope.hideMenu();
        scope.$apply()
      });

      scope.exit = function(){
        localStorage.removeItem('restaurant-service-current-point-id');
        localStorage.removeItem('restaurant-service-waiter-id');
        localStorage.removeItem('deviceId');
        $location.path('/authorization');
        $rootScope.sideMenu = false;
        $rootScope.exitButtonHide = true;
      };
    }
  };
}]);