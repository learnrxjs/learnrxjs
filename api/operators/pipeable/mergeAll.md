# mergeAll

## Сигнатура

```typescript
mergeAll<T>(concurrent: number = Number.POSITIVE_INFINITY): OperatorFunction<ObservableInput<T>, T>
```

## Описание

Конвертирует поток высшего порядка в простой поток, отправляя все значения из внутренних потоков во внешний.

## Параметры

| Название | Описание |
|-|-|
| concurrent *Опционален* | По умл.: `Number.POSITIVE_INFINITY`<br> Количество активных подписок в единицу времени |

## Примеры

Создает интервал на каждый клик по документу

```typescript
import { fromEvent, interval } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const higherOrder = clicks.pipe(map((ev) => interval(1000)));
const firstOrder = higherOrder.pipe(mergeAll());
firstOrder.subscribe(x => console.log(x));
```

## Полезные ссылки

- 📰 Официальная документация: [сссс](https://rxjs.dev/api/operators/mergeAll)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeAll.ts

