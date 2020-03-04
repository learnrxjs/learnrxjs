# Of

## Сигнатура

```typescript
of<T>(...args: (SchedulerLike | T)[]): Observable<T>
```

## Описание

Создает из аргументов Observable

### Параметры

- `args`
  
  Список аргументов

- `scheduler`
  
  Тип планировщика. Передается последним параметром

## Примеры

### Пример 1:  Список чисел

```typescript
import { of } from 'rxjs';

of(10, 20, 30)
.subscribe(
  next => console.log('next:', next),
  err => console.log('error:', err),
  () => console.log('the end'),
);
// result:
// 'next: 10'
// 'next: 20'
// 'next: 30'
```

### Пример 2: Использование массива

```typescript
import { of } from 'rxjs';

of([1,2,3])
.subscribe(
  next => console.log('next:', next),
  err => console.log('error:', err),
  () => console.log('the end'),
);
// result:
// 'next: [1,2,3]'
```

## Полезные ссылки

- 📰 Официальная документация: [of](https://rxjs.dev/api/index/function/of)
- 📁 Исходный код: [https://github.com/ReactiveX/rxjs/blob/6.5.4/src/internal/observable/of.ts](https://github.com/ReactiveX/rxjs/blob/6.5.4/src/internal/observable/of.ts)


