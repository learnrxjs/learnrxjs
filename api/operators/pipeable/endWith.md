# endWith

## Сигнатура

```typescript
endWith<T>(...array: (SchedulerLike | T)[]): MonoTypeOperatorFunction<T>
```

## Описание

Отправляет полученные значения после того как основной поток завершится.

## Примеры

```typescript
// RxJS v6+
import { endWith } from 'rxjs/operators';
import { of } from 'rxjs';

const source$ = of('Hello', 'Friend');

source$
  // emit on completion
  .pipe(endWith('Goodbye', 'Friend'))
  // 'Hello', 'Friend', 'Goodbye', 'Friend'
  .subscribe(console.log(val));
```

## Полезные ссылки

- 📰 Официальная документация: [filter](https://rxjs.dev/api/operators/endWith)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/endWith.ts

