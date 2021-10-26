# observeOn

## Сигнатура

```typescript
observeOn<T>(scheduler: SchedulerLike, delay: number = 0): MonoTypeOperatorFunction<T>
```

## Описание

Переотправляет все значения, в том числе события завершения и ошибки потока в контексте переданного шедулера

## Параметры

| Название | Описание |
|-|-|
| `scheduler` | Шедулер, который нужно использовать |
| `delay` | Количество миллисекунд, указывающее, с какой задержкой следует перенести каждое уведомление |


## Примеры

### Пример 1

Краткое описание

```typescript
import { interval, animationFrameScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

const someDiv = document.querySelector("#someDiv");
const intervals = interval(10);                // По умолчанию оператор «interval»
                                               // использует «asyncScheduler» шедулер...
intervals.pipe(
  observeOn(animationFrameScheduler),          // ...но мы будем использовать «animationFrameScheduler»,
)                                              // чтобы реализовать плавную анимацию
.subscribe(val => {
 someDiv.style.height = val + 'px';
});
```

## Полезные ссылки

- 📰 Официальная документация: [observeOn](https://rxjs.dev/api/operators/observeOn)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/observeOn.ts

