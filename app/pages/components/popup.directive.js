angular.module('waiter').directive('popup', ['$rootScope', 'popup', '$compile', function($rootScope, popup, $compile) {

  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'app/pages/components/popup.directive.html',
    link: function(scope, element, attrs) {
      scope.$watch(function(){
        return popup.appearance;
      }, function(){
        scope.appearance = popup.appearance;
        scope.message = popup.message;
        scope.notPush = popup.notPush;
      });
      scope.$watch(function(){
        return scope.appearance;
      }, function(){
        popup.appearance = scope.appearance;
      });
    }
  };
}]);
angular.module('waiter').directive('popupCloseAble', function() {//Закрытие поп-апа кликом по пустому месту
    return {
        restrict: 'A',
        scope: {
          ngShowModel :'=ngShow'
        },
        link: function ($scope, $element, $attrs) {
            $($element).on("click", function(){
              $scope.ngShowModel = false;
              $scope.$apply();
            });
            $($element).find("*").on("click", function(e){
              e.stopPropagation();
            });
        }
    };
});