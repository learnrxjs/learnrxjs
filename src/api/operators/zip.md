---
title: zip
---

## Сигнатура

```typescript
zip<O extends ObservableInput<any>, R>(...observables: (O | ((...values: ObservedValueOf<O>[]) => R))[]): Observable<ObservedValueOf<O>[] | R>
```

## Описание

Подписывается на переданные потоки и комбинирует пришедшие значения. Оператор zip ждет пока каждый из потоков отправит значение и как только он получил значение от всех потоков он отправляет его в виде массива своим подписчикам.

## Параметры

| Название | Описание |
|-|-|
| `observables` | Список потоков |

## Примеры

Комбинирует значения возвраста и имени из разных потоков

```typescript
import { zip, of } from 'rxjs';
import { map } from 'rxjs/operators';

let age$ = of<number>(27, 25, 29);
let name$ = of<string>('Foo', 'Bar', 'Beer');
let isDev$ = of<boolean>(true, true, false);

zip(age$, name$, isDev$).pipe(
  map(([age, name, isDev]) => ({ age, name, isDev })),
)
.subscribe(x => console.log(x));

// outputs
// { age: 27, name: 'Foo', isDev: true }
// { age: 25, name: 'Bar', isDev: true }
// { age: 29, name: 'Beer', isDev: false }
```

## Полезные ссылки

- 📰 Официальная документация: [zip](https://rxjs.dev/api/index/function/zip)
- 📁 Исходный код: https://github.com/reactivex/rxjs/tree/master/src/internal/observable/zip.ts#L43-L86

