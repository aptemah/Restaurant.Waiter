angular.module('waiter.config').value('waiter.config.payment', [
  { value: null, name: 'Не указана' },
  { value: 0, name: 'Оплата наличными' },
  { value: 1, name: 'Оплата кредитной картой' },
  { value: 2, name: 'Оплата бонусами' }
]);