# Планировщики

Планировкщики (Schedulers) контролируют когда будет произведена подписка или когда будет доставлено новое значение подписчику. Планировщики состоят из трех основ:

- Планировщик это структура данных, он знает как хранить или чередовать задачи на основании приорите или другого критерия

- Планировщик это контекст выполнения, он решает когда и где будет выполнена та или иная задача (например в `setTimeout`, `process.nextTick` или же в `animation frame`)

- У планировщика есть часы (виртуальные), он предоставляет данные о "времени" через метод `now()`

> Планировщик определяют в каком контексте выполнения Observable будет отправлять данные подписчику

В примере ниже, мы создаем обычный Observable отправляющий значения 1, 2, 3 синхронно и используя оператор `observeOn` с планировщиком `async` :

```ts
import { Observable, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

const observable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
}).pipe(
  observeOn(asyncScheduler)
);

console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x)
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
     console.log('done');
  }
});
console.log('just after subscribe');
```

После выполнения, мы получим:

```js
just before subscribe
just after subscribe
got value 1
got value 2
got value 3
done
```

Заметьте что сообщения `got value ...` были получены после сообщения `just after subscribe`, это несколько отличается от поведения что мы видели в предыдущих разделах. Все из-за оператора `observeOn` который реализует между исходным Observable и подписчиком, еще одного подписчика. Давайте переименуем названия некоторых переменных, чтобы стало понятнее:

```ts
import { Observable, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

var observable = new Observable((proxyObserver) => {
  proxyObserver.next(1);
  proxyObserver.next(2);
  proxyObserver.next(3);
  proxyObserver.complete();
}).pipe(
  observeOn(asyncScheduler)
);

var finalObserver = {
  next(x) {
    console.log('got value ' + x)
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
     console.log('done');
  }
};

console.log('just before subscribe');
observable.subscribe(finalObserver);
console.log('just after subscribe');
```

`proxyObserver` создается внутри оператора `observeOn(asyncScheduler)` и ниже схематично представлено то как выглядить метод `next`:

```ts
const proxyObserver = {
  next(val) {
    asyncScheduler.schedule(
      (x) => finalObserver.next(x),
      0 /* delay - задержка */,
      val /* значение x из предыдущей функции */
    );
  },

  // ...
}
```

Планировщик `async` работает на основе функций `setTimeout` или `setInterval`. Часто в Javascript для того чтобы отложить какую-то операцию на следующий [такт цикла событий](https://youtu.be/8cV4ZvHXQL4) используют такие конктрукции как `setTimeout(fn, 0)`, таким же образом `got value 1` было получено `finalObserver` после того как вывелось сообщение `just after subscribe`.

Метод `schedule()` принимает `delay` аргумент, представляющий собой количество времени относительно внутренних часов планировщика.  Часы планировщика не должны иметь отношения к настоящему времени. Именно таким образом работают операторы как-то взаимодействующие со времнем, они не знают о настоящем времени, они знают о времени которое им говорит планировщик, это очень удобно для тестирования.

## Типы планировщиков

| Тип                       | Цель                                                                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `null`                    | Не используя ни один из планировщиков, значения будут отправляться синхронно                                                                            |
| `queueScheduler`          |                                                                                                                                                         |
| `asapScheduler`           | Работает на Promise-ов. Обычно выполняется в промежуток между окончанием выполнения текущей задачи, но перед следующей                                  |
| `asyncScheduler`          | Работает на осове `setInterval`, часто используются в операторах взаимодействующие со временем                                                          |
| `animationFrameScheduler` | Откладывает задачу на следующий такт перерисовки страницы, работает на основе `requestAnimationFrame`, часто используется для создания плавных анимаций |

## Использование планировщиков

Скорее всего вы уже использовали планировщиков
