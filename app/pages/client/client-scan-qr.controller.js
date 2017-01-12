angular.module('waiter').controller('clientScanQrController', ['$scope', '$rootScope', '$ionicPlatform', '$route', '$routeParams', 'waiter.api', '$location',
    function ($scope, $rootScope, $ionicPlatform, $route, $routeParams, service, $location) {

      $scope.scan = function() {

        cordova.plugins.barcodeScanner.scan(
          function (result) {
            $rootScope.newOrderInfo.userId = result.text; 
             $rootScope.closeOrderInfo.userId = result.text;
            $scope.getUser();
          },
            function (error) {
            alert("Scanning failed: " + error);
          },
          {
            "preferFrontCamera" : false, // iOS and Android
            "showFlipCameraButton" : false, // iOS and Android
            "prompt" : "Поместите QR код в область сканирования", // supported on Android only
            "formats" : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
            "orientation" : "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
          }
        );

      };

      $ionicPlatform.ready(function () {
        $scope.scan();
      });

      $scope.getUser = function(str){

          service.getUserFromId($rootScope.newOrderInfo.userId).then(function(data){
              $rootScope.newOrderInfo.userName = data.Name;
              $location.path($rootScope.pageToReturn);
          });

      };

}]);