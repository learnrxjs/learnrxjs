---
title: first
---

## Сигнатура

```typescript
first<T, D>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: D): OperatorFunction<T, T | D>
```

## Описание

Возвращает первое попавшееся значение в потоке и завершается.

!> Является аналогом выражения `take(1)` за исключением того, что `first` выкидывает ошибку [`EmptyError`](https://github.com/ReactiveX/rxjs/blob/3020549054e4df240e51456de34252531c3ee512/src/internal/util/EmptyError.ts#L31) в случае если поток оказался пустым.

## Параметры

- `predicate` *Опционально*
  
  Функция вызываемая каждый раз при новом значении для проверки условия.

- `defaultValue` *Опционально*

  Если указано значение по умолчанию, в случае если поток пустой, будет использоваться оно, если же не указано выкинет ошибку.

## Примеры

### Пример 1

```typescript
import { fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');

const result = clicks.pipe(
  first()
);

result.subscribe(x => console.log(x));
```

### Пример 1: Использование `predicate`

```typescript
import { fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');

const result = clicks.pipe(
  first(ev => ev.target.tagName === 'DIV')
);

result.subscribe(x => console.log(x));
```

## Полезные ссылки

- 📰 Официальная документация: [first](https://rxjs.dev/api/operators/first)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/first.ts

