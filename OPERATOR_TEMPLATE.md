# Название оператора

## Сигнатура

```typescript
hello(str: string, scheduler)
```

## Описание

## Параметры

| Название | Описание |
|-|-|
| `str` | Пример описания аргумента |
| ~~`scheduler`~~ *Deprecated* | Параметр с флагом deprecated |

## Примеры

### Пример 1

Краткое описание

```typescript
// RxJS v6+
import { endWith } from 'rxjs/operators';
import { of } from 'rxjs';

const source$ = of('Hello', 'Friend');

source$
  // emit on completion
  .pipe(endWith('Goodbye', 'Friend'))
  // 'Hello', 'Friend', 'Goodbye', 'Friend'
  .subscribe(console.log(val));
```

## Полезные ссылки

- 📰 Официальная документация: [OPERATOR_NAME](OPERATOR_URL)
- 📁 Исходный код: https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/OPERATOR_NAME.ts

