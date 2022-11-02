# fromEventPattern

## Сигнатура

```ts
fromEventPattern<T>(
  addHandler: (handler: NodeEventHandler) => any,
  removeHandler?: (handler: NodeEventHandler, signal?: any) => void,
  resultSelector?: (...args: any[]) => T
): Observable<T | T[]>
```

## Параметры

| addHandler | `(handler: NodeEventHandler) => any` | Функция, которая принимает функцию `hadler`, которая каким-то образом регистрирует его у источника данных |
|---|---|--|
| removeHandler | `(handler: NodeEventHandler, signal?: any) => void` | _Опционально_. По умл. `undefined`. <br /> Функция, принимает на вход функцию `handler`, чтобы удалить ее из источника данных. Если функция `addHandler` возвращает некий токен, `removeHandler` прокинет его в качестве второго параметра |

## Описание

Создает поток данных из произвольного API для регистрации обработчиков событий.

## Примеры

### Пример 1

```ts
import { fromEventPattern } from 'rxjs';

function addClickHandler(handler) {
  document.addEventListener('click', handler);
}

function removeClickHandler(handler) {
  document.removeEventListener('click', handler);
}

const clicks = fromEventPattern(
  addClickHandler,
  removeClickHandler
);
clicks.subscribe(x => console.log(x));
```

### Пример 2

```ts
import { fromEventPattern } from 'rxjs';

const token = someAPI.registerEventHandler(function() {});
// В этом случае, чтобы отписаться от прослушивания события
// нужно передать не функцию, а некий токен,
// которую возвращает метод регистрации.
// Очень похоже на setTimeout и setInterval
someAPI.unregisterEventHandler(token);

const someAPIObservable = fromEventPattern(
  function(handler) { return someAPI.registerEventHandler(handler); },
  function(handler, token) { someAPI.unregisterEventHandler(token); }
);
```

## Полезные ссылки

- 📰 Официальная документация: [fromEventPattern](https://rxjs.dev/api/index/function/fromEventPattern)
- 📁 Исходный код: https://github.com/reactivex/rxjs/tree/master/src/internal/observable/fromEventPattern.ts