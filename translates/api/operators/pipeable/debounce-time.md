# DebounceTime

Игнорирует все пришедшие значения в промежуток `dueTime`

## Сигнатура

```typescript
debounceTime(dueTime: number, scheduler: Scheduler): Observable
```

## Параметры

- `dueTime`

Количество секунд для "окна"

- `scheduler`

Тип планировщика

```typescript
// RxJS v6+
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

// elem ref
const searchBox = document.getElementById('search');

// streams
const keyup$ = fromEvent(searchBox, 'keyup');

// wait .5s between keyups to emit current value
keyup$
  .pipe(
    map((i: any) => i.currentTarget.value),
    debounceTime(500)
  )
  .subscribe(console.log);
```
