# iif

## Сигнатура

```typescript
iif<T = never, F = never>(
  condition: () => boolean,
  trueResult: SubscribableOrPromise<T> = EMPTY,
  falseResult: SubscribableOrPromise<F> = EMPTY
): Observable<T | F>
```

## Описание

Подписывается на один из переданных потоков взависимости от условия

## Параметры

- `condition`
  
  Функция условие

- `trueResult`

  Observable на случай если `condition` вернет `true`

- `falseResult`

  Observable на случай если `condition` вернет `false`

## Примеры

```typescript
import { iif, of } from 'rxjs';

let subscribeToFirst;
const firstOrSecond = iif(
  () => subscribeToFirst,
  of('first'),
  of('second'),
);

subscribeToFirst = true;
firstOrSecond.subscribe(value => console.log(value));

// Logs:
// "first"

subscribeToFirst = false;
firstOrSecond.subscribe(value => console.log(value));

// Logs:
// "second"
```

## Полезные ссылки

- 📰 Официальная документация: [iif]([OPERATOR_URL](https://rxjs.dev/api/index/function/iif))
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/iif.ts

