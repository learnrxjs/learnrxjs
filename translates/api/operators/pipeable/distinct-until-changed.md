# DistinctUntilChanged

Пропускает значение если оно отличается от прудыдущего

## Сигнатура

```typescript
distinctUntilChanged<T, K>(compare?: (x: K, y: K) => boolean, keySelector?: (x: T) => K): MonoTypeOperatorFunction<T>
```

> 💡 distinctUntilChanged по умолчанию использует оператор `===`, в этом случае ссылки на объекты должны совпадать

## Параметры

- `compare` *опционально*

    Функция сравнения нынешнего и предыдущего значения, по умолчанию `undefined`

- `keySelector` *опционально*

    Функция возвращающая значение `y` на основании `x`. На данный момент **игнорируется**

## Примеры

### Пример 1: с простыми числами

```typescript
// RxJS v6+
import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

// only output distinct values, based on the last emitted value
const source$ = from([1, 1, 2, 2, 3, 3]);

source$
  .pipe(distinctUntilChanged())
  // output: 1,2,3
  .subscribe(console.log);
```

### Пример 2: с объектами

```typescript
// RxJS v6+
import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

const sampleObject = { name: 'Test' };

//Objects must be same reference
const source$ = from([sampleObject, sampleObject, sampleObject]);

// only emit distinct objects, based on last emitted value
source$
  .pipe(distinctUntilChanged())
  // output: {name: 'Test'}
  .subscribe(console.log);
```

### Пример 3: пользовательская функция сравнения

```typescript
// RxJS v6+
import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

// only output distinct values, based on the last emitted value
const source$ = from([
  { name: 'Brian' },
  { name: 'Joe' },
  { name: 'Joe' },
  { name: 'Sue' }
]);

source$
  // custom compare for name
  .pipe(distinctUntilChanged((prev, curr) => prev.name === curr.name))
  // output: { name: 'Brian }, { name: 'Joe' }, { name: 'Sue' }
  .subscribe(console.log);
```

## Полезные ссылки

- 📰 Официальная документация: [distinctUntilChanged](https://rxjs.dev/api/operators/distinctUntilChanged)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinctUntilChanged.ts
