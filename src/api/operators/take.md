---
title: take
---

Берет только определенное количество значений, после чего завершается

> 💡 `take` является противоположным оператором оператора `skip`, если `take` берет *n* значений и закрывается, то `skip` пропускает эти значения

## Сигнатура

```typescript
take<T>(count: number): MonoTypeOperatorFunction<T>
```

## Параметры

<dl>
  <dt><code>count</code></dt>
  <dd>Количество значений которые нужно взять</dd>
</dl>

## Примеры

```typescript
// RxJS v6+
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

//emit 1,2,3,4,5
const source = of(1, 2, 3, 4, 5);
//take the first emitted value then complete
const example = source.pipe(take(1));
//output: 1
const subscribe = example.subscribe(val => console.log(val));
```

## Полезные ссылки

- 📰 Официальная документация: [take](https://rxjs.dev/api/operators/take)
- 📁 Исходный код: [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/take.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/take.ts)
