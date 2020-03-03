# Interval

## Сигнатура

```typescript
interval(period: number = 0, scheduler: SchedulerLike = async): Observable<number>
```

## Описание

Создает Observable, который испускает значения в какой-то промежуток времени

## Парметры

- `period`

  Интервал в милисекундах

- `scheduler`

  Тип планировщика

## Примеры

```typescript
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

const numbers = interval(1000);

const takeFourNumbers = numbers.pipe(take(4));

takeFourNumbers.subscribe(x => console.log('Next: ', x));

// Logs:
// Next: 0
// Next: 1
// Next: 2
// Next: 3
```

## Полезные ссылки

- 📰 Официальная документация: [interval](https://rxjs.dev/api/index/function/interval)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/6.5.4/src/internal/observable/interval.ts
