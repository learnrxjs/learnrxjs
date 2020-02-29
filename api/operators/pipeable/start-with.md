# StartWith

Начинает поток с переданного значения

## Сигнатура

```typescript
startWith<T, D>(...array: (SchedulerLike | T)[]): OperatorFunction<T, T | D>
```

## Примеры

<dl>
  <dt><code>array</code></dt>
  <dd>spread массив значений</dd>
</dl>

### Пример 1

```typescript
// RxJS v6+
import { startWith } from 'rxjs/operators';
import { of } from 'rxjs';

//emit (1,2,3)
const source = of(1, 2, 3);
//start with 0
const example = source.pipe(startWith(0));
//output: 0,1,2,3
const subscribe = example.subscribe(val => console.log(val));
```

### Пример 2: startWith с несколькими значениями

```typescript
// RxJS v6+
import { startWith } from 'rxjs/operators';
import { interval } from 'rxjs';

//emit values in sequence every 1s
const source = interval(1000);
//start with -3, -2, -1
const example = source.pipe(startWith(-3, -2, -1));
//output: -3, -2, -1, 0, 1, 2....
const subscribe = example.subscribe(val => console.log(val));
```
## Полезные ссылки
- 📰 Официальная документация: [startWith](https://rxjs.dev/api/operators/startWith)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/startWith.ts
