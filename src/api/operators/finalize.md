# Finalize

## Сигнатура

```typescript
finalize<T>(callback: () => void): MonoTypeOperatorFunction<T>
```

## Параметры

| Название | Описание |
|-|-|
| callback | Функция, которая вызовется при завершении потока |

## Описание

Вызывает функцию `callback` при завершении потока

## Примеры

```ts
import { interval, timer, noop } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

const source = interval(100).pipe(
 finalize(() => console.log('[finalize] Called')),
 tap(
    () => console.log('[next] Called'),
    () => console.log('[error] Not called'),
    () => console.log('[tap] Not called')
  ),
);

const sub = source.subscribe(x => console.log(x), noop, () => console.log('[complete] Not called'));

timer(150).subscribe(() => sub.unsubscribe());

// results:
//   0
//   '[finalize] Called'
```

## Полезные ссылки

- 📰 Официальная документация: [finalize](https://rxjs.dev/api/operators/finalize)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/finalize.ts


