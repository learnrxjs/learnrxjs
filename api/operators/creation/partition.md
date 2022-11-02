# partition

## Сигнатура

```ts
partition<T>(
  source: ObservableInput<T>,
  predicate: (this: any, value: T, index: number) => boolean,
  thisArg?: any
): [Observable<T>, Observable<T>]
```

## Параметры

| source | `ObservableInput<T>` | Поток |
|---|---|--|
| predicate | `(this: any, value: T, index: number) => boolean` | Функция-предикат |
| thisArg | `any` | Значение `this` для функции-предиката |

## Описание

Разделяет исходных поток данных на два, один удовлетворяет условию в функции-предикату, другой нет.

![](https://rxjs.dev/assets/images/marble-diagrams/partition.png)

## Примеры

```ts
import { of, partition } from 'rxjs';

const observableValues = of(1, 2, 3, 4, 5, 6);
const [evens$, odds$] = partition(observableValues, value => value % 2 === 0);

odds$.subscribe(x => console.log('odds', x));
evens$.subscribe(x => console.log('evens', x));

// Logs:
// odds 1
// odds 3
// odds 5
// evens 2
// evens 4
// evens 6
```

## Полезные ссылки

- 📰 Официальная документация: [partition](https://rxjs.dev/api/index/function/partition)
- 📁 Исходный код: https://github.com/reactivex/rxjs/tree/master/src/internal/observable/partition.ts