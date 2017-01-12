angular.module('waiter.api').factory('waiter.api.factory', [
  '$resource', 'waiter.config', '$rootScope',
  function ($resource, config, $rootScope) {
      var actionOrderUrl = function (serverMethodName) {
          return config.serverUrl + '/Order/' + serverMethodName;
      };
      var actionUserUrl = function (serverMethodName) {
          return config.serverUrl + '/Authorization/' + serverMethodName;
      };
      var actionMenuUrl = function (serverMethodName) {
          return config.serverUrl + '/ProductAdmin/' + serverMethodName;
      };
      var actionDishesUrl = function (serverMethodName) {
          return config.serverUrl + '/Menu/' + serverMethodName;
      };
      var params = {
          point: function () { return $rootScope.pointId },
          waiter: function () { return $rootScope.waiterId }
      };

      var request = $resource('', params, {
          query: { method: 'GET', url: actionOrderUrl('AllOrders'), isArray: true },
          authorization: { method: "POST", url: actionUserUrl('AuthorizationWaiter') },
          waiterOrders: { method: "GET", url: actionOrderUrl('Orders') },
          getOrder: { method: "GET", url: actionOrderUrl('GetOrder?order=:order') },
          addTableNo: { method: "GET", url: actionOrderUrl('addTableNo?order=:order&tableNo=:tableNo') },
          getAllProducts: { method: "GET", url: actionMenuUrl('GetAllProducts') },
          
          approveOrder: { method: "GET", url: actionOrderUrl('ApproveOrder?orderId=:orderId') },
          createOrder: { method: "GET", url: actionOrderUrl('createOrder?products=:products&tableNo=:tableNo&userId=:userId&orderId=:orderId') },
          addProduct: { method: "GET", url: actionOrderUrl('addProduct?products=:products&orderId=:orderId') },
          deleteProduct: { method: "GET", url: actionOrderUrl('deleteProduct?id=:id') },
          changeProductQuantity: { method: "GET", url: actionOrderUrl('changeProductQuantity?id=:id&quantity=:quantity') },
          closeOrder: { method: "GET", url: actionOrderUrl('CloseOrder?orderId=:orderId') },
          chargeBonus: { method: "GET", url: actionOrderUrl('chargeBonus?userId=:userId&price=:price'), transformResponse: function (data) {return {list: angular.fromJson(data)} } },
          payByCash: { method: "GET", url: actionOrderUrl('payByCash?price=:price&orderId=:orderId&bonusPrice=:bonusPrice') },
          getUser: { method: "GET", url: actionOrderUrl('GetUser?searchPattern=:searchPattern') },
          getUserFromId: { method: "GET", url: actionOrderUrl('GetUserFromId?searchPattern=:searchPattern') },
          getUserInfo: { method: "GET", url: actionOrderUrl('getUserInfo?userId=:userId') },
          createUser: { method: "GET", url: actionOrderUrl('createUser?name=:name&phone=:phone') },
          searchProduct: { method: "GET", url: actionOrderUrl('SearchProduct?searchPattern=:searchPattern'), isArray: true },

          menuCategories: { method: "GET", url: actionDishesUrl('CatMenu?restId=:restId&catId=:catId'), isArray: true },
          menuListOfProducts: { method: "GET", url: actionDishesUrl('CatProd?restId=:restId&categoryId=:catId') }
      });

      return request;
  }
]);