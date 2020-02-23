# BufferTime

Сохраняет пришедшие данные, и с указанным интервалом отправляет сохраненные значения в виде массива

## Сигнатура

```typescript
bufferTime<T>(bufferTimeSpan: number): OperatorFunction<T, T[]>
```

## Параметры

<!-- TODO: Добавить описание для параметра `bufferCreationInterval` -->
<dl>
	<dt><code>bufferTimeSpan</code></dt>
	<dd>Интервал отправки данных в миллисекундах</dd>
</dl>

## Примеры

```typescript
// RxJS v6+
import { interval } from 'rxjs';
import { bufferTime } from 'rxjs/operators';

//Create an observable that emits a value every 500ms
const source = interval(500);
//After 2 seconds have passed, emit buffered values as an array
const example = source.pipe(bufferTime(2000));
//Print values to console
//ex. output [0,1,2]...[3,4,5,6]
const subscribe = example.subscribe(val =>
  console.log('Buffered with Time:', val)
);
```


## Полезные ссылки

- 📰 Официальная документация: [bufferTime](https://rxjs.dev/api/operators/bufferTime)
- 📁 Исходный код: [https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/bufferTime.ts](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/bufferTime.ts)
