# ShareReplay

## Сигнатура

```typescript
shareReplay<T>(bufferSize?: number | ShareReplayConfig, windowTime?: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>
```

Запускает механизм multicast-а с использованием subject-а `ReplaySubject`. Часто оператор `shareReplay` используется когда вы не хотите, чтобы новый подписчик заново выполнял весь Observable (это может быть сетевой запрос), вместо этого можно сделать так чтобы подписчик получил последнее атуальное значение (или несколько значений) сразу после подписки. В этом и есть отличие от `share`, который использует обычный `Subject`.

## Параметры

- `bufferSize` *опционально*

    Количество значений которые нужно сохранять и отправлять новым подписчикам

- `windowTime` *опционально*

    Как долго хранить пришедшие значения

- `scheduler` *опционально*

    Планировщик

## Примеры

### Пример 1: Зачем может понадобиться использовать shareReplay

Представьте у вас есть Observable который шлет последний посещенный URL. В примере ниже мы используем `share`:

```typescript
// simulate url change with subject
const routeEnd = new Subject<{data: any, url: string}>();

// grab url and share with subscribers
const lastUrl = routeEnd.pipe(
  pluck('url'),
  share()
);

// initial subscriber required
const initialSubscriber = lastUrl.subscribe(console.log);

// simulate route change
routeEnd.next({data: {}, url: 'my-path'});

// nothing logged
const lateSubscriber = lastUrl.subscribe(console.log);
```

Как видите выше подписчику `lateSubscriber` ничего не пришло. Для того чтобы подписчик получил последний посещенный URL, в примере ниже мы будем использовать `shareReplay`:

````typescript
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';

// simulate url change with subject
const routeEnd = new Subject<{data: any, url: string}>();

// grab url and share with subscribers
const lastUrl = routeEnd.pipe(
  tap(_ => console.log('executed')),
  pluck('url'),
  // defaults to all values so we set it to just keep and replay last one
  shareReplay(1)
);

// requires initial subscription
const initialSubscriber = lastUrl.subscribe(console.log);

// simulate route change
// logged: 'executed', 'my-path'
routeEnd.next({data: {}, url: 'my-path'});

// logged: 'my-path'
const lateSubscriber = lastUrl.subscribe(console.log);
````

Стоит заметить, что мы можем симулировать подобное поведение без помощи специального оператора используя subject `ReplaySubject`:

```typescript
// simulate url change with subject
const routeEnd = new Subject<{data: any, url: string}>();

// instead of using shareReplay, use ReplaySubject
const shareWithReplay = new ReplaySubject();

// grab url and share with subscribers
const lastUrl = routeEnd.pipe(
  pluck('url')
)
.subscribe(val => shareWithReplay.next(val));

// simulate route change
routeEnd.next({data: {}, url: 'my-path'});

// subscribe to ReplaySubject instead
// logged: 'my path'
shareWithReplay.subscribe(console.log);
```

На самом деле если мы заглянем в код операотра `shareReplay`, то он будет работать по примерно такому же алгоритму что и выше, `shareReplay` использует в качестве subject-а `ReplaySubject`

## Полезные ссылки

- 📰 Официальная документация: [shareReplay](https://rxjs.dev/api/operators/shareReplay)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/shareReplay.ts
