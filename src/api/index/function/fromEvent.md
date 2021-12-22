---
title: fromEvent
---

## Сигнатура

```typescript
fromEvent<T>(
  target: FromEventTarget<T>,
  eventName: string,
  options?: EventListenerOptions | ((...args: any[]) => T),
  resultSelector?: (...args: any[]) => T
): Observable<T>
```

## Описание

`fromEvent` первым аргументом принимает объект методы которого позволяют регистрировать и удалять слушателей событий. Вторым аргументом тип события в виде строки. В случае если у объекта нет типа события который нужен вам, вы можете использовать `fromEventPattern` для описания определенного поведения. `fromEvent` поддерживает разные методы подписки на прослушку событий, не смотря на то что у этих методов могут быть разные имена, они так или иначе принимают тип события и функцию.

При вызове метода `subscribe` у `fromEvent`, `fromEvent` регистрирует функцию на определенный тип события. Когда событие срабатывает, первый аргумент пришедший в функцию-слушатель попадает в поток `fromEvent`-а. Когда происходит отписка, `fromEvent` так же отписывается от прослушки события.

В случае если функция-слушатель вызывается с более чем одним аргументом, `fromEvent` испускает список собранный из этих аргументов.

Список поддерживаемых способов подписки на события `fromEvent`:

- DOM

  Объекты реализующие методы `addEventListener` и `removeEventListener`. В браузере `addEventListener` помимо типа события и функции слушателя, опционально принимают [парметры или логический флаг](https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener#%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B)

- Node.JS

  Объекты реализущие методы `addListener` и `removeListener`. [Документация NodeJS](https://nodejs.org/docs/latest-v11.x/api/events.html#events_class_eventemitter)

- JQuery-подобные

  Объекты реализующие методы `on` and `off`. [Документация метода `on`](https://api.jquery.com/on/)

- [DOM NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) или [DOM HtmlCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection)

  Список или коллеция DOM элементов. `fromEvent` сам проитерируется и подпишется на каждый

Подписывается на событие `eventName` объекта `target`.

## Параметры

- `target`

  Объект события которого будут прослушиваться

- `eventName`

  Название события которое будет слушаться

- `options`

  Параметры с которыми буду слушаться события (имеет смысл только для DOM элементов)

- ~~`resultSelector`~~ *Deprecated*

  Мутирует данные пришедшие из `fromEvent`. Лучше использовать оператор `map`

## Примеры

### Пример 1: Клик по document

```typescript
import { fromEvent } from 'rxjs';

const clicks = fromEvent(document, 'click');
clicks.subscribe(x => console.log(x));

// Results in:
// MouseEvent object logged to console every time a click
// occurs on the document.
```

### Пример 2: Использование параметра `capture`

```typescript
import { fromEvent } from 'rxjs';

const clicksInDocument = fromEvent(document, 'click', true); // note optional configuration parameter
                                                             // which will be passed to addEventListener
const clicksInDiv = fromEvent(someDivInDocument, 'click');

clicksInDocument.subscribe(() => console.log('document'));
clicksInDiv.subscribe(() => console.log('div'));

// By default events bubble UP in DOM tree, so normally
// when we would click on div in document
// "div" would be logged first and then "document".
// Since we specified optional `capture` option, document
// will catch event when it goes DOWN DOM tree, so console
// will log "document" and then "div".
```

## Полезные ссылки

- 📰 Официальная документация: [fromEvent](https://rxjs.dev/api/index/function/fromEvent)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/6.5.4/src/internal/observable/fromEvent.ts
