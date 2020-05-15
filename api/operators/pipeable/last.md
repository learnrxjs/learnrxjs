# last

## Сигнатура

```typescript
last<T, D>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: D): OperatorFunction<T, T | D>
```

## Описание

Игнорирует все значения кроме последнего, пропуская только его, затем завершается.

!> Является аналогом выражения `takeLast(1)` за исключением того, что `last` выкидывает ошибку [`EmptyError`](https://github.com/ReactiveX/rxjs/blob/3020549054e4df240e51456de34252531c3ee512/src/internal/util/EmptyError.ts#L31) в случае если поток оказался пустым.

## Параметры

- `predicate` *Опционально*
  
  Функция вызываемая каждый раз при новом значении для проверки условия.

- `defaultValue` *Опционально*

  Если указано значение по умолчанию, в случае если поток пустой, будет использоваться оно, если же не указано выкинет ошибку.

## Примеры

### Пример 1: Простейшее использование

```typescript
// RxJS v6+
import { from } from 'rxjs';
import { last } from 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
//no arguments, emit last value
const example = source.pipe(
  last()
);

//output: "Last value: 5"
const subscribe = example.subscribe(val => console.log(`Last value: ${val}`));
```

### Пример 2: Использование функции `predicate`

```typescript
// RxJS v6+
import { from } from 'rxjs';
import { last } from 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
//emit last even number
const exampleTwo = source.pipe(
  last(num => num % 2 === 0)
);

//output: "Last to pass test: 4"
const subscribeTwo = exampleTwo.subscribe(val =>
  console.log(`Last to pass test: ${val}`)
);
```

### Пример 3: Использование функции `predicate` и значение по умолчанию

```typescript
// RxJS v6+
import { from } from 'rxjs';
import { last } from 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
//no values will pass given predicate, emit default
const exampleTwo = source.pipe(
  last(v => v > 5, 'Nothing!')
);

//output: 'Nothing!'
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```

## Полезные ссылки

- 📰 Официальная документация: [last](https://rxjs.dev/api/operators/last)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/last.ts

