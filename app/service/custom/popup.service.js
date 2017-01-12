angular.module('waiter.api').service('popup', [
    '$rootScope',
    function ($rootScope) {

        var service = {
            showPopup: function(msg, notPush) {
                service.appearance = true;
                service.message = msg;
                service.notPush = notPush;
            }
        };
        return service;
    }
]);