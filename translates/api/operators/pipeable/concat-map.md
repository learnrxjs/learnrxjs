# ConcatMap

Подписывается на Observable, вовзращаемый из функции `project` и отправляет значения из внутреннего Observable во внешний, в порядке очереди

## Сигнатура

```
concatMap<T, R, O extends ObservableInput<any>>(
    project: (value: T, index: number) => O,
    resultSelector?: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R
): OperatorFunction<T, ObservedValueOf<O> | R>
```

## Описание

На каждое пришедшее значение, функция `project` возвращает Observable и `concatMap` в порядке очереди (подписывается на следующий Observable только после закрытия предыдущего) подписывается на каждый из Observable-ов.

## Примеры

## Привет 1: Разница между `concatMap` и `mergeMap`

> 💡 Разница между `concatMap` и [`mergeMap`](merge-map.md). Потому что `concatmMap` не подписывается на следующий Observable пока предыдущий не закрылся, в отличии от `mergeMap`, который подписывается на внутренние Observable-ы немедленно. Ниже сообщения из `concatMap` придут в том порядке в котором он их получил из оператора `of`. То есть сообщение отложенное на 2000 мс. придет первым. В то время как с ипользованием `mergeMap` сообщение отложенное на 1000 мс. придет первее.

```typescript
// RxJS v6+
import { of } from 'rxjs';
import { concatMap, delay, mergeMap } from 'rxjs/operators';

//emit delay value
const source = of(2000, 1000);
// map value from source into inner observable, when complete emit result and move to next
const example = source.pipe(
  concatMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
);
//output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
const subscribe = example.subscribe(val =>
  console.log(`With concatMap: ${val}`)
);

// showing the difference between concatMap and mergeMap
const mergeMapExample = source
  .pipe(
    // just so we can log this after the first example has run
    delay(5000),
    mergeMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  )
  .subscribe(val => console.log(`With mergeMap: ${val}`));
```

## Пример 2: работа с Promise

```typescript
// RxJS v6+
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

//emit 'Hello' and 'Goodbye'
const source = of('Hello', 'Goodbye');
//example with promise
const examplePromise = val => new Promise(resolve => resolve(`${val} World!`));
// map value from source into inner observable, when complete emit result and move to next
const example = source.pipe(concatMap(val => examplePromise(val)));
//output: 'Example w/ Promise: 'Hello World', Example w/ Promise: 'Goodbye World'
const subscribe = example.subscribe(val =>
  console.log('Example w/ Promise:', val)
);
```

## Полезные ссылки

- 📰 Официальная документация: [concatMap](https://rxjs.dev/api/operators/concatMap)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concatMap.ts
