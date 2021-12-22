---
title: delay
---

## Сигнатура

```typescript
delay<T>(delay: number | Date, scheduler: SchedulerLike = async): MonoTypeOperatorFunction<T>
```

## Описание

Создает задержку получения данных на переданное время

## Параметры

- `delay`
  
  Время задержки (в милисекундах) или [дата](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) после истечения которой будут отправляться значения

- `scheduler`
  
  Планировщик

## Примеры

### Пример 1: Использование миллисекунд

```typescript
import { fromEvent } from 'rxjs';
import { delay } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const delayedClicks = clicks.pipe(delay(1000)); // each click emitted after 1 second
delayedClicks.subscribe(x => console.log(x));
```

### Пример 2: Использование даты

```typescript
import { fromEvent } from 'rxjs';
import { delay } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const date = new Date('March 15, 2050 12:00:00'); // in the future
const delayedClicks = clicks.pipe(delay(date)); // click emitted only after that date
delayedClicks.subscribe(x => console.log(x));
```

## Полезные ссылки

- 📰 Официальная документация: [delay](https://rxjs.dev/api/operators/delay)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/delay.ts

