---
title: pluck
---

## Сигнатура

```typescript
pluck<T, R>(...properties: string[]): OperatorFunction<T, R>
```

## Описание

Идет по списку `properties` используя их как путь для получения значения

## Параметры

| Название | Описание |
|-|-|
| `properties` | Список ключей |

## Пример

```typescript
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const tagNames = clicks.pipe(pluck('target', 'tagName'));
tagNames.subscribe(x => console.log(x));
```

## Полезные ссылки

- 📰 Официальная документация: [pluck](https://rxjs.dev/api/operators/pluck)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pluck.ts

