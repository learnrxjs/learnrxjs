# single

## Сигнатура

```typescript
single<T>(predicate?: (value: T, index: number, source: Observable<T>) => boolean): MonoTypeOperatorFunction<T>
```

## Описание

Фильтрует данные потока таким образом, чтобы осталось одно значение соответствующее функции предикату. В случае если она не указана, подходит любое значение.

## Параметры

| Название    | Описание         |
|-------------|------------------|
| `predicate` | Функция-предикат |

Оператор `single` бросает исключение при следующих условиях:

1. Если поток завершится не отправив ни одного значения — будет ошибка [EmptyError](https://rxjs.dev/api/index/interface/EmptyError)
2. Если функции-предикату соответствует более двух значений — будет ошибка [SequenceError](https://rxjs.dev/api/index/interface/SequenceError)
3. Если поток закроется и функции-предикату не будет соответсововать ни одно значение последует ошибка [NotFoundError](https://rxjs.dev/api/index/interface/NotFoundError)

## Примеры

### Пример 1

```typescript
import { of } from 'rxjs';
import { single } from 'rxjs/operators';

const source1 = of(
  { name: 'Ben' },
  { name: 'Tracy' },
  { name: 'Laney' },
  { name: 'Lily' }
);

source1.pipe(
  single(x => x.name.startsWith('B'))
)
       .subscribe(x => console.log(x));
// Выведится: "Ben"

const source2 = of(
  { name: 'Ben' },
  { name: 'Tracy' },
  { name: 'Bradley' },
  { name: 'Lincoln' }
);

source2.pipe(
  single(x => x.name.startsWith('B'))
)
       .subscribe(x => console.log(x));
// Ошибка: SequenceError('Too many values match')

const source3 = of(
  { name: 'Laney' },
  { name: 'Tracy' },
  { name: 'Lily' },
  { name: 'Lincoln' }
);

source3.pipe(
  single(x => x.name.startsWith('B'))
)
       .subscribe(x => console.log(x));
// Ошибка: NotFoundError('No values match')
```

## Полезные ссылки

- 📰 Официальная документация: [single](https://rxjs.dev/api/operators/single)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/single.ts

