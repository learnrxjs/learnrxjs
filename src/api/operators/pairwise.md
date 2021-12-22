---
title: pairwise
---

## Сигнатура

```typescript
pairwise<T>(): OperatorFunction<T, [T, T]>
```

## Описание

Собирает новое и предыдущее значения в [кортеж](https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D1%80%D1%82%D0%B5%D0%B6_(%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0)) и отправляет дальше

## Параметры

Параметров нет

## Примеры

```typescript
// RxJS v6+
import { pairwise, take } from 'rxjs/operators';
import { interval } from 'rxjs';

//Returns: [0,1], [1,2], [2,3], [3,4], [4,5]
interval(1000)
  .pipe(pairwise(), take(5))
  .subscribe(console.log);
```

## Полезные ссылки

- 📰 Официальная документация: [pairwise](https://rxjs.dev/api/operators/pairwise)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pairwise.ts

