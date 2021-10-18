# defaultIfEmpty

## Сигнатура

```typescript
defaultIfEmpty<T, R>(defaultValue: R = null): OperatorFunction<T, T | R>
```

## Описание

Выдает заданное значение, если исходный поток завершает работу без выдачи какого-либо следующего значения, 
в противном случае - зеркально отражает исходный поток.

## Параметры

| Название | Описание |
|-|-|
| `defaultValue` | Необязательный. По умолчанию - null. Значение по умолчанию, используемое, если исходный поток пуст. |

## Пример

Если в течение 5 секунд не было ни одного клика, выдается сообщение "no clicks".

```typescript
// RxJS v6+
import { fromEvent } from 'rxjs';
import { defaultIfEmpty, takeUntil } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const clicksBeforeFive = clicks.pipe(takeUntil(interval(5000)));
const result = clicksBeforeFive.pipe(defaultIfEmpty('no clicks'));
result.subscribe(x => console.log(x));
```

## Полезные ссылки

- 📰 Официальная документация: [defaultIfEmpty](https://rxjs.dev/api/operators/defaultIfEmpty)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/operators/defaultIfEmpty.ts
