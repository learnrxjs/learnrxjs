# materialize

## Сигнатура

```ts
materialize<T>(): OperatorFunction<T, Notification<T> & ObservableNotification<T>>
```

## Параметры

Параметров нет.

## Описание

Оборачивает события `next`, `error` и `complete` в объект интерфейса [Notification](https://rxjs.dev/api/index/class/Notification).

![](https://rxjs.dev/assets/images/marble-diagrams/materialize.png)

## Примеры

```ts
import { of, materialize, map } from 'rxjs';

const letters = of('a', 'b', 13, 'd');
const upperCase = letters.pipe(map((x: any) => x.toUpperCase()));
const materialized = upperCase.pipe(materialize());

materialized.subscribe(x => console.log(x));

// Results in the following:
// - Notification { kind: 'N', value: 'A', error: undefined, hasValue: true }
// - Notification { kind: 'N', value: 'B', error: undefined, hasValue: true }
// - Notification { kind: 'E', value: undefined, error: TypeError { message: x.toUpperCase is not a function }, hasValue: false }
```

## Полезные ссылки

- 📰 Официальная документация: [materialize](https://rxjs.dev/api/operators/materialize)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/materialize.ts