[[createReducer]]

При проектуванні структура стану Redux ділиться на слайси (slice, частина), за кожен із яких відповідає окремий редюсер. У нашому додатку планувальника задач є два слайси - завдання (tasks) та фільтри (filters).

```
const appState = {  tasks: [],  filters: {},};
```

Для кожного слайсу створюється стандартний набір сутностей: типи екшенів, генератори екшенів та редюсер. Редюсери визначають початковий стан слайсу, список екшенів, що впливають на нього та операції оновлення стану.

Функція [`createSlice()`](https://redux-toolkit.js.org/api/createSlice) це надбудова над `createAction()` та `createReducer()`, яка стандартизує та ще більше спрощує оголошення слайсу. Вона приймає параметри налаштувань, створює і повертає типи екшенів, генератори екшенів та редюсер. Розберемо створення слайсу на прикладі списку задач.

```
import { createSlice } from "@reduxjs/toolkit";const tasksSlice = createSlice({  // Ім'я слайсу  name: "tasks",  // Початковий стан редюсера слайсу  initialState: tasksInitialState,  // Об'єкт редюсерів  reducers: {    addTask(state, action) {},    deleteTask(state, action) {},    toggleCompleted(state, action) {},  },});// Генератори екшенівconst { addTask, deleteTask, toggleCompleted } = tasksSlice.actions;// Редюсер слайсуconst tasksReducer = tasksSlice.reducer;
```

Властивість `name` визначає ім'я слайсу, яке додаватиметься під час створення екшенів, як приставка до імен редюсерів, оголошених у властивості `reducers`. Так ми отримаємо екшени з типами `tasks/addTask`, `tasks/deleteTask` та `tasks/toggleCompleted`.

Функція `createSlice()` у своїй реалізації використовує `createReducer` і бібліотеку `Immer`, тому можна писати логіку оновлення стану так, як якби ми безпосередньо змінювали його.

```
import { createSlice } from "@reduxjs/toolkit";const tasksInitialState = [];const tasksSlice = createSlice({  name: "tasks",  initialState: tasksInitialState,  reducers: {    addTask(state, action) {      state.push(action.payload);    },    deleteTask(state, action) {      const index = state.findIndex(task => task.id === action.payload);      state.splice(index, 1);    },    toggleCompleted(state, action) {      for (const task of state) {        if (task.id === action.payload) {          task.completed = !task.completed;          break;        }      }    },  },});const { addTask, deleteTask, toggleCompleted } = tasksSlice.actions;const tasksReducer = tasksSlice.reducer;
```

## Вміст `payload`[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-12/slices#%D0%B2%D0%BC%D1%96%D1%81%D1%82-payload "Пряме посилання на цей заголовок")

Генератор екшену `addTask` очікує лише рядок з текстом завдання, після чого змінює значення `payload` використовуючи функцію підготовки екшену. Ось як це виглядає зараз у нашому коді.

src/redux/actions.js

```
import { createAction, nanoid } from "@reduxjs/toolkit";export const addTask = createAction("tasks/addTask", text => {  return {    payload: {      text,      id: nanoid(),      completed: false,    },  };});
```

Щоб зробити те саме при створенні слайсу, властивості в об'єкті редюсерів, в нашому випадку `addTask`, необхідно передати не функцію, а об'єкт із двома властивостями - `reducer` та `prepare`.

```
import { createSlice, nanoid } from "@reduxjs/toolkit";const tasksSlice = createSlice({  name: "tasks",  initialState: tasksInitialState,  reducers: {    addTask: {      reducer(state, action) {        state.push(action.payload);      },      prepare(text) {        return {          payload: {            text,            id: nanoid(),            completed: false,          },        };      },    },    // Код решти редюсерів  },});
```

## Файли слайсів[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-12/slices#%D1%84%D0%B0%D0%B9%D0%BB%D0%B8-%D1%81%D0%BB%D0%B0%D0%B9%D1%81%D1%96%D0%B2 "Пряме посилання на цей заголовок")

Нам більше не потрібний файл `reducer.js`, тому що під кожен слайс ми створимо окремий файл. Для слайсу завдань це буде файл `tasksSlice.js` .

src/redux/tasksSlice.js

```
import { createSlice } from "@reduxjs/toolkit";const tasksInitialState = [];const tasksSlice = createSlice({  name: "tasks",  initialState: tasksInitialState,  reducers: {    addTask: {      reducer(state, action) {        state.push(action.payload);      },      prepare(text) {        return {          payload: {            text,            id: nanoid(),            completed: false,          },        };      },    },    deleteTask(state, action) {      const index = state.findIndex(task => task.id === action.payload);      state.splice(index, 1);    },    toggleCompleted(state, action) {      for (const task of state) {        if (task.id === action.payload) {          task.completed = !task.completed;          break;        }      }    },  },});// Експортуємо генератори екшенів та редюсерexport const { addTask, deleteTask, toggleCompleted } = tasksSlice.actions;export const tasksReducer = tasksSlice.reducer;
```

Та файл `filtersSlice.js` для слайсу фільтрів.

src/redux/filtersSlice.js

```
import { createSlice } from "@reduxjs/toolkit";import { statusFilters } from "./constants";const filtersInitialState = {  status: statusFilters.all,};const filtersSlice = createSlice({  name: "filters",  initialState: filtersInitialState,  reducers: {    setStatusFilter(state, action) {      state.status = action.payload;    },  },});// Експортуємо генератори екшенів та редюсерexport const { setStatusFilter } = filtersSlice.actions;export const filtersReducer = filtersSlice.reducer;
```

## Створення стора[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-12/slices#%D1%81%D1%82%D0%B2%D0%BE%D1%80%D0%B5%D0%BD%D0%BD%D1%8F-%D1%81%D1%82%D0%BE%D1%80%D0%B0 "Пряме посилання на цей заголовок")

У файлі створення стора необхідно змінити код імпорту редюсерів.

src/redux/store.js

```
import { configureStore } from "@reduxjs/toolkit";//=============== Before ========================// import { tasksReducer, filtersReducer } from "./reducer";//=============== After ========================import { tasksReducer } from "./tasksSlice";import { filtersReducer } from "./filtersSlice";export const store = configureStore({  reducer: {    tasks: tasksReducer,    filters: filtersReducer,  },});
```

## Генератори екшенів[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-12/slices#%D0%B3%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B8-%D0%B5%D0%BA%D1%88%D0%B5%D0%BD%D1%96%D0%B2 "Пряме посилання на цей заголовок")

Генератори екшенів тепер створюються автоматично для кожного слайсу. Це означає, що нам більше не потрібно вручну оголошувати їх в окремому файлі. `createAction()`. Ми можемо видалити файл `actions.js` та оновити імпорти генераторів екшенів у файлах компонентів. Структура файлів проекту тепер буде виглядати так.

![Slice based file structure](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/img/lesson-12/file-structure.png)

Імпорти генераторів екшенів виготовляються з відповідного файлу слайсу.

```
//=============== Before ========================// import { deleteTask, toggleCompleted } from "redux/actions";//=============== After ========================import { deleteTask, toggleCompleted } from "redux/tasksSlice";
```

## Планувальник завдань[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-12/slices#%D0%BF%D0%BB%D0%B0%D0%BD%D1%83%D0%B2%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA-%D0%B7%D0%B0%D0%B2%D0%B4%D0%B0%D0%BD%D1%8C "Пряме посилання на цей заголовок")

Розберіть живий приклад планувальника завдань з оновленим кодом створення сторінок і генераторів екшенів.

https://codesandbox.io/s/goit-react-textbook-lesson-12-redux-toolkit-slices-ie3w35?from-embed

#redux 

[[Асинхронні операції]]
