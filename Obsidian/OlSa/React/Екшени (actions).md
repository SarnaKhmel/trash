
[[Підписка на стор]]

**Екшени** - це об'єкти, які передають дані з компонентів у стор, тим самим сигналізуючи про те, яка подія сталася в інтерфейсі. Вони являються єдиним джерелом інформації для стору.

```
const action = {  type: "Action type",  payload: "Payload value",};
```

Екшени повинні мати обов'язкову властивість `type` - рядок який описує тип події в інтерфейсі. Крім властивості `type` структура об'єкта може бути довільною, проте, дані зазвичай передають у необов'язковій властивості `payload`. Даними екшену може бути будь-яке значення крім функцій та класів.

Створимо екшени які описуватимуть додавання, видалення та перемикання статусу завдання, а також зміну значення фільтра.

```
const addTask = {  type: "tasks/addTask",  payload: {    id: "Generated id",    text: "User entered text",    completed: false,  },};const deleteTask = {  type: "tasks/deleteTask",  payload: "Task id",};const toggleCompleted = {  type: "tasks/toggleCompleted",  payload: "Task id",};const setStatusFilter = {  type: "filters/setStatusFilter",  payload: "Filter value",};
```

НАЙКРАЩІ ПРАКТИКИ - НАЙМЕНУВАННЯ

Одна з найпопулярніших конвенцій складання типу екшену пропонує використовувати у значенні поля `type` дві частини у форматі `domain/eventName`. Перше це ім'я категорії (сутності) до якої належить екшен (tasks та filters), зазвичай збігається з ім'ям властивості частини стану Redux, і друге це подія, яка описує екшен (addTask, deleteTask, toggleCompleted, setStatusFilter).

НАЙКРАЩІ ПРАКТИКИ - МІНІМАЛІЗМ

Екшени повинні нести в собі мінімально необхідний набір інформації, якого буде достатньо для зміни стану. Наприклад, при видаленні завдання досить передати її ідентифікатор, а чи не весь об'єкт завдання цілком.

## Генератори екшенів[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-11/actions#%D0%B3%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B8-%D0%B5%D0%BA%D1%88%D0%B5%D0%BD%D1%96%D0%B2 "Пряме посилання на цей заголовок")

Екшени це статичні об'єкти, значення властивості `payload` яких неможливо задати динамічно. Генератори екшенів (Action Creators) - функції, які можуть приймати аргументи, після чого створюють та повертають екшени з однаковим значенням властивості `type`, але різними `payload`. Вони можуть мати побічні ефекти, наприклад, заповнювати властивості за замовчуванням або генерувати унікальний ідентифікатор об'єкта завдання. Створимо генератори екшенів для нашої програми.

src/redux/actions.js

```
import { nanoid } from "nanoid";export const addTask = text => {  return {    type: "tasks/addTask",    payload: {      id: nanoid(),      completed: false,      text,    },  };};export const deleteTask = taskId => {  return {    type: "tasks/deleteTask",    payload: taskId,  };};export const toggleCompleted = taskId => {  return {    type: "tasks/toggleCompleted",    payload: taskId,  };};export const setStatusFilter = value => {  return {    type: "filters/setStatusFilter",    payload: value,  };};
```

УНІКАЛЬНИЙ ІДЕНТИФІКАТОР ЗАДАЧІ

