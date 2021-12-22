---
title: withLatestFrom
---

## Сигнатура

```typescript
withLatestFrom<T, R>(source: Observable, project: (...args) => R): OperatorFunction<T, R>
```

Другие сигнатуры https://rxjs.dev/api/operators/withLatestFrom#overloads

## Описание

Получает последнее значение из переданного Observable и отправляет его во внешний Observable

## Параметры

- `source`

    Один или несколько Observable-ов последние значения которых нужно получить
    
- `project`

    Функция преобразующая данные перед их отправкой во внешний Observable
    
## Примеры

### Пример 1: Получение значения из интервала с меньшим промежутком

```typescript
// RxJS v6+
import { withLatestFrom, map } from 'rxjs/operators';
import { interval } from 'rxjs';

//emit every 5s
const source = interval(5000);
//emit every 1s
const secondSource = interval(1000);
const example = source.pipe(
  withLatestFrom(secondSource),
  map(([first, second]) => {
    return `First Source (5s): ${first} Second Source (1s): ${second}`;
  })
);
/*
  "First Source (5s): 0 Second Source (1s): 4"
  "First Source (5s): 1 Second Source (1s): 9"
  "First Source (5s): 2 Second Source (1s): 14"
  ...
*/
const subscribe = example.subscribe(val => console.log(val));
```

## Полезные ссылки

- 📰 Официальная документация: [withLatestFrom](https://rxjs.dev/api/operators/withLatestFrom)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/withLatestFrom.ts
