# Retry

## Сигнатура

```typescript
retry<T>(count: number = -1): MonoTypeOperatorFunction<T>
```

## Описание

В случае ошибки оператор retry будет переподписывать на поток `count` раз и только после того как количество попыток истечет, прокинет ошибку

## Параметры

| Название | Описание |
|-|-|
| `count` | Кол-во попыток |

## Примеры

```typescript
import { interval, of, throwError } from 'rxjs';
import { mergeMap, retry } from 'rxjs/operators';

const source = interval(1000);
const example = source.pipe(
  mergeMap(val => {
    if(val > 5){
      return throwError('Error!');
    }
    return of(val);
  }),
  //retry 2 times on error
  retry(2)
);

const subscribe = example.subscribe({
  next: val => console.log(val),
  error: val => console.log(`${val}: Retried 2 times then quit!`)
});

// Output:
// 0..1..2..3..4..5..
// 0..1..2..3..4..5..
// 0..1..2..3..4..5..
// "Error!: Retried 2 times then quit!"
```

## Полезные ссылки

- 📰 Официальная документация: [retry](https://rxjs.dev/api/operators/retry)
- 📁 Исходный код: https://github.com/reactivex/rxjs/tree/master/src/internal/operators/retry.ts#L6-L55
