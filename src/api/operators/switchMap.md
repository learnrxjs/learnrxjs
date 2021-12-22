---
title: switchMap
---

## Сигнатура

```typescript
switchMap<T, R, O extends ObservableInput<any>>(
  project: (value: T, index: number) => O,
  resultSelector?: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R
): OperatorFunction<T, ObservedValueOf<O> | R>
```

## Описание

Подписывается на Observale-ы возвращаемые функцией `project` и отправляет их значения во внешний Observable. Важная особенность `switchMap` в одной подписке в единицу времени. При поступлении нового значения отписывается от предыдущего внутреннего Observable и подписывается на новый.

> 💡 Если вам нужно больше чем 1 подписка, то лучше использовать [`mergeMap`](mergeMap.md)

> 💡 Осторожно! Этот оператор умеет отменять сетевые запросы

## Параметры

- `project`

  Функция возвращающая Observable, когда приходит новое значение

- `resultSelector`

  Преобразует значение полученное из внутреннего Observable перед тем как отправить его во внешний

## Примеры

### Пример 1: Перезапуск интервала

```typescript
// RxJS v6+
import { interval, fromEvent } from 'rxjs';
import { switchMap } from 'rxjs/operators';

fromEvent(document, 'click')
  .pipe(
    // restart counter on every click
    switchMap(() => interval(1000))
  )
  .subscribe(console.log);
```

### Пример 2: Таймер с паузой и стартом

```typescript
// RxJS v6+
import { interval, fromEvent, merge, empty } from 'rxjs';
import { switchMap, scan, takeWhile, startWith, mapTo } from 'rxjs/operators';

const COUNTDOWN_SECONDS = 10;

// elem refs
const remainingLabel = document.getElementById('remaining');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');

// streams
const interval$ = interval(1000).pipe(mapTo(-1));
const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));
const resume$ = fromEvent(resumeButton, 'click').pipe(mapTo(true));

const timer$ = merge(pause$, resume$)
  .pipe(
    startWith(true),
    switchMap(val => (val ? interval$ : empty())),
    scan((acc, curr) => (curr ? curr + acc : acc), COUNTDOWN_SECONDS),
    takeWhile(v => v >= 0)
  )
  .subscribe((val: any) => (remainingLabel.innerHTML = val));
```

## Полезные ссылки

- 📰 Официальная документация: [switchMap](https://rxjs.dev/api/operators/switchMap)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/switchMap.ts
