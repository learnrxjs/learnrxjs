# TakeUntil

Отправляет значения пока прокинутый Observable не закрыт

> 💡Если вам нужно указать определенное количество значений используйте [take](take.md)

## Сигнатура

```ts
takeUntil<T>(notifier: Observable<any>): MonoTypeOperatorFunction<T>
```

## Описание

Подписывается на Observable `notifier` и как только `notifier` сообщает о том что он закрыт (то есть вызывает `complete`), `takeUntil` вызывает `complete` у исходного Observable.

## Примеры

```ts
// RxJS v6+
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//emit value every 1s
const source = interval(1000);
//after 5 seconds, emit value
const timer$ = timer(5000);
//when timer emits after 5s, complete source
const example = source.pipe(takeUntil(timer$));
//output: 0,1,2,3
const subscribe = example.subscribe(val => console.log(val));
```
