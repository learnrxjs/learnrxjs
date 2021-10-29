# findIndex

## Сигнатура

```typescript
findIndex<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): OperatorFunction<T, number>
```

## Описание

Вернет поток из одного значения являющееся индексом значения подходящего под функцию-предикат.

## Параметры

| Название | Описание |
|-|-|
| `predicate` | Функция-предикат |
| `thisArg` | Контекст функции-предиката |

Находит первый попвшееся значения соответсвующее функции-предикату и возвращает его индекс.

## Примеры

```typescript
import { fromEvent } from 'rxjs';
import { findIndex } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(findIndex(ev => ev.target.tagName === 'DIV'));
result.subscribe(x => console.log(x));
```

## Полезные ссылки

- 📰 Официальная документация: [findIndex](https://rxjs.dev/api/operators/findIndex)
- 📁 Исходный код: https://github.com/reactivex/rxjs/tree/master/src/internal/operators/findIndex.ts#L15-L59
