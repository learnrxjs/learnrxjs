# exhaustMap

## Сигнатура

```typescript
exhaustMap<T, R, O extends ObservableInput<any>>(
  project: (value: T, index: number) => O,
  resultSelector?: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R
): OperatorFunction<T, ObservedValueOf<O> | R>
```

## Описание

На каждое пришедшее значение, подписывается на ObservableInput возвращаемый функцией `project` и все полученные значения из внутреннего Observable отправляет во внешний. Пока внутренний Observable не закроется, exhaustMap удет игнорировать все приходящие значения. То есть в единицу времени имеется только одна подписка.

## Параметры

- `project`
  
  Функция возвращающая [ObservableInput](https://github.com/ReactiveX/rxjs/blob/master/src/internal/types.ts#L76), на который подпишется `exhaustMap` 

- ~~`resultSelector`~~ *Depricated*

  Функция аналог оператора `map`. Желательно `map` и использовать.

## Примеры

```typescript
// RxJS v6+
import { fromEvent, interval } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
  exhaustMap(ev => interval(1000).pipe(take(5)))
);
result.subscribe(x => console.log(x));
```

## Полезные ссылки

- 📰 Официальная документация: [exhaustMap](https://rxjs.dev/api/operators/exhaustMap)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/exhaustMap.ts

