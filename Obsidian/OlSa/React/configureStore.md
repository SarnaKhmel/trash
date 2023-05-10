[[Встановлення. Redux Toolkit]]

Redux Toolkit надає функцію [`configureStore(options)`](https://redux-toolkit.js.org/api/configureStore), яка обертає оригінальний `createStore()`, єдиним аргументом очікує об'єкт параметрів та налаштовує деякі корисні інструменти розробки як частина процесу створення стора.

Будемо виконувати рефакторинг коду програми планувальника завдань із попереднього заняття.

src/redux/store.js

```
//=============== Before ========================import { createStore } from "redux";import { devToolsEnhancer } from "@redux-devtools/extension";import { rootReducer } from "./reducer";const enhancer = devToolsEnhancer();export const store = createStore(rootReducer, enhancer);//=============== After ========================import { configureStore } from "@reduxjs/toolkit";import { rootReducer } from "./reducer";const store = configureStore({  reducer: rootReducer,});
```

На перший погляд, практично одне й теж, проте, відразу були налаштовані інструменти розробника (Redux DevTools) та деякі інші корисні функції, наприклад перевірка поширених помилок, таких як мутація стану в редюсерах чи використання невалідних значень у стані.

Також функція `configureStore()` може автоматично створити кореневий редюсер. Для цього необхідно передати властивості `reducer` об'єкт тієї ж форми що в `combineReducers`. Для початку видалимо створення кореневого редюсера в нашому коді програми та додамо імпорти редюсерів завдань та фільтрів із файлу `src/redux/reducer.js`. Опустимо не критичний вихідний код для того, щоб скоротити обсяг прикладів.

src/redux/reducer.js

```
//=============== Before ========================import { combineReducers } from "redux";import { statusFilters } from "./constants";const tasksInitialState = [];const tasksReducer = (state = tasksInitialState, action) => {  // Reducer code};const filtersInitialState = {  status: statusFilters.all,};const filtersReducer = (state = filtersInitialState, action) => {  // Reducer code};export const rootReducer = combineReducers({  tasks: tasksReducer,  filters: filtersReducer,});//=============== After ========================import { statusFilters } from "./constants";const tasksInitialState = [];export const tasksReducer = (state = tasksInitialState, action) => {  // Reducer code};const filtersInitialState = {  status: statusFilters.all,};export const filtersReducer = (state = filtersInitialState, action) => {  // Reducer code};
```

Тепер у файлі створення стора імпортуємо та використовуємо окремі редюсери.

src/redux/store.js

```
import { configureStore } from "@reduxjs/toolkit";import { tasksReducer, filtersReducer } from "./reducer";export const store = configureStore({  reducer: {    tasks: tasksReducer,    filters: filtersReducer,  },});
```

Розберіть живий приклад планувальника завдань із оновленим кодом створення стора.

https://codesandbox.io/s/goit-react-textbook-lesson-12-redux-toolkit-store-t8pzzo?from-embed

#redux 

[[createAction]]

