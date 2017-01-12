angular.module('waiter.i18n').service('waiter.i18n', [
  'waiter.config', '$resource',
  function(config, $resource) {
    var currentLocale;
    var strings = {};
    var service = {

      selectLocale: function(locale) {
        currentLocale = locale;
        strings = $resource('assets/i18n/' + currentLocale + '.json').get();
      },

      t: function(key) {
        var prefix = 'i18n:';
        if (key.indexOf(prefix) !== 0) {
          return key;
        }
        key = key.substr(prefix.length);
        var keys = key.split('.');
        var value = strings;
        angular.forEach(keys, function(key) {
          value = value ? value[key] : undefined;
        });
        if (value !== undefined) {
          return value;
        }
        return key;
      }

    };
    if (config.language) {
      service.selectLocale(config.language);
    }
    return service;
  }
]);