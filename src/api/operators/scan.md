---
title: scan
---

## Сигнатура

```typescript
scan<T, R>(accumulator: (acc: R, value: T, index: number) => R, seed?: T | R): OperatorFunction<T, R>
```

Выполняет функцию `accumulator` для каждого значения Observable, возвращаемое значение которой, сохраняет в переменную `acc`


## Параметры

- `accumulator`
    
    Функция вызывающаяся при новом значении Observable
    
- `seed` - *опционально*

    Исходное значение аргумента `value`

## Примеры

### Пример 1: Сложение чисел

```typescript
// RxJS v6+
import { of } from 'rxjs';
import { scan } from 'rxjs/operators';

const source = of(1, 2, 3);
// basic scan example, sum over time starting with zero
const example = source.pipe(scan((acc, curr) => acc + curr, 0));
// log accumulated values
// output: 1,3,6
const subscribe = example.subscribe(val => console.log(val));
```

### Пример 2: Объединение объекта

```typescript
// RxJS v6+
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

const subject = new Subject();
//scan example building an object over time
const example = subject.pipe(
  scan((acc, curr) => Object.assign({}, acc, curr), {})
);
//log accumulated values
const subscribe = example.subscribe(val =>
  console.log('Accumulated object:', val)
);
//next values into subject, adding properties to object
// {name: 'Joe'}
subject.next({ name: 'Joe' });
// {name: 'Joe', age: 30}
subject.next({ age: 30 });
// {name: 'Joe', age: 30, favoriteLanguage: 'JavaScript'}
subject.next({ favoriteLanguage: 'JavaScript' });
```
## Полезные ссылки

- 📰 Официальная документация: [scan](https://rxjs.dev/api/operators/scan)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/scan.ts
