# ToArray

## Сигнатура

```typescript
toArray<T>(): OperatorFunction<T, T[]>
```

## Описание

Собирает все пришедшие значения в массив, после завершения потока, отправляет массив

## Параметры

Параметров нет

## Примеры

### Пример 1

```typescript
import { interval } from 'rxjs';
import { toArray, take } from 'rxjs/operators';

const source = interval(1000);
const example = source.pipe(
  take(10),
  toArray()
);

const subscribe = example.subscribe(val => console.log(val));

// output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Полезные ссылки

- 📰 Официальная документация: [toArray](https://rxjs.dev/api/operators/toArray)
- 📁 Исходный код: https://github.com/reactivex/rxjs/tree/6.5.5/src/internal/operators/toArray.ts#L11-L45
