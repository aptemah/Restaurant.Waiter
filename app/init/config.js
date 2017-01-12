angular.module('waiter').config(['$routeProvider',
  function ($routeProvider) {
      moment.locale('ru');
      if (window.screen) {
          if (screen.lockOrientation) {
              screen.lockOrientation('portrait');
          }
          if (screen.orientation && screen.orientation.lock) {
              screen.orientation.lock('portrait').then(null, function () {
                  // ignore if device orientation cannot be locked
              });
          }
      }

      $routeProvider
          .when('/allOrders', {
              templateUrl: "app/pages/orders/all-orders.view.html",
              controller: "allOrdersController",
              resolve: {
                  allOrders: [
                      'waiter.api', function (orderService) {
                          return orderService.getNewOrders();
                      }
                  ],
                  waiterOrders: [
                      'waiter.api', function (orderService) {
                          return orderService.getWaiterOrders();
                      }
                  ]
              }
          })
          .when('/newOrders', {
              templateUrl: "app/pages/orders/new-orders.view.html",
              controller: "newOrdersController",
              resolve: {
                  allOrders: [
                      'waiter.api', function (orderService) {
                          return orderService.getNewOrders();
                      }
                  ],
                  waiterOrders: [
                      'waiter.api', function (orderService) {
                          return orderService.getWaiterOrders();
                      }
                  ]
              }
          })
          .when('/waiterOrders', {
              templateUrl: "app/pages/orders/waiter-orders.view.html",
              controller: "ordersController",
              resolve: {
                  waiterOrders: [
                      'waiter.api', function (orderService) {
                          return orderService.getWaiterOrders();
                      }
                  ]
              }
          })
          .when('/orderDetails/:orderId', {
              templateUrl: "app/pages/orders/order-details.view.html",
              controller: "orderDetailsController",
              resolve: {
                  allOrders: [
                      'waiter.api', function (orderService) {
                          return orderService.getNewOrders();
                      }
                  ],
                  allProducts: [
                      'waiter.api', function (orderService) {
                          return orderService.getAllProducts();
                      }
                  ],
                  waiterOrders: [
                      'waiter.api', function (orderService) {
                          return orderService.getWaiterOrders();
                      }
                  ]
              }
          })
          .when('/createOrder', {
              templateUrl: "app/pages/orders/create-order.view.html",
              controller: "createOrderController"
          })
          .when('/closeOrder', {
              templateUrl: "app/pages/orders/close-order.view.html",
              controller: "closeOrderController"
          })
          .when('/dishSelect/:catId', {
              templateUrl: "app/pages/dishes/menu-first.view.html",
              controller: "menuFirstController",
          })
          .when('/authorization', {
              templateUrl: "app/pages/personalization/authorization.view.html",
              controller: "authorizationController"
          })
          .when('/clientSelect', {
              templateUrl: "app/pages/client/client-select.view.html",
              controller: "clientSelectController"
          })
          .when('/clientSelectByNumber', {
              templateUrl: "app/pages/client/client-select-by-number.view.html",
              controller: "clientSelectByNumberController"
          })
          .when('/clientScanQr', {
              templateUrl: "app/pages/client/client-scan-qr.view.html",
              controller: "clientScanQrController"
          })
          .when('/clientSelectNew', {
              templateUrl: "app/pages/client/client-select-new.view.html",
              controller: "clientSelectNewController"
          })
          .otherwise({
                redirectTo: '/allOrders'
           });;
  }
]).run([
  '$rootScope', '$location', '$route', '$window', 'popup', '$timeout',
  function ($rootScope, $location, $route, $window, popup, $timeout) {
      angular.extend($rootScope, {
          waiterId: localStorage['restaurant-service-waiter-id'],
          pointId: localStorage['restaurant-service-current-point-id'],
          imagePath : 'http://anton.intouchclub.ru/Content/Restaurant/icons/menu/',
          bottomMenu: true,
          pageToReturn: '',
          sideMenu: false,
          go: function(str) {
            $location.path(str);
          },
          goBack: function(str) {
              $window.history.back();
          },
          newOrderInfo: new Object(),
          closeOrderInfo: new Object()
      });

      $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
          //Проверка для скрытия кнопки назад на определенных страницах
        var result,
            str = location.hash,
            pagesWithNoPointAsk = [
              "/authorization"
            ];
        for (var i = pagesWithNoPointAsk.length - 1; i >= 0; i--) {
          result = str.search(pagesWithNoPointAsk[i]);
          if (result !== -1) {
            $rootScope.backButtonHide = true; break;
          } else {
            $rootScope.backButtonHide = false;
          };
        };
        if (!localStorage.getItem('restaurant-service-waiter-id') || !localStorage.getItem('restaurant-service-current-point-id')) {
              $rootScope.exitButtonHide = true;
          } else {
              $rootScope.exitButtonHide = false;
          }
        });

      $rootScope.$on("$routeChangeStart", function (event, next, current) {

        if (!localStorage.getItem('restaurant-service-waiter-id') || !localStorage.getItem('restaurant-service-current-point-id')) {
            if (next.templateUrl == "app/pages/personalization/authorization.view.html") {
                // already going to #login, no redirect needed
            } else {
                // not going to #login, we should redirect now
                $location.path("/authorization");
            }
        } else {
            if (next.templateUrl == "app/pages/personalization/authorization.view.html") {
                $location.path("/allOrders");
            }
        }

      });


      if (window.PushNotification) {
        var push = PushNotification.init({
          android: { senderID: '203705340115', sound: 'true' },
          ios: { alert: 'true', badge: 'true', sound: 'true' },
          windows: {}
        });
        push.on('registration', function (data) {
          localStorage.deviceId = data;
        });
        push.on('notification', function (data) {
          popup.showPopup(data.text);
        });
        push.on('error', function (e) {
          popup.showPopup(e.message);
        });
      };

  }
]);



