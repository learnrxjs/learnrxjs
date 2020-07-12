# Every

## Сигнатура

```typescript
every<T>(
  predicate: (value: T, index: number, source: Observable<T>) => boolean,
  thisArg?: any
): OperatorFunction<T, boolean>
```

## Параметры

| Название | Описание |
|-|-|
| predicate | Функция возвращающая, `true` или `false` взависимости от условия |
| thisArg | Конекст выполнения функции `predicate`  |

## Описание

Вызывает функцию `predicate`, для каждого значения в потоке. И как только `predicate` вернет `false`, поток испускает то что вернул `predicate` и завершается.

## Примеры

```typescript
import { of } from 'rxjs';
import { every } from 'rxjs/operators';

of(1, 2, 3, 4, 5, 6).pipe(
  every(x => x < 5),
)
.subscribe(x => console.log(x)); // -> false
```

## Полезные ссылки

- 📰 Официальная документация: [every](https://rxjs.dev/api/operators/every)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/every.ts

