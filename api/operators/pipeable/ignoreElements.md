# ignoreElements

Игнорирует все элементы, излучаемые источником Observable и передает только сигналы о завершении или об ошибке.

## Сигнатура

```typescript
ignoreElements(): OperatorFunction<any, never>
```

## Параметры

Параметры отсутствуют

## Примеры

Игнорирует выделяемые значения, реагирует на завершение наблюдаемого. 

```typescript
import { of } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';
 
of('you', 'talking', 'to', 'me').pipe(
  ignoreElements(),
)
.subscribe(
  word => console.log(word),
  err => console.log('error:', err),
  () => console.log('the end'),
);
// result:
// 'the end'
```

## Полезные ссылки

- 📰 Официальная документация: [ignoreElements](https://rxjs.dev/api/operators/ignoreElements)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pipeable/ignoreElements.ts
