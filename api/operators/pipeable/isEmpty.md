# isEmpty

## Сигнатура

```typescript
isEmpty<T>(): OperatorFunction<T, boolean>
```

## Описание

Отправит в поток `true` если он пустой или `false` если там есть значения и закроется.

## Параметры

Параметров нет.

## Примеры

### Пример 1

Отправит `false`, так как поток не пустой.

```typescript
import { Subject } from 'rxjs';
import { isEmpty } from 'rxjs/operators';

const source = new Subject<string>();
const result = source.pipe(isEmpty());

source.subscribe(x => console.log(x));
result.subscribe(x => console.log(x));

source.next('a');
source.next('b');
source.next('c');
source.complete();

// Outputs
// a
// false
// b
// c
```

### Пример 2

Отправит `true`, так как поток завершается не отправив ни одного значения.

```typescript
import { EMPTY } from 'rxjs';
import { isEmpty } from 'rxjs/operators';

const result = EMPTY.pipe(isEmpty());
result.subscribe(x => console.log(x));

// Outputs
// true
```

## Полезные ссылки

- 📰 Официальная документация: [isEmpty](https://rxjs.dev/api/operators/isEmpty)
- 📁 Исходный код: https://github.com/reactivex/rxjs/tree/master/src/internal/operators/isEmpty.ts#L4-L84
