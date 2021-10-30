# skipUntil

## Сигнатура

```typescript
skipUntil<T>(notifier: Observable<any>): MonoTypeOperatorFunction<T>
```

## Описание

Пропускает значения потока, пока `notifier` не сделает `next`.

## Параметры

| Название | Описание |
|-|-|
| `notifier` | Поток уведомитель |

Оператор `timestamp` генерирует объект вида `{ value: T, timestamp: R }` — где `value` это значение потока, а `timestamp` время в милисекундах.

## Примеры

```typescript
import { interval, fromEvent } from 'rxjs';
import { skipUntil } from 'rxjs/operators';

const intervalObservable = interval(1000);
const click = fromEvent(document, 'click');

const emitAfterClick = intervalObservable.pipe(
  skipUntil(click)
);
// клик в 4.6s. output: 5...6...7...8........ или
// клик в 7.3s. output: 8...9...10..11.......
const subscribe = emitAfterClick.subscribe(value => console.log(value));
```

## Полезные ссылки

- 📰 Официальная документация: [skipUntil](https://rxjs.dev/api/operators/skipUntil)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skipUntil.ts
