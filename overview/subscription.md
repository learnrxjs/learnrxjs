# Подписка

Что такое Подписка (Subscription)? Подписка представляет собой ресурс(память) потраченный на выполнение Observable. Объект Subscription, реализует всего один, но очень важный метод `unsubscribe`, он не принимает никаких аргументов, все что он делает это останавливает выполнение Obsevable к которому он ссылается, тем самым освобождая память.

```js
import { interval } from 'rxjs';

const observable = interval(1000);
const subscription = observable.subscribe(x => console.log(x));

// Позже:
// Отменяет выполнение Observable
// на который ранее подписались
subscription.unsubscribe();
```

Подписки могут быть объеденены вместе, при вызове метода `unsubscribe` он так же попутно отпишется от вложенных подписок:

```js
import { interval } from 'rxjs';

const observable1 = interval(400);
const observable2 = interval(300);

const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));

subscription.add(childSubscription);

setTimeout(() => {
  // Отписывается от обоих подписок subscription и childSubscription
  subscription.unsubscribe();
}, 1000);
```

При выполнении мы получим:

```js
second: 0
first: 0
second: 1
first: 1
second: 2
```
