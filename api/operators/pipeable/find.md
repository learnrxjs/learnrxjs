# find

## Сигнатура

```typescript
find<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): OperatorFunction<T, T | undefined>
```

## Описание

Передает дальше по потоку значение первого найденного элемента, которое удовлетворяет условию переданному в `predicate` функции, после чего завершается

## Параметры

- `predicate`
  
  Функция содержащая в себе условие

- `thisArg` *Опционально*
  
  Контекст `this`, который будет объявлен в функции

## Примеры

```typescript
import { fromEvent } from 'rxjs';
import { find } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(find(ev => ev.target.tagName === 'DIV'));
result.subscribe(x => console.log(x));
```

## Полезные ссылки

- 📰 Официальная документация: [find](https://rxjs.dev/api/operators/find)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/find.ts

