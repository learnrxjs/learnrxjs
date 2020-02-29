# Tap

Незаметно производит разного рода сайд-эффекты(side effect), никак не меняя пришедные значения

## Сигнатура

```typescript
tap<T>(
  nextOrObserver?: NextObserver<T> | ErrorObserver<T> | CompletionObserver<T> | ((x: T) => void),
  error?: (e: any) => void,
  complete?: () => void
): MonoTypeOperatorFunction<T>
```

## Параметры

<dl>
  <dt><code>nextOrObserver</code></dt>
  <dd>Функция срабатывающая на <code>next</code> или частичный объект типа Observer</dd>
</dl>

<dl>
  <dt><code>error</code> - <em>optional</em></dt>
  <dd>Функция срабатывающая на <code>error</code> принимает в качестве параметра ошибку</dd>
</dl>

<dl>
  <dt><code>nextOrObserver</code> - <em>optional</em></dt>
  <dd>Функция срабатывающая на <code>complete</code></dd>
</dl>

## Описание

Очень часто этот оператор используют для логирования, так как он никак не влияет на поток

## Примеры

### Пример 1: логирование перед и после оператора `map`

```typescript
// RxJS v6+
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const source = of(1, 2, 3, 4, 5);
// transparently log values from source with 'tap'
const example = source.pipe(
  tap(val => console.log(`BEFORE MAP: ${val}`)),
  map(val => val + 10),
  tap(val => console.log(`AFTER MAP: ${val}`))
);

//'tap' does not transform values
//output: 11...12...13...14...15
const subscribe = example.subscribe(val => console.log(val));
```

### Пример 2: Использование `tap` передавая ему объект

```typescript
// RxJS v6+
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const source = of(1, 2, 3, 4, 5);

// tap also accepts an object map to log next, error, and complete
const example = source
  .pipe(
    map(val => val + 10),
    tap({
      next: val => {
        // on next 11, etc.
        console.log('on next', val);
      },
      error: error => {
        console.log('on error', error.message);
      },
      complete: () => console.log('on complete')
    })
  )
  // output: 11, 12, 13, 14, 15
  .subscribe(val => console.log(val));
```

## Полезные ссылки

- 📰 Официальная документация: [tap](https://rxjs.dev/api/operators/tap)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/tap.ts
