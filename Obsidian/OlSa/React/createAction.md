[[configureStore]]

Функція [`createAction(type)`](https://redux-toolkit.js.org/api/createAction) спрощує процес оголошення екшенів. В якості аргументу вона приймає рядок який описує тип дії та повертає генератор екшену.

src/redux/actions.js

```
//=============== Before ========================const addTask = text => {  return { type: "tasks/AddTask", payload: text };};console.log(addTask("Learn Redux Toolkit"));// {type: "tasks/addTask", payload: "Learn Redux Toolkit"}//=============== After ========================import { createAction } from "@reduxjs/toolkit";const addTask = createAction("tasks/AddTask");console.log(addTask("Learn Redux Toolkit"));// {type: "tasks/addTask", payload: "Learn Redux Toolkit"}
```

Додамо код створення інших генераторів екшенів для нашої програми. Використання `createAction()` позбавить нас від повторюваного шаблонного коду оголошення генератора екшену.

src/redux/actions.js

```
import { createAction } from "@reduxjs/toolkit";export const addTask = createAction("tasks/addTask");export const deleteTask = createAction("tasks/deleteTask");export const toggleCompleted = createAction("tasks/toggleCompleted");export const setStatusFilter = createAction("filters/setStatusFilter");
```

## Тип екшену[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-12/actions#%D1%82%D0%B8%D0%BF-%D0%B5%D0%BA%D1%88%D0%B5%D0%BD%D1%83 "Пряме посилання на цей заголовок")

Є два способи отримати тип екшену, наприклад, для використання в редюсері.

```
import { createAction } from "@reduxjs/toolkit";const addTask = createAction("tasks/AddTask");// У генератора екшену є властивість typeconsole.log(addTask.type); // "tasks/AddTask"// Метод toString() функції addTask був перевизначенийconsole.log(addTask.toString()); // "tasks/AddTask"
```

У редюсері імпортуємо екшени та використовуємо їх властивість `type` для заміни рядків всередині інструкції `switch`.

src/redux/reducer.js

```
import { addTask, deleteTask, toggleCompleted } from "./actions";export const tasksReducer = (state = tasksInitialState, action) => {  switch (action.type) {    case addTask.type:      return [...state, action.payload];    case deleteTask.type:      return state.filter(task => task.id !== action.payload);    case toggleCompleted.type:      return state.map(task => {        if (task.id !== action.payload) {          return task;        }        return { ...task, completed: !task.completed };      });    default:      return state;  }};
```

## Вміст `payload`[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-12/actions#%D0%B2%D0%BC%D1%96%D1%81%D1%82-payload "Пряме посилання на цей заголовок")

За замовчуванням генератори екшенів приймають один аргумент, який стає значенням властивості `payload`. Якщо потрібно написати додаткову логіку створення значення `payload`, наприклад, додати унікальний ідентифікатор, `createAction` можна передати другий, необов'язковий аргумент – функцію створення екшену.

```
createAction(type, prepareAction)
```

Аргументи генератора екшену будуть передані функції `prepareAction`, яка повинна повернути об'єкт із властивістю `payload`. Властивість `type` буде додано автоматично.

src/redux/actions.js

```
import { createAction, nanoid } from "@reduxjs/toolkit";export const addTask = createAction("tasks/addTask", text => {  return {    payload: {      text,      id: nanoid(),      completed: false,    },  };});console.log(addTask("Learn Redux Toolkit"));/** * { *   type: 'tasks/addTask', *   payload: { *     text: 'Learn Redux Toolkit', *     id: '4AJvwMSWEHCchcWYga3dj', *     completed: false *   } * } **/
```

Розберіть живий приклад планувальника завдань з оновленим кодом створення сторінок і генераторів екшенів.

https://codesandbox.io/s/goit-react-textbook-lesson-12-redux-toolkit-actions-48pfmc?from-embed

#redux 

[[createReducer]]
