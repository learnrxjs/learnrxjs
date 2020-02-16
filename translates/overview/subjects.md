# Subject-ы

Subject является подтипом Observable, позволяющий отправлять данные сразу нескольким наблюдателям (Observer), в то время как Observable отправляет данные только одному наблюдателю (каждая связка Observable и наблюдатель - независима). Subject-ы очень похожи на EventEmitter-ы, так как они тоже хранят список подписчиков.

Отличия между Observable и Subject

|                                             | Observable | Subject |
| ------------------------------------------- | ---------- | ------- |
| Имеет список подписчиков                    | ❌          | ✅       |
| Выполняется занового для каждого подписчика | ✅          | ❌       |

Каждый Subject одновременно является и наблюдаемым объектом (Observable) и наблюдателем (Observer) поэтому реализует как метод `subscribe` для получения данных, так и методы `next(v)`,`error(e)`и`complete()` для отправки данных.

В примере ниже, мы имеем два подписчика и отправляем некоторые данные:

```ts
import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(1);
subject.next(2);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```

Так как Subject может выходить в роли Наблюдателя, это означает что вы можете как аргумент метода `sibscribe` передать Subject:

```ts
import { Subject, from } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

const observable = from([1, 2, 3]);

observable.subscribe(subject); // Вы можете подписаться передав Subject

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```

## Многоадресные Observable-ы

Чтобы сделать Observable похожим на Subject, то есть не выполнять каждый раз поток заново, для каждого подписчика, его можно сделать многоадресным (multicast), чтобы он отправляет значения через Subject

Ниже приведена реализация тех самых многоадресных Observable. Которые работают через операторВ частности использование `multicast`:

```ts
import { from, Subject } from 'rxjs';
import { multicast } from 'rxjs/operators';

const source = from([1, 2, 3]);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));

// На самом деле это вызов `subject.subscribe({...})`:
multicasted.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
multicasted.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

// Обертка над методом `source.subscribe(subject)`:
multicasted.connect();
```

Под капотом, все это работает  так: вызывая метод `subscribe` у Observable, на самом деле вы подписываетесь на Subject, в то время как сам Subject подписан на исходный Observable. Оператор `multicast` возвращает не совсем обычный Observable, как вы уже могли заметить. `multicast` возвращает `ConnectableObservable` который наследуюется от обычного Observable и реализующий метод `connect`

### Подсчет подписок

Вызов метода `connect` и обработка подписок может быть несколько громоздкой. В следствии этого мы хотим автоматически вызывать метод `connect` при появлении первого подписчика и автоматически отменять выполнение, когда последний подписчик отписывается.

Ниже алгоритм действий, выполнение которого мы ходим видеть, в листинге ниже:

1. Появляется первый подписчик

2. Вызывается метод `connect` 

3. Первому подписчику приходит значение `0`

4. Появляется второй подписчик

5. Значение `1` получает первый подписчик

6. Значение `1` получает второй подписчик

7. Первый подписчик отписывается

8. Значение `2` получает второй подписчик

9. Второй подписчик отписывается

10. Отписка от самого Observable

```ts
import { interval, Subject } from 'rxjs';
import { multicast } from 'rxjs/operators';

const source = interval(500);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));
let subscription1, subscription2, subscriptionConnect;

subscription1 = multicasted.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

// Мы должны вызвать метод `connect`, чтобы подписчики начали получать значения
subscriptionConnect = multicasted.connect();

setTimeout(() => {
  subscription2 = multicasted.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  });
}, 600);

setTimeout(() => {
  subscription1.unsubscribe();
}, 1200);

// Мы должны отписаться от Observable, потому что больше нет подписчиков и для остановки выполнения
setTimeout(() => {
  subscription2.unsubscribe();
  subscriptionConnect.unsubscribe();
}, 2000);
```

Если мы хотим избежать явного вызова метода `connect`, мы можем использовать метод `refCount` класса ConnectableObservable, который запускает механизм следящий за **количеством** подписчиков. Когда количество подписчиков увеличивается с `0` до `1`, то refCount вызывает метод `connect`. И когда количество подписчиков уменьшается с `1` до `0`, он отписыватся от исходного Observable.

> `refCount` регулирует выполнение ConnectableObservable автоматически, подписываясь когда появляется первый подписчик и отписываясь при уходе последнего

```ts
import { interval, Subject } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators';

const source = interval(500);
const subject = new Subject();
const refCounted = source.pipe(multicast(subject), refCount());
let subscription1, subscription2;

// Здесь будет вызван `connect()`, потому что
// появился первый подписчик
console.log('observerA subscribed');
subscription1 = refCounted.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

setTimeout(() => {
  console.log('observerB subscribed');
  subscription2 = refCounted.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  });
}, 600);

setTimeout(() => {
  console.log('observerA unsubscribed');
  subscription1.unsubscribe();
}, 1200);

setTimeout(() => {
  console.log('observerB unsubscribed');
  subscription2.unsubscribe();
}, 2000);

// Logs
// observerA subscribed
// observerA: 0
// observerB subscribed
// observerA: 1
// observerB: 1
// observerA unsubscribed
// observerB: 2
// observerB unsubscribed
```

Метод `refCount` имеется только у класса ConnectableObservable и возвращает он простой Observable.

## BehaviorSubject

BehaviorSubject является разновидностью Subject-а, он хранит последнее полученное значение и автоматически отправляет его при появлении нового подписчика.

В примере ниже, создается BehaviorSubject с изначальным значением `0` и первый подписчик получит его как только подпишется на Subject. А вот второй по порядку подписчик получит значение `2` даже в случае подписки на Subject после того как произошел `next(2)`.

```ts
import { BehaviorSubject } from 'rxjs';
const subject = new BehaviorSubject(0); // 0 изначальное значение
console.log(`Current value is: ${subject.value}`)

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(3);

// Logs
// Current value is: 0
// observerA: 0
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```

## ReplaySubject

ReplaySubject похож на BehaviorSubject, он тоже хранит некие значения и точно так же шлет их новым подписчикам при их подписке, а так же он может запоминать "часть" значений Observable.

> ReplaySubject запоминает множество значений и отправляет эти значения новым подписчикам.

Когда вы создаете `ReplaySubject` вы можете указать количество значений которые он сохранит:

```ts
import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(3); // отправляет последние 3 значения новым подписчикам

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(5);

// Logs:
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerB: 2
// observerB: 3
// observerB: 4
// observerA: 5
// observerB: 5
```

Так же вы можете указать как долго хранить значения указав так называемый `windowTime`. В примере ниже мы создаем ReplaySubject с достаточно большим колчеством хранения значений - `bufferSize`, но `windowTime` установил всего лишь в 500 мс.:

```ts
import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(100, 500 /* windowTime */);

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

let i = 1;
setInterval(() => subject.next(i++), 200);

setTimeout(() => {
  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  });
}, 1000);

// Logs
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerA: 5
// observerB: 3
// observerB: 4
// observerB: 5
// observerA: 6
// observerB: 6
// ...
```

## AsyncSubject

AsyncSubject отправляет только последнее значение своим подписчикам, но только после того как буден вызван `complete`:

```ts
import { AsyncSubject } from 'rxjs';
const subject = new AsyncSubject();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(5);
subject.complete();

// Logs:
// observerA: 5
// observerB: 5
```

AsyncSubject очень похож на оператор `last()`, который так же ждет пока Obserrvable завершится и отправляет последнее значение.
