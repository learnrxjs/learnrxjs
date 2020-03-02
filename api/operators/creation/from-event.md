# FromEvent

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

Подписывается на событие `eventName` объекта `target`.

## Параметры

- `target`

  Объект у события которого будут прослушиваться

- `eventName`

  Название события которое будет слушаться

- `options`

  Параметры с которыми буду слушаться события

- ~~`resultSelector`~~ *Depricated*

  Мутирует данные пришедшие из `fromEvent`. Лучше использовать оператор `map`


## Примеры
## Полезные ссылки