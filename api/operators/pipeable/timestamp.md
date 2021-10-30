# timestamp

## Сигнатура

```typescript
timestamp<T>(timestampProvider: TimestampProvider = dateTimestampProvider): OperatorFunction<T, Timestamp<T>>
```

## Описание

Добавляет каждому значению метку времени, чтобы можно было узнать когда оно было отправлено.

## Параметры

| Название | Описание |
|-|-|
| `timestampProvider` | Интерфейс с методом `now()` для получения текущего времени |

Оператор `timestamp` генерирует объект вида `{ value: T, timestamp: R }` — где `value` это значение потока, а `timestamp` время в милисекундах.

## Примеры

```typescript
import { fromEvent } from 'rxjs';
import { timestamp } from 'rxjs/operators';

const clickWithTimestamp = fromEvent(document, 'click').pipe(
  timestamp()
);

// Отправляет данные вида {value: MouseEvent, timestamp: number}
clickWithTimestamp.subscribe(data => {
  console.log(data);
});
```

## Полезные ссылки

- 📰 Официальная документация: [timestamp](https://rxjs.dev/api/operators/timestamp)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/timestamp.ts
