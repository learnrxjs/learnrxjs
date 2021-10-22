# reduce

## Сигнатура

```typescript
reduce<V, A>(
  accumulator: (acc: V | A, value: V, index: number) => A,
  seed?: any
): OperatorFunction<V, V | A>
```

## Описание

Аккумулирует значения потока и после его завершения отправляет результат дальше по потоку.

## Параметры

| Название | Описание |
|-|-|
| `accumulator` | Функция-колбэк, аккумулирующая значения |
| `seed` | Начальное значение параметра `value` у функции `accumulator` – *необязательное*. По умл.: `undefined` |

Этот оператор похож на метод массива [Array.prototype.reduce()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), `reduce` использует функцию `accumulator` для каждого значения потока, чтобы свести все значения к одному. Нужно отметить, что `reduce` отправляет только одно значение когда поток завершится. Является эквивалентом последовательного использования операторов scan и last.

## Примеры

### Пример 1

Считает количество кликов произошедшие за 5 секунд.

```typescript
import { fromEvent, interval } from 'rxjs';
import { reduce, takeUntil, mapTo } from 'rxjs/operators';

const clicksInFiveSeconds = fromEvent(document, 'click').pipe(
  takeUntil(interval(5000)),
);

const ones = clicksInFiveSeconds.pipe(mapTo(1));
const seed = 0;
const count = ones.pipe(reduce((acc, one) => acc + one, seed));

count.subscribe(x => console.log(x));
```

## Полезные ссылки

- 📰 Официальная документация: [reduce](https://rxjs.dev/api/operators/reduce)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/reduce.ts#L8-L60


