# groupBy

## Сигнатура

```ts
groupBy<T, K, R>(
  keySelector: (value: T) => K,
  elementOrOptions?: void | ((value: any) => any) | BasicGroupByOptions<K, T> | GroupByOptionsWithElement<K, R, T>,
  duration?: (grouped: GroupedObservable<any, any>) => ObservableInput<any>,
  connector?: () => SubjectLike<any>
): OperatorFunction<T, GroupedObservable<K, R>>
```

## Параметры

| keySelector | `(value: T) => K` | Функция, которая возвращает признак, по которому будет разделен поток на подпотоки |
|---|---|--|
| elementOrOptions | `void \| ((value: any) => any) \| BasicGroupByOptions<K, T> \| GroupByOptionsWithElement<K, R, T>` | Функция, которая может изменить значение которое будет отправлено в подпоток. Либо это объект с настройками. |
| duration | `(grouped: GroupedObservable<any, any>) => ObservableInput<any>` | _Опцианален_.<br />Функция, которая принимает на вход созданный подпоток и может как-то с ним взаимодействовать. Функция должна вернуть поток. |
| connector | `() => SubjectLike<any>` | Функция-фабрика, для создания нового подпотока. Если не указано, используется обычный Subject |

## Описание

Разбивает поток на подпотоки по опредленному ключу.

![](https://rxjs.dev/assets/images/marble-diagrams/groupBy.png)

## Примеры

### Пример 1

```ts
import { of, groupBy, mergeMap, reduce } from 'rxjs';

of(
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'Parcel' },
  { id: 2, name: 'webpack' },
  { id: 1, name: 'TypeScript' },
  { id: 3, name: 'TSLint' }
).pipe(
  groupBy(p => p.id),
  mergeMap(group$ => group$.pipe(reduce((acc, cur) => [...acc, cur], [])))
)
.subscribe(p => console.log(p));

// displays:
// [{ id: 1, name: 'JavaScript' }, { id: 1, name: 'TypeScript'}]
// [{ id: 2, name: 'Parcel' }, { id: 2, name: 'webpack'}]
// [{ id: 3, name: 'TSLint' }]
```

### Пример 2

```ts
import { of, groupBy, mergeMap, reduce, map } from 'rxjs';

of(
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'Parcel' },
  { id: 2, name: 'webpack' },
  { id: 1, name: 'TypeScript' },
  { id: 3, name: 'TSLint' }
).pipe(
  groupBy(p => p.id, { element: p => p.name }),
  mergeMap(group$ => group$.pipe(reduce((acc, cur) => [...acc, cur], [`${ group$.key }`]))),
  map(arr => ({ id: parseInt(arr[0], 10), values: arr.slice(1) }))
)
.subscribe(p => console.log(p));

// displays:
// { id: 1, values: [ 'JavaScript', 'TypeScript' ] }
// { id: 2, values: [ 'Parcel', 'webpack' ] }
// { id: 3, values: [ 'TSLint' ] }
```

## Полезные ссылки

- 📰 Официальная документация: [groupBy](https://rxjs.dev/api/operators/groupBy)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/groupBy.ts