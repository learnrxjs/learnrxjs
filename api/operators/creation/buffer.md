# buffer

## Сигнатура

```typescript
buffer<T>(closingNotifier: Observable<any>): OperatorFunction<T, T[]>
```

## Описание
Собирает данные из прошлых частей в массив и возвращает этот массив только тогда, когда срабатывает следующий Observable, иными словами буферизует источник значений Observable до тех пор, пока не сработает closingNotifier,
 в этот момент метод выдает сигнал на выходной Observable и открывает новый внутренний буфер в ожидании следующего срабатывания closingNotifier.
 
## Параметры

| Название | Описание |
|-|-|
| `closingNotifier` | Объект класса Observable который сигнализирует какой буфер будет использован для вывода |

## Возвращаемое значение
OperatorFunction<T, T[]>: объект Observable содержащий буферы, которые являются массивами значений

## Примеры

### Пример 1: на каждый клик выдавать массив с последними внутренними событиями

```typescript
// RxJS v6+
import { fromEvent, interval } from 'rxjs';
import { buffer } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const intervalEvents = interval(1000);
const buffered = intervalEvents.pipe(buffer(clicks));
buffered.subscribe(x => console.log(x));
```

## Полезные ссылки

- [bufferCount](api/operators/pipeable/bufferTime.md)
- [bufferTime](api/operators/pipeable/bufferTime.md)
- [bufferToggle](api/operators/pipeable/bufferToggle.md)
- [bufferWhen](api/operators/pipeable/bufferWhen.md)
- [window](api/operators/pipeable/window.md)

- 📰 Официальная документация: [OPERATOR_NAME](OPERATOR_URL)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/OPERATOR_NAME.ts