Зверніть увагу на генератор екшенів створення задачі `addTask`. В майбутньому присвоєнням ідентифікатора займатиметься бекенд, а поки що зробимо це в нашому коді. Для цього використовуємо бібліотеку [**nanoid**](https://www.npmjs.com/package/nanoid).

## Відправлення екшенів[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-11/actions#%D0%B2%D1%96%D0%B4%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F-%D0%B5%D0%BA%D1%88%D0%B5%D0%BD%D1%96%D0%B2 "Пряме посилання на цей заголовок")

Для того щоб сповістити сторінку про те, що в інтерфейсі відбулася якась подія, необхідно відправити екшен. Для цього у бібліотеці React Redux є хук [`useDispatch()`](https://react-redux.js.org/api/hooks#usedispatch), який повертає посилання на функцію надсилання екшенів `dispatch` з об'єкта створеного нами раніше стора Redux.

```
// Імпортуємо хукimport { useDispatch } from "react-redux";const MyComponent = () => {  // Отримуємо посилання на функцію відправки екшенів  const dispatch = useDispatch();};
```

Додамо код відправлення раніше спроектованих екшенів із компонентів нашої програми. Для того щоб сфокусувати увагу на відправці екшенів, в приклади опустимо код стилізації. Повний код програми ви можете розібрати на живому прикладі наприкінці цієї секції.

### Створення завдання[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-11/actions#%D1%81%D1%82%D0%B2%D0%BE%D1%80%D0%B5%D0%BD%D0%BD%D1%8F-%D0%B7%D0%B0%D0%B2%D0%B4%D0%B0%D0%BD%D0%BD%D1%8F "Пряме посилання на цей заголовок")

При сабміті форми в компоненті `TaskForm` необхідно надіслати екшен створення нового завдання, передавши йому значення, введене користувачем у текстове поле.

src/components/TaskForm/TaskForm.js

```
// Імпортуємо хукimport { useDispatch } from "react-redux";// Імпортуємо генератор екшенуimport { addTask } from "../../redux/actions";export const TaskForm = () => {  // Отримуємо посилання на функцію відправки екшенів  const dispatch = useDispatch();  const handleSubmit = event => {    event.preventDefault();    const form = event.target;    // Викликаємо генератор екшену та передаємо текст завдання для поля payload    // Відправляємо результат – екшен створення завдання    dispatch(addTask(form.elements.text.value));    form.reset();  };  return (    <form onSubmit={handleSubmit}>      <input type="text" name="text" placeholder="Enter task text..." />      <button type="submit">Add task</button>    </form>  );};
```

При сабміті форми, у списку екшенів зліва Redux DevTools, додається відправлений екшен створення завдання. Клікнувши по ньому та вибравши у правій частині вкладку `Actions`, можна переглянути детальну інформацію.

![Add task action in redux devtools](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/img/lesson-11/add-task-action.png)

### Видалення завдання[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-11/actions#%D0%B2%D0%B8%D0%B4%D0%B0%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F-%D0%B7%D0%B0%D0%B2%D0%B4%D0%B0%D0%BD%D0%BD%D1%8F "Пряме посилання на цей заголовок")

При натисканні на кнопку видалення в компоненті `Task`, необхідно відправити екшен видалення завдання, передавши йому ідентифікатор завдання. Цих даних буде достатньо для видалення задачі з масиву об'єктів.

src/components/Task/Task.js

```
// Імпортуємо хукimport { useDispatch } from "react-redux";// Імпортуємо генератор екшенуimport { deleteTask } from "../../redux/actions";export const Task = ({ task }) => {  // Отримуємо посилання на функцію відправки екшенів  const dispatch = useDispatch();  // Викликаємо генератор екшену та передаємо ідентифікатор завдання  // Відправляємо результат - екшен видалення завдання  const handleDelete = () => dispatch(deleteTask(task.id));  return (    <div>      <input type="checkbox" />      <p>{task.text}</p>      <button type="button" onClick={handleDelete}>        Delete      </button>    </div>  );};
```

При натисканні на кнопку видалення, в Redux DevTools додається відправлений екшен видалення завдання. Клікнувши по ньому, можна переглянути детальну інформацію.

![Delete task action in redux devtools](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/img/lesson-11/delete-task-action.png)

### Переключення статусу[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-11/actions#%D0%BF%D0%B5%D1%80%D0%B5%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%BD%D1%8F-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D1%83 "Пряме посилання на цей заголовок")

При натисканні на чекбокс в компоненті `Task`, необхідно відправити екшен перемикання статусу завдання, передавши йому ідентифікатор завдання. Цих даних буде достатньо для того, щоб знайти завдання в масиві об'єктів і змінити значення властивості на протилежне.

src/components/Task/Task.js

```
// Імпортуємо хукimport { useDispatch } from "react-redux";// Імпортуємо генератор екшенуimport { deleteTask, toggleCompleted } from "../../redux/actions";export const Task = ({ task }) => {  // Отримуємо посилання на функцію відправки екшенів  const dispatch = useDispatch();  const handleDelete = () => dispatch(deleteTask(task.id));  // Викликаємо генератор екшену та передаємо ідентифікатор завдання  // Відправляємо результат - екшен перемикання статусу завдання  const handleToggle = () => dispatch(toggleCompleted(task.id));  return (    <div>      <input type="checkbox" onChange={handleToggle} checked={task.completed} />      <p>{task.text}</p>      <button onClick={handleDelete}>Delete</button>    </div>  );};
```

При кліку по чекбоксу, Redux DevTools додається відправлений екшен зміни статусу завдання. Клікнувши по ньому, можна переглянути детальну інформацію.

![Toggle task action in redux devtools](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/img/lesson-11/toggle-task-action.png)

БЕЗ ЗАЙВИХ ПРОПСІВ

Зверніть увагу на те, що у компонента `Task` немає додаткових пропсів, наприклад методів для видалення та зміни статусу, як це було б при використання стану React. Це також робить компонент списку завдань простіше, йому не доводиться приймати не потрібні пропси та прокидати їх у компонент завдання. Використовуючи Redux, будь-який компонент може безпосередньо отримати доступ до функції. відправлення екшенів.

### Зміна фільтра[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-11/actions#%D0%B7%D0%BC%D1%96%D0%BD%D0%B0-%D1%84%D1%96%D0%BB%D1%8C%D1%82%D1%80%D0%B0 "Пряме посилання на цей заголовок")

При натисканні на кнопки в компоненті `StatusFilter` необхідно відправити екшен зміни фільтра, передавши йому нове значення. Використовуємо об'єкт значень фільтр з файлу констант.

src/components/StatusFilter/StatusFilter.js

```
// Імпортуємо хукimport { useSelector, useDispatch } from "react-redux";// Імпортуємо генератор екшенуimport { setStatusFilter } from "../../redux/actions";// Імпортуємо об'єкт значень фільтраimport { statusFilters } from "../../redux/constants";export const StatusFilter = () => {  // Отримуємо посилання на функцію відправки екшенів  const dispatch = useDispatch();  const filter = useSelector(state => state.statusFilter);  // Викликаємо генератор екшену та передаємо значення фільтра  // Відправляємо результат - екшен зміни фільтра  const handleFilterChange = filter => dispatch(setStatusFilter(filter));  return (    <div>      <Button        selected={filter === statusFilters.all}        onClick={() => handleFilterChange(statusFilters.all)}      >        All      </Button>      <Button        selected={filter === statusFilters.active}        onClick={() => handleFilterChange(statusFilters.active)}      >        Active      </Button>      <Button        selected={filter === statusFilters.completed}        onClick={() => handleFilterChange(statusFilters.completed)}      >        Completed      </Button>    </div>  );};
```

При натисканні на кнопки фільтра, в Redux DevTools додається відправлений екшен зміни фільтра. Клікнувши по ньому, можна переглянути детальну інформацію.

![Set filter action in redux devtools](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/img/lesson-11/filter-task-action.png)

## Планувальник завдань[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-11/actions#%D0%BF%D0%BB%D0%B0%D0%BD%D1%83%D0%B2%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA-%D0%B7%D0%B0%D0%B2%D0%B4%D0%B0%D0%BD%D1%8C "Пряме посилання на цей заголовок")

Розберіть живий приклад нашої програми. На даний момент у додатку реалізовано ініціалізацію стора з інструментами розробника, підписка компонентів на стор і надсилання екшенів. Наступним кроком буде додавання логіки оновлення стану Redux за допомогою функцій-редюсерів.

https://codesandbox.io/s/goit-react-textbook-lesson-11-redux-actions-ysg1xq?from-embed


#redux 

[[Редюсери (reducers)]]