# ThrowError

## Сигнатура

```typescript
throwError(error: any, scheduler?: SchedulerLike): Observable<never>
```

## Описание

Создает поток, который сразу пробрасывает ошибку `error`

## Параметры

| Название | Описание |
|-|-|
| `error` | Объект ошибки |

## Примеры

```typescript
import { throwError, concat, of } from 'rxjs';

const result = concat(of(7), throwError(new Error('oops!')));
result.subscribe(x => console.log(x), e => console.error(e));

// Logs:
// 7
// Error: oops!
```

## Полезные ссылки

- 📰 Официальная документация: [throwError](https://rxjs.dev/api/index/function/throwError)
- 📁 Исходный код: https://github.com/reactivex/rxjs/tree/master/src/internal/observable/throwError.ts#L4-L75
