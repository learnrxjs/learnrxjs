# skip

## Сигнатура

```typescript
skip<T>(count: number): MonoTypeOperatorFunction<T>
```

## Описание

Пропускает определенное количество значений

## Параметры

- `count`
  
  Число элементов, которые нужно пропустить

## Примеры

```typescript
// RxJS v6+
import { interval } from 'rxjs';
import { skip } from 'rxjs/operators';

//emit every 1s
const source = interval(1000);
//skip the first 5 emitted values
const example = source.pipe(skip(5));
//output: 5...6...7...8........
const subscribe = example.subscribe(val => console.log(val));
```

## Полезные ссылки

- 📰 Официальная документация: [skip](https://rxjs.dev/api/operators/skip)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skip.ts

