# MergeMap

# Сигнатура

```typescript
mergeMap<T, R, O extends ObservableInput<any>>(
  project: (value: T, index: number) => O,
  resultSelector?: number | ((outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R),
  concurrent: number = Number.POSITIVE_INFINITY
): OperatorFunction<T, ObservedValueOf<O> | R>
```

Подписывается на Observable-ы возвращаемые функцией `project` и отправляет их значения во внейшний Observable по мере поступления значений из внутреннего Observable

> 💡 Если вам требуется иметь только одну активную подписку, то используйте [`switchMap`](switch-map.md)

> 💡 Если вам требуется отправлять данные из внутреннего Observable во внешний в порядке очереди, то используйте [`concatMap`](concat-map.md)

## Параметры

- `project`

  Функция возвращающая Observable, когда приходит новое значение

- `resultSelector`

  Преобразует значение полученное из внутреннего Observable перед тем как отправить его во внешний

- `concurrent`

  Максимальное число подписок на внутренние Observable-ы. Например, `concatMap` использует под копотом `mergeMap` со значением аругмента `concurrent` в 1

## Примеры

### Пример 1: сохранение координат кликов пользователя

```typescript
// RxJS v6+
import { fromEvent, of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';

// faking network request for save
const saveLocation = location => {
  return of(location).pipe(delay(500));
};
// streams
const click$ = fromEvent(document, 'click');

click$
  .pipe(
    mergeMap((e: MouseEvent) => {
      return saveLocation({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });
    })
  )
  // Saved! {x: 98, y: 170, ...}
  .subscribe(r => console.log('Saved!', r));
```

### Пример 2: использование [`ajax`](../creation/ajax.md) observable

```typescript
// RxJS v6+
import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap } from 'rxjs/operators';

// free api url
const API_URL = 'https://jsonplac`eholder.typicode.com/todos/1';

// streams
const click$ = fromEvent(document, 'click');

click$
  .pipe(
    /*
     * Using mergeMap for example, but generally for GET requests
     * you will prefer switchMap.
     * Also, if you do not need the parameter like
     * below you could use mergeMapTo instead.
     * ex. mergeMapTo(ajax.getJSON(API_URL))
     */
    mergeMap(() => ajax.getJSON(API_URL))
  )
  // { userId: 1, id: 1, ...}
  .subscribe(console.log);
```

### Пример 3: Использование Promise (так же можно использовать [`from`](../creation/from.md) для конвертирования Promise в Observable)
```typescript
// RxJS v6+
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

// helper to create promise
const myPromise = val =>
  new Promise(resolve => resolve(`${val} World From Promise!`));

// emit 'Hello'
const source$ = of('Hello');

// map to promise and emit result
source$
  .pipe(mergeMap(val => myPromise(val)))
  // output: 'Hello World From Promise'
  .subscribe(val => console.log(val));
```

### Пример 4: Использование `resultSelector`
```typescript
// RxJS v6+
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

// helper to create promise
const myPromise = val =>
  new Promise(resolve => resolve(`${val} World From Promise!`));

// emit 'Hello'
const source$ = of('Hello');

source$
  .pipe(
    mergeMap(
      val => myPromise(val),
      /*
      you can also supply a second argument which receives the source value and emitted
      value of inner observable or promise
    */
      (valueFromSource, valueFromPromise) => {
        return `Source: ${valueFromSource}, Promise: ${valueFromPromise}`;
      }
    )
  )
  // output: "Source: Hello, Promise: Hello World From Promise!"
  .subscribe(val => console.log(val));
```

### Пример 5: Использование параметра `concurrent`
```typescript
// RxJS v6+
import { interval } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

// emit value every 1s
const source$ = interval(1000);

source$
  .pipe(
    mergeMap(
      // project
      val => interval(5000).pipe(take(2)),
      // resultSelector
      (oVal, iVal, oIndex, iIndex) => [oIndex, oVal, iIndex, iVal],
      // concurrent
      2
    )
  )
  /*
        Output:
        [0, 0, 0, 0] <--1st inner observable
        [1, 1, 0, 0] <--2nd inner observable
        [0, 0, 1, 1] <--1st inner observable
        [1, 1, 1, 1] <--2nd inner observable
        [2, 2, 0, 0] <--3rd inner observable
        [3, 3, 0, 0] <--4th inner observable
*/
  .subscribe(val => console.log(val));
```

## Полезные ссылки

- 📰 Официальная документация: [mergeMap](https://rxjs.dev/api/operators/mergeMap)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeMap.ts
