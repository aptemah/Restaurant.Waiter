angular.module('waiter.api').service('waiter.api', [
    'waiter.api.factory', '$rootScope',
    function (requests, $rootScope) {

        var service = {
            getNewOrders: function() {
                return requests.query().$promise;
            },

            authorization: function(login, pass, deviceId) {
                return requests.authorization({ login: login, password: pass, deviceId : deviceId }).$promise.then(function(response) {
                    localStorage.setItem("restaurant-service-waiter-id", response.user);
                    localStorage.setItem("restaurant-service-current-point-id", response.restaurant);
                    $rootScope.waiterId = response.user;
                    $rootScope.pointId = response.restaurant;
                });
            },

            getWaiterOrders: function() {
                return requests.waiterOrders().$promise.then(function (e){return e.OrderList});
            },
            getOrder: function(orderId) {
                return requests.getOrder({ order: orderId }).$promise;
            },
            addTableNo: function(orderId, tableNo) {
                return requests.addTableNo({ order: orderId, tableNo: tableNo }).$promise;
            },
            getAllProducts: function() {
                return requests.getAllProducts().$promise;
            },
            changeProductQuantity: function(id, quantity) {
                return requests.changeProductQuantity({id: id, quantity: quantity}).$promise;
            },
            approveOrder: function( orderId ) {
                return requests.approveOrder({ orderId: orderId }).$promise;
            }, 
            createOrder: function( products, tableNo, userId, orderId ) {
                return requests.createOrder({products: products, tableNo: tableNo, userId: userId, orderId: orderId}).$promise;
            },
            addProduct: function( products, orderId ) {
                return requests.addProduct({ products: products, orderId: orderId }).$promise;
            },
            deleteProduct: function( id ) {
                return requests.deleteProduct({ id: id }).$promise;
            },
            closeOrder: function( orderId ) {
                return requests.closeOrder({ orderId: orderId }).$promise;
            },
            chargeBonus: function( userId, price ) {
                return requests.chargeBonus({ userId: userId, price: price }).$promise;
            },
            payByCash: function( price, bonusPrice, orderId ) {
                return requests.payByCash({price: price, bonusPrice: bonusPrice, orderId: orderId }).$promise;
            },
            getUser: function( searchPattern ) {
                return requests.getUser({ searchPattern: searchPattern }).$promise;
            },
            getUserFromId: function( searchPattern ) {
                return requests.getUserFromId({ searchPattern: searchPattern }).$promise;
            },
            getUserInfo: function( userId ) {
                return requests.getUserInfo({ userId: userId }).$promise;
            },
            createUser: function( name, phone ) {
                return requests.createUser({ name: name, phone: phone }).$promise;
            },
            getMenu: function(catId){
                if (catId == 'null') {
                    return requests.menuCategories({restId: $rootScope.pointId, catId: catId}).$promise;
                } else {
                    return requests.menuListOfProducts({restId: $rootScope.pointId, catId: catId}).$promise;
                }
            },
            searchProduct: function(searchPattern){
                return requests.searchProduct({ searchPattern: searchPattern }).$promise;
            }
        };
        return service;
    }
]);