# Observable

Observable это ленивая реализация Push стратегии имеющая множественное количество значений. Она занимает недостающее место в таблице ниже:

|      | Единичное                                                                                               | Множественное                                                                                      |
| ---- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Pull | [Function](https://developer.mozilla.org/en-US/docs/Glossary/Function)                                  | [Interator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) |
| Push | [Promise](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise) | [Observable](https://rxjs.dev/class/es6/Observable.js~Observable.html)                             |

Например, Obsevable ниже последовательно отправит `1`, `2`, `3`, после того как на него подпишутся, через секунду будет отправлено `4`

```js
import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});
```

Чтобы получить значения описанные в Observable, мы должны вызвать метод _subscribe_:

```js
import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log('just before subscribe');

observable.subscribe({
  next(x) { console.log('got value ' + x); },
  error(err) { console.error('something wrong occurred: ' + err); },
  complete() { console.log('done'); }
});

console.log('just after subscribe');
```

В консоли мы получим:

```js
"just before subscribe"
"got value 1"
"got value 2"
"got value 3"
"just after subscribe"
"got value 4"
"done"
```

## Pull и Push

Pull и Push две разные стратегии описывающие то как _Производитель_(Producer) может взаимодействовать с _Потребителем_(Consumer) по средством данных.

### Pull стратегия

В Pull стратегии Потребитель сам говорит когда получить данные от Производителя. Производитель не знает когда Потребитель получит данные.

Любая Javascript функция реализует Pull стратегию. Функция это Производитель, а код вызывая эту функцию и при этом являсь Потребителем, "вытягивает" **единичный** результат.

В стандарте ES2015 появились [функции генераторы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) (`function*`) другой тип Pull стратегии.

Код который вызывает `interator.next()` является Потребителем, а Производителем является сам интератор из которого "вытягивают" **множественное** количество данных

### Push стратегия

В Push стратегии, Производитель сам решает когда ему отпраивить данные Потребителю. Потрибитель никогда не знает когда получит данные.

Promise яркий пример Push стратегии. Promise (Производитель) отправляет **единичное** значение в зарегестрированную фукцию (Потребитель).

На основании полученной информации можно составить таблицу ниже:

|      | Производитель                                                         | Потребитель                                     |
| ---- | --------------------------------------------------------------------- | ----------------------------------------------- |
| Pull | Пассивен: вычисляет и отправляет данные когда их запрашивают          | Активен: решает когда ему получить данные       |
| Push | Активен: вычисляет и отправляет данные когда сам посчитает это нужным | Пассивен: просто реагирует на полученные данные |

RxJS представялет Observable, новый вид Push стратегии в Javascript. Observable является Производителем множества значений отправляющих их в Observer (Потребитель).

- **Функция** - лениво вычисляемо и синхронно отправляет данные при вызове в *единичном* виде

- **Генератор** - так же как и функция, но может возвращать *множество* значений

- **Promise** - возвращает (или нет) значение в *единичном* виде

- **Observable** - лениво исполняющее вычесление, которое может синхронно или асинхронно вернуть или не вернуть *множество* значений

## Observables как обобщение функции

Вопреки популярному мнению, Observable-ы не похожи на EventEmitter-ы и так же не похожи на Promise-ы которые просто возвращают множество значений. Observable может вести себя как EventEmitter в некоторых случаях, а именно когда ипользуют мультикастинг с RxJS Subject-ами, но обычно они это не так.

Взгляните на следующий пример:

```js
function foo() {
  console.log('Hello');
  return 42;
}

const x = foo.call(); // same as foo()
console.log(x);
const y = foo.call(); // same as foo()
console.log(y);
```

В консоли мы получим следующее:

```js
"Hello"
42
"Hello"
42
```

Мы можем описать такое же поведение, только с помощью Observable:

```js
import { Observable } from 'rxjs';

const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
});

foo.subscribe(x => {
  console.log(x);
});
foo.subscribe(y => {
  console.log(y);
});
```

И получим тоже самое:

```js
"Hello"
42
"Hello"
42
```

Это происходит потому что, как функция, так и Observable ленивы в вычислениях. Если вы не вызовите функцию то `console.log("Hello")` не вызовется. Так и Observable, пока вы не "вызовите" (в этом случае это `subscribe`), то `console.log("Hello")` не произойдет. Так же как вызов у функции, как и подписка у Observable изолированы, две функции производят два изолированных эффекта.

> Подписка на Observable практически тоже самое что и вызов фукнции.

Некоторые люди считают что Observable-ы асинхронные. Это не правда. Если вы будете логировать функцию перед и после ее вызова, как представлено ниже:

```js
console.log('before');
console.log(foo.call());
console.log('after');
```

 То получите:

```js
"before"
"Hello"
42
"after"
```

Такое же поведение и у Observable:

```js
console.log('before');
foo.subscribe(x => {
  console.log(x);
});
console.log('after');
```

Вывод будет таков:

```js
"before"
"Hello"
42
"after"
```

Это доказывает что выполнение `foo` при подписке полностью синхронно, как функция, но Observable могут передавать значения как синхронно так и асинхронно.

В чем отличие Observable от функции? **Observable может "возвращать" множество значений**, в отличии от фукнции. К примеру вы не можете выполнить, код ниже:

```js
function foo() {
  console.log('Hello');
  return 42;
  return 100; // никогда не выполнится, исполнение кода не дойдет до этой строки
}
```

Функции могут вернуть только одно значение, в отличии от Observable:

```js
import { Observable } from 'rxjs';

const foo = new Observable(subscriber => {
  console.log('Hello');

  subscriber.next(42);
  subscriber.next(100); // "возвращает" значение
  subscriber.next(200); // "возвращает" и еще одно
});

console.log('before');
foo.subscribe(x => console.log(x));
console.log('after');
```

Получаем синхронный вывод:

```js
"before"
"Hello"
42
100
200
"after"
```

Но вы так же можете "вернуть" значение асинхронно:

```js
import { Observable } from 'rxjs';

const foo = new Observable(subscriber => {
  console.log('Hello');

  subscriber.next(42);
  subscriber.next(100);
  subscriber.next(200);

  setTimeout(() => {
    subscriber.next(300); // выполнится ассинхронно
  }, 1000);
});

console.log('before');
foo.subscribe(x => console.log(x));
console.log('after');
```

И мы получим:

```js
"before"
"Hello"
42
100
200
"after"
300
```

Заключение:

- `func.call()` значить *дай мне одно значение синхронно*

- `observable.subscribe()` значить *дай мне какое-то количество значений синхронно или асинхронно*

## Анатомия Observable

Observable-ы **создаются** с помощью `new Observable` или порождающими операторами. Могут быть **подписаны** каким-то Наблюдателем(Observer), **выполнены** для уведомления `next`/`error`/`complete` Observer-а, а так же исполнение может быть **прекращено**. Эти четыре аспекта описывают Observable, некотрые из этих аспектов так или иначе пересекаются с другими типами, такими как Observer или Subscription.

Основные аспекты Observable:

- **Создание** Observable-а

- **Подписка** на Observable

- **Выполнение** Observable-а

- **Прекращение** выполнения Observable-а

### Создание Observable

Конструктор `Observable` принимает только один аргумент, это функция подписки(`subscribe`)

Пример ниже создает Observable который шлет строку `hi` подписчику каждую секунду:

```js
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next('hi')
  }, 1000);
});
```

 Observable-ы могут быть созданы через вызов конструктора как обычный объект, так и через порождающие операторы такие как `of`, `from`, `interval`и др. чаще всего используется второе.

В примере выше, функция `subscribe` является самой важной частью описывающая Observable. Давайте узнаем что на самом деле значить подписка(`subscription`).

### Подписка на Observable

На Observable `observable` (название переменной) в примере ниже можно *подписаться*, так:

```ts
observable.subscribe(x => console.log(x));
```

Это не совпадение что `observable.subscribe` и функция `subscribe` в `new Observable(function subscribe(subscriber) {...})` имеют одинаковые имена. В библиотеке, их реализации разные, но из практических целей вы можете считать их концептуально одинаковыми.

Это показывает что вызов `subscribe` не распространяется  среди множества Observer-ов одного и того же Observable. Когда выполняется метод `observable.subscribe` с неким Observer-ом, функция `subscribe` в `new Observable(function subscribe(subscriber) {...})` запускается с переданным в виде параметра подписчиком. Каждый вызов `observable.subscribe` запускает независимый механизм подписки для этого подписчика. Все Observer-ы никак не связаны друг с другом, напротив они изолированы.

Это основное отличие от событийно-ориентированнх API таких как `addEventListener`/`removeEventListener`. C вызовом метода `observable.subscribe` мы не регистрируем слушателя в Observable. Observable даже не содержит список слушаюших его Observer-ов.

Вызов метода `subscribe` самый простой способ запустить "исполнение Observable", чтобы он стал отправлять данные своим подписчиков. 

### Выполнение Observable

Код внутри `new Observable(function subscribe(subscriber) {...})` представялет собой "исполнение Observable", эти вычисления ленивы и исполняются каждый раз для подписавшихся Observer-ов.

Есть 3 вида отправки данных нашему Observer-у:

- "Next": уведомляет о новых данных (например, число(Number), строка(String), объект(Object) и т.д.)

- "Error": уведомляет об ошибке (это может быть Javascript Error или исключение)

- "Complete": уведомляет Observer о том что Observable завершается и больше не будет слать новые значения

"Next" самое важное уведомление, именно оно несет в себе полезные данные которые получит подписчик. "Error" и "Complete" уведомления могут случиться только один раз и произойти может только один из них.

Эти ограничения лучше всего выражены в так называемой *Observable Грамматике* или регулярным выражением:

```regex
next*(error|complete)?
```

Внутри исполнения Observable, метод Next может быть вызван сколь угодно раз, а может вообще быть не вызванным. Важно заметить, что после вызова Error или Complete, никакие ниже идущие инструкции не возымеют никакого эффекта.

В примере ниже Observable вызывает 3 раза Next и завершается:

```ts
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});
```

То о чем мы говорили выше, код ниже не доставит значение `4` подписчику:

```ts
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  subscriber.next(4); // Не будет доставлено так как вызвано после завершения Observable
});
```

Стоит упомянуть что конструкция `try`/`catch` не нужна, даже если произойдет ошибка или исключение, она все равно попадет в "Error":

```js
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  foo(); // Вызывет subscriber.error!
  subscriber.complete();
});

observable.subscribe({
  next(x) { console.log('got value ' + x); },
  error(err) { console.error('something wrong occurred: ' + err); },
  complete() { console.log('done'); }
});
```

### Прекращение выполнения Observable

Так как выполнение Observable может быть бесконечным и для Obsever-а характерно прекратить выполенение в определенное время, то нам нужно API для отмены исполнения Observable.

Так как исполнение происходит для каждого Observer-а, то после того как Observer получит нужные ему данные, мы должно прекратить выполнение Observable во избежании утечек памяти.

Когда мы вызываем `observable.subscribe` Observer привязывается к недавно созданному Observable. Вызов этого метода так же возвращает объект который называется `Subscription`:

```js
const subscription = observable.subscribe(x => console.log(x));
```

Subscription представляет собой текущее выполнение и предоставляет минимальное API для отмены выполнения. С помощью вызова метода `subscription.unsubscribe` вы отмените выполнение:

```js
import { from } from 'rxjs';

const observable = from([10, 20, 30]);
const subscription = observable.subscribe(x => console.log(x));

// Позже:
subscription.unsubscribe();
```

Вы можете описать функцию отписки при создании Observable.

Например, отменять выполнение интервала запущенного с помощью `setInterval`:

```ts
const observable = new Observable(function subscribe(subscriber) {
  // Запоминаем ID интервала
  const intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);

  // Предоставляем способ отмены работы интервала
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});
```

Так же как и `observable.subscribe` напоминает функцию `subscribe` в `new Observable(function subscribe() {...})`, так и `unsubscribe` которую мы возращаем из функции `subscribe` концептуально равна `subscription.unsibscribe`. И если мы уберем реализацию ReactiveX мы получим вполне простой Javascript:

```js
function subscribe(subscriber) {
  const intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);

  return function unsubscribe() {
    clearInterval(intervalId);
  };
}

const unsubscribe = subscribe({next: (x) => console.log(x)});

// Позже:
unsubscribe(); // Чистим память
```

Причины по которым мы используем Rx типы (Observable, Observer, Subscription) это безопасность и совместимость с операторами. 
