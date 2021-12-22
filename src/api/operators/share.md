---
title: share
---

## Сигнатура

```typescript
share<T>(): MonoTypeOperatorFunction<T>
```

Запускает механизм multicasting-а, является оберткой над оператором `multicast` и `refCount` в качестве subject-а использует обычный `Subject`

## Примеры

```typescript
// RxJS v6+
import { timer } from 'rxjs';
import { tap, mapTo, share } from 'rxjs/operators';

//emit value in 1s
const source = timer(1000);
//log side effect, emit result
const example = source.pipe(
  tap(() => console.log('***SIDE EFFECT***')),
  mapTo('***RESULT***')
);

/*
  ***NOT SHARED, SIDE EFFECT WILL BE EXECUTED TWICE***
  output:
  "***SIDE EFFECT***"
  "***RESULT***"
  "***SIDE EFFECT***"
  "***RESULT***"
*/
const subscribe = example.subscribe(val => console.log(val));
const subscribeTwo = example.subscribe(val => console.log(val));

//share observable among subscribers
const sharedExample = example.pipe(share());
/*
  ***SHARED, SIDE EFFECT EXECUTED ONCE***
  output:
  "***SIDE EFFECT***"
  "***RESULT***"
  "***RESULT***"
*/
const subscribeThree = sharedExample.subscribe(val => console.log(val));
const subscribeFour = sharedExample.subscribe(val => console.log(val));
```

## Полезные ссылки

- 📰 Официальная документация: [share](https://rxjs.dev/api/operators/share)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/share.ts
