---
title: takeUntil
---

Отправляет значения пока Observable `notifier` не закрыт

> 💡Если вам нужно указать определенное количество значений используйте [take](take.md)

## Сигнатура

```typescript
takeUntil<T>(notifier: Observable<any>): MonoTypeOperatorFunction<T>
```

## Описание

Подписывается на Observable `notifier` и как только `notifier` сообщает о том что он закрыт (то есть вызывает `complete`), `takeUntil` вызывает `complete` у исходного Observable.

## Примеры

```typescript
// RxJS v6+
import { interval } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

const source = interval(1000);

const subject = new Subject();
const emitComplete = subject.pipe(delay(3000));

const example = source.pipe(takeUntil(emitComplete));
// output: 0, 1, 2
const subscribe = example.subscribe(v => console.log(v));

subject.next();
sybject.complete();
```

## Полезные ссылки

- 📰 Официальная документация: [takeUntil](https://rxjs.dev/api/operators/takeUntil)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeUntil.ts


