angular.module('waiter').controller('authorizationController', ['waiter.api', '$scope', '$location', '$http', 'waiter.config', function (service, $scope, $location, $http, config) {

    $scope.submit = function (validation) {

        if (!validation){
          if(!localStorage.getItem('deviceId')) {localStorage.deviceId = "noDeviceId"}
          service.authorization($scope.login, $scope.pass, localStorage.deviceId).then(function() {
              $location.path("/index");
          }, function () {
              $scope.wrongData = true;
          });
        };

    };
}]);