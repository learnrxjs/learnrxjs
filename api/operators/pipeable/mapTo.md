# Название оператора

## Сигнатура

```typescript
mapTo<T, R>(value: R): OperatorFunction<T, R>
```

## Описание

Оператор похож на map, но в отличии от него принимает единичное значение, которым нужно будет просто заменять все значения, которые придут в исходный поток.

## Параметры

| Название | Описание |
|-|-|
| `value` | Новое значение |

## Пример

```typescript
import { fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const greetings = clicks.pipe(mapTo('Hi'));
greetings.subscribe(x => console.log(x));
```

## Полезные ссылки

- 📰 Официальная документация: [mapTo](https://rxjs.dev/api/operators/mapTo)
- 📁 Исходный код: https://github.com/reactivex/rxjs/tree/6.5.5/src/internal/operators/mapTo.ts#L5-L40
