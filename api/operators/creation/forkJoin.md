# ForkJoin

## Сигнатура

```typescript
forkJoin<A extends ObservableInput<any>[]>(sources: A): Observable<ObservedValuesFromArray<A>[]>
```

### Другие сигнатуры

```typescript
forkJoin<T, K extends keyof T>(sourcesObject: T): Observable<{ [K in keyof T]: ObservedValueOf<T[K]> }>;
```

## Описание

Когда все переданные Observable-ы закроются испустит последнее значение в виде списка или коллекции. В случае если один из Observable-ов завершится, то и `forkJoin` завершится, не отправив ни одного значения, в противоположном случае, если хотя бы один Observable не завершится, то и `forkJoin` тоже не завершится.

## Параметры

- `sources`

  Список или коллеция Observable-ов

## Примеры

### Пример 1: Использование коллекции Observable-ов

```typescript
import { forkJoin, of, timer } from 'rxjs';

const observable = forkJoin({
  foo: of(1, 2, 3, 4),
  bar: Promise.resolve(8),
  baz: timer(4000),
});
observable.subscribe({
 next: value => console.log(value),
 complete: () => console.log('This is how it ends!'),
});

// Logs:
// { foo: 4, bar: 8, baz: 0 } after 4 seconds
// "This is how it ends!" immediately after
```

### Пример 2: Использование списка Observable-ов

```typescript
import { forkJoin, of } from 'rxjs';

const observable = forkJoin([
  of(1, 2, 3, 4),
  Promise.resolve(8),
  timer(4000),
]);
observable.subscribe({
 next: value => console.log(value),
 complete: () => console.log('This is how it ends!'),
});

// Logs:
// [4, 8, 0] after 4 seconds
// "This is how it ends!" immediately after
```

## Полезные ссылки

- 📰 Официальная документация: [forkJoin](https://rxjs.dev/api/index/function/forkJoin)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/6.5.4/src/internal/observable/forkJoin.ts
