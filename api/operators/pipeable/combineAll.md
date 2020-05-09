# CombineAll

## Сигнатура

```typescript
combineAll<T, R>(project?: (...values: any[]) => R): OperatorFunction<T, R>
```

### Описание

Когда основной Observable завершится, использует [combineLatest](creation/combine-latest.md), а в качестве параметров, полученные Observable-ы.

## Параметры

- `project`

  Функция, принимающая в себя, значения пришедшие с Observable-ов, обрабатываемые `combineAll`, возвращенное значение, которое будет использоваться дальше. В документации к оператору `combineLatest` функция `project` помечена как *Depricated, вместо нее лучше использовать оператор `map`.

## Примеры

```typescript
import { take, map, combineAll } from 'rxjs/operators';
import { interval } from 'rxjs';

// emit every 1s, take 2
const source$ = interval(1000).pipe(take(2));
// map each emitted value from source to interval observable that takes 5 values
const example$ = source$.pipe(
  map(val =>
    interval(1000).pipe(
      map(i => `Result (${val}): ${i}`),
      take(5)
    )
  )
);
/*
  2 values from source will map to 2 (inner) interval observables that emit every 1s.
  combineAll uses combineLatest strategy, emitting the last value from each
  whenever either observable emits a value
*/
example$
  .pipe(combineAll())
  /*
  output:
  ["Result (0): 0", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 4"]
*/
  .subscribe(console.log);
```

## Полезные ссылки

- 📰 Официальная документация: [CombineAll](https://rxjs.dev/api/operators/combineAll)
- 📁 Исходный код: https://github.com/reactivex/rxjs/tree/6.5.4/src/internal/operators/combineAll.ts
