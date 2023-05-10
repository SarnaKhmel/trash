[[createAction]]

Будь-який редюсер отримує стан Redux і екшен, перевіряє тип екшену всередині інструкції `switch` і виконує відповідну логіку оновлення стану для даного екшену. До того ж, редюсер визначає початкове значення стану та повертає отриманий стан, якщо не повинен обробляти екшен. Цей спосіб вимагає занадто багато шаблонного коду і схильний до помилок. Функція [`createReducer()`](https://redux-toolkit.js.org/api/createReducer) спрощує процес оголошення редюсерів.

```
createReducer(initialState, actionsMap)
```

Першим аргументом вона чекає на початковий стан редюсера, а на другий об'єкт властивостей спеціального формату, де кожен ключ це тип екшену, а значення – це функція-редюсер цього типу. Тобто кожен `case` стає ключем об'єкта, для якого пишеться власний міні-редюсер.

Замінимо код оголошення редюсера завдань у нашому додатку використовуючи `createReducer`.

src/redux/reducer.js

```
import { createReducer } from "@reduxjs/toolkit";import { statusFilters } from "./constants";import { addTask, deleteTask, toggleCompleted } from "./actions";const tasksInitialState = [];//=============== Before ========================const tasksReducer = (state = tasksInitialState, action) => {  switch (action.type) {    case addTask.type:    // case logic    case deleteTask.type:    // case logic    case toggleCompleted.type:    // case logic    default:      return state;  }};//=============== After ========================export const tasksReducer = createReducer(tasksInitialState, {  [addTask]: (state, action) => {},  [deleteTask]: (state, action) => {},  [toggleCompleted]: (state, action) => {},});
```

Зверніть увагу на те, що код блоку не потрібен `default`. Функція `createReducer` автоматично додає редюсеру обробку поведінки за замовчуванням.

ПРИВЕДЕННЯ ДО РЯДКА

Синтаксис обчислюваних властивостей об'єкта призводить значення до рядка, тому можна просто використовувати ім'я функції без вказівки властивості `type`, адже метод `toString()` генератора екшену було перевизначено так, щоб повертати тип екшену.

Всередині кожного міні-редюсера додаємо код оновлення стану для екшену з відповідним типом.

src/redux/reducer.js

```
export const tasksReducer = createReducer(tasksInitialState, {  [addTask]: (state, action) => {    return [...state, action.payload];  },  [deleteTask]: (state, action) => {    return state.filter(task => task.id !== action.payload);  },  [toggleCompleted]: (state, action) => {    return state.map(task => {      if (task.id !== action.payload) {        return task;      }      return {        ...task,        completed: !task.completed,      };    });  },});export const filtersReducer = createReducer(filtersInitialState, {  [setStatusFilter]: (state, action) => {    return {      ...state,      status: action.payload,    };  },});
```

Один із фундаментальних принципів Redux полягає в тому, що редюсери повинні бути чистими функціями, які не змінюють поточний стан, а повертають новий. Це дозволяє писати передбачуваний код, але іноді сильно ускладнює його, оскільки код іммутального оновлення стану може бути досить заплутаним.

## Бібліотека Immer[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-12/reducers#%D0%B1%D1%96%D0%B1%D0%BB%D1%96%D0%BE%D1%82%D0%B5%D0%BA%D0%B0-immer "Пряме посилання на цей заголовок")

Redux Toolkit «під капотом» використовує бібліотеку [Immer](https://immerjs.github.io/immer/), яка значно спрощує логіку роботи зі станом, дозволяючи нам писати код оновлення стану в редюсері так, ніби ми безпосередньо змінювали стан. Насправді редюсери отримують копію стану, а Immer перетворює всі мутації на еквівалентні операції оновлення.

src/redux/reducer.js

```
export const tasksReducer = createReducer(tasksInitialState, {  [addTask]: (state, action) => {    // ✅ Immer замінить це на операцію оновлення    state.push(action.payload);  },  [deleteTask]: (state, action) => {    // ✅ Immer замінить це на операцію оновлення    const index = state.findIndex(task => task.id === action.payload);    state.splice(index, 1);  },  [toggleCompleted]: (state, action) => {    // ✅ Immer замінить це на операцію оновлення    for (const task of state) {      if (task.id === action.payload) {        task.completed = !task.completed;      }    }  },});export const filtersReducer = createReducer(filtersInitialState, {  [setStatusFilter]: (state, action) => {    // ✅ Immer замінить це на операцію оновлення    state.status = action.payload;  },});
```

Написання редюсерів «змінюючих» стан робить код коротшим і усуває поширені помилки, які допускаються під час роботи з вкладеним станом. Однак це додає «магії» і візуально порушує один із фундаментальних принципів Redux.

### Зміна або оновлення[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-12/reducers#%D0%B7%D0%BC%D1%96%D0%BD%D0%B0-%D0%B0%D0%B1%D0%BE-%D0%BE%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F "Пряме посилання на цей заголовок")

Іноді код іммутабельного оновлення стану лаконічніший, ніж його альтернатива, що «змінює». Наприклад, у редюсері обробки екшену видалення завдання. У такому разі необхідно обов'язково повернути новий стан.

src/redux/reducer.js

```
export const tasksReducer = createReducer(tasksInitialState, {  [deleteTask]: (state, action) => {    // ❌ Не правильно    // state.filter(task => task.id !== action.payload)    // ✅ Правильно    return state.filter(task => task.id !== action.payload);  },});
```

### Зміна чи повернення[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-12/reducers#%D0%B7%D0%BC%D1%96%D0%BD%D0%B0-%D1%87%D0%B8-%D0%BF%D0%BE%D0%B2%D0%B5%D1%80%D0%BD%D0%B5%D0%BD%D0%BD%D1%8F "Пряме посилання на цей заголовок")

Один із підводних каменів бібліотеки Immer полягає в тому, що в коді одного редюсера можна лише або мутувати стан, або повернути оновлений, але не те й інше водночас.

```
const reducer = createReducer([], {  [doSomething]: (state, action) => {    // ❌ Так робити не можна, буде згенеровано виняток    state.push(action.payload);    return state.map(value => value * 2);  },});
```

## Планувальник завдань[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-12/reducers#%D0%BF%D0%BB%D0%B0%D0%BD%D1%83%D0%B2%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA-%D0%B7%D0%B0%D0%B2%D0%B4%D0%B0%D0%BD%D1%8C "Пряме посилання на цей заголовок")

Розберіть живий приклад планувальника завдань з оновленим кодом створення сторінок і генераторів екшенів.

https://codesandbox.io/s/goit-react-textbook-lesson-12-redux-toolkit-reducers-obj0xb?from-embed

#redux 

[[createSlide]]
