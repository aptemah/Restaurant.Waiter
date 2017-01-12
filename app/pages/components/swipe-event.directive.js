angular.module('waiter').directive('swipeEvent', ['$rootScope', '$swipe', '$route', 'waiter.api', 
  function($rootScope, $swipe, $route, service) {
  return {
    scope: false,
    link: function(scope, element, attrs) {
      var delta,
          startX;

      $swipe.bind(element, {
        'start': function(coords) {
          startX = coords.x;
        },
        'move': function(coords) {
          delta = coords.x - startX;
                  $(element).css("transform", "translateX(" + delta + "px)");
          $(element).css("-webkit-transform", "translateX(" + delta + "px)");
        },
        'end': function(coords) {
          if (delta > 100 || delta < -100) {
            if (attrs.from == "server") {
              service.deleteProduct(attrs.swipeEvent);
              scope.order.OrderParts.forEach(function(item, i){
                  item.Products.forEach(function(item, j){
                    if (item.Id == attrs.swipeEvent) {
                      scope.order.OrderParts[i].Products.splice(j, 1);;
                      scope.$apply();
                    };
                  });

              });
            } else {
              delete $rootScope.newOrderInfo.products[attrs.swipeEvent];
              scope.$apply();
            };
          } else {
                  $(element).css("transform", "");
          $(element).css("-webkit-transform", "");
          };
        },
        'cancel': function(coords) {
          // ...
        }
      });
    }
  };
}]);