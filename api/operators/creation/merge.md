# Merge

## Сигнатура

```typescript
merge<T, R>(...observables: Array<ObservableInput<any> | SchedulerLike | number>): Observable<R>
```

## Описание

Объединяет список Observable-ов в один

## Параметры

- `observables`
  
  Список Observable-ов которые нужно объединить

- ~~`scheduler`~~ *Depricated*
  
  Тип планировщика. Вместо этого параметра стоит использовать `scheduled` в паре с `mergeAll`
  
  ```typescript
  scheduled([ob1, ob2, ob3], scheduled).pipe(mergeAll())
  ```

- `concurrent`
  
  Количество активных подписок

## Примеры

### Пример 1: Объединение Observable-ов `interval` и `fromEvent`

```typescript
import { merge, fromEvent, interval } from 'rxjs';

const clicks = fromEvent(document, 'click');
const timer = interval(1000);
const clicksOrTimer = merge(clicks, timer);
clicksOrTimer.subscribe(x => console.log(x));

// Results in the following:
// timer will emit ascending values, one every second(1000ms) to console
// clicks logs MouseEvents to console everytime the "document" is clicked
// Since the two streams are merged you see these happening
// as they occur.
```

### Пример 2: Использование параметра `concurrentrly`

```typescript
import { merge, interval } from 'rxjs';
import { take } from 'rxjs/operators';

const timer1 = interval(1000).pipe(take(10));
const timer2 = interval(2000).pipe(take(6));
const timer3 = interval(500).pipe(take(10));
const concurrent = 2; // the argument
const merged = merge(timer1, timer2, timer3, concurrent);
merged.subscribe(x => console.log(x));

// Results in the following:
// - First timer1 and timer2 will run concurrently
// - timer1 will emit a value every 1000ms for 10 iterations
// - timer2 will emit a value every 2000ms for 6 iterations
// - after timer1 hits it's max iteration, timer2 will
//   continue, and timer3 will start to run concurrently with timer2
// - when timer2 hits it's max iteration it terminates, and
//   timer3 will continue to emit a value every 500ms until it is complete
```

## Полезные ссылки

- 📰 Официальная документация: [merge](https://rxjs.dev/api/index/function/merge)
- 📁 Исходный код: [https://github.com/ReactiveX/rxjs/blob/6.5.4/src/internal/observable/merge.ts](https://github.com/ReactiveX/rxjs/blob/6.5.4/src/internal/observable/merge.ts)
