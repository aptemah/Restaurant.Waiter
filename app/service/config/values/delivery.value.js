angular.module('waiter.config').value('waiter.config.delivery', [
  { value: null, name: 'Не указана' },
  { value: 0, name: 'В ресторане' },
  { value: 1, name: 'Блюдо с собой' },
  { value: 2, name: 'Доставка по адресу' }
]);