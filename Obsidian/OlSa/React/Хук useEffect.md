[[Хук useState]]

Методи життєвого циклу служать для того, щоб здійснювати якісь операції на різних стадіях життя компонента. Наприклад, запитувати дані з бекенда, додавати підписки подій тощо. Усе це називається «побічні ефекти». За допомогою хука `useEffect` у компонентах-функціях можна виконувати всі ці «ефекти», змоделювавши роботу трьох методів життєвого циклу - `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`, об'єднавши їх в один API.

```
import { useState, useEffect } from "react";const App = () => {  const [value, setValue] = useState(0);  useEffect(() => {    document.title = `You clicked ${value} times`;  });  return (    <div>      <p>You clicked {value} times</p>      <button onClick={() => setValue(value + 1)}>Click me</button>    </div>  );};
```

`useEffect(callback, deps)` приймає два аргументи:

-   **callback** - функція, усередині якої виконується вся логіка ефекту. Наприклад, запити на сервер, завдання обробників подій на документ і т.п.
-   **залежності** - масив змінних, при зміні будь-якого з яких, буде запускатися ефект і виконуватися callback. Це може бути стан, пропси або будь-яке локальне значення всередині компонента.

ЗАЛЕЖНОСТІ

Якщо не передати масив залежностей, ефект виконуватиметься на кожному рендері компонента. Саме завдяки масиву залежностей ми можемо імітувати методи життєвого циклу.

## Аналог `componentDidMount`[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-07/use-effect#%D0%B0%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3-componentdidmount "Пряме посилання на цей заголовок")

Хук useEffect запускається не тільки при зміні елементів масиву залежностей, але і відразу після монтування компонента. Якщо ми вкажемо в якості другого аргументу порожній масив, callback запуститься на стадії монтування компонента, і більше ніколи.

```
const App = () => {  const [value, setValue] = useState(0);  useEffect(() => {    console.log("Mouting phase: same when componentDidMount runs");  }, []);  return <button onClick={() => setValue(value + 1)}>{value}</button>;};
```

## Аналог `componentDidUpdate`[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-07/use-effect#%D0%B0%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3-componentdidupdate "Пряме посилання на цей заголовок")

У масиві потрібно перерахувати всі залежності ефекту. Так отримуємо більш гнучкий аналог методу `componentDidUpdate`, який запускається тільки за зміні певних значень. При цьому важливо враховувати, що такий ефект запускається і на стадії монтування, що абсолютно нормально у більшості випадків.

```
const App = () => {  const [value, setValue] = useState(0);  useEffect(() => {    console.log(value);    console.log("Updating phase: same when componentDidUpdate runs");  }, [value]);  return <button onClick={() => setValue(value + 1)}>{value}</button>;};
```

### Список залежностей[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-07/use-effect#%D1%81%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%B7%D0%B0%D0%BB%D0%B5%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D0%B5%D0%B9 "Пряме посилання на цей заголовок")

У програмі створеній за допомогою утиліти Create React App налаштування ESLint містять у собі правило `react-hooks/exhaustive-deps`, перевіряюче **обов'язкову** наявність всіх зовнішніх змінних (стану, пропсів і т.п.) у масиві залежностей. Якщо ви написали ефект та лінтер вказує на проблеми зі списком залежностей – ваш ефект працює нестабільно і непередбачувано. Додайте усі необхідні залежності ефекту.

```
const App = () => {  const [firstValue, setFirstValue] = useState(0);  const [secondValue, setSecondValue] = useState(0);  // ❌ Погано. ESLint покаже попередження  useEffect(() => {    console.log(firstValue + secondValue);  }, [firstValue]);  // ✅ Добре. Вказані всі залежності, що використовуються всередині ефекту  useEffect(() => {    console.log(firstValue + secondValue);  }, [firstValue, secondValue]);  return (    <>      <button onClick={() => setFirstValue(value + 1)}>First: {value}</button>      <button onClick={() => setSecondValue(value + 1)}>Second: {value}</button>    </>  );};
```

## Аналог `componentWillUnmount`[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-07/use-effect#%D0%B0%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3-componentwillunmount "Пряме посилання на цей заголовок")

Для того, щоб виконати код при розмонтуванні компонента, або взагалі перед кожним викликом ефекту, повертаємо з useEffect функцію очищення з необхідним кодом. Це і є аналог `componentWillUnmount`. Так можна знімати обробники подій, зупиняти таймери та скасовувати HTTP-запити.

```
const App = () => {  useEffect(() => {    console.log("Mounting phase: same when componentDidMount runs");    return () => {      console.log("Unmounting phase: same when componentWillUnmount runs");    };  }, []);  return null;};
```

## Декілька ефектів[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-07/use-effect#%D0%B4%D0%B5%D0%BA%D1%96%D0%BB%D1%8C%D0%BA%D0%B0-%D0%B5%D1%84%D0%B5%D0%BA%D1%82%D1%96%D0%B2 "Пряме посилання на цей заголовок")

Хуки дозволяють розділити та згрупувати логіку, створивши «ефект» під кожну незалежну операцію.

```
class App extends Component {  handleKeyDown = e => {    console.log("keydown event: ", e);  };  componentDidMount() {    initThirdPartyLibrary();    document.addEventListener("keydown", this.handleKeyDown);  }  componentDidUpdate(prevProps, prevState) {    if (prevProps.value !== this.props.value) {      // Do stuff when value prop changes    }    if (prevState.isLoggedIn !== this.state.isLoggedIn) {      // Do stuff when isLoggedIn state changes    }    if (prevProps.username !== this.props.username) {      // Fetch user when username prop changes      fetchUser(this.props.username);    }  }  componentWillUnmount() {    document.removeEventListener("keydown", this.handleKeyDown);  }}
```

```
const App = () => {  // 1. Run effect only on mount to init some library  useEffect(() => {    initThirdPartyLibrary();  }, []);  // 2. Run effect only when username prop changes  useEffect(() => {    fetchUser(username);  }, [username]);  // 3. Run effect on value prop change  useEffect(() => {    // Do stuff when value prop changes  }, [value]);  // 4. Run effect on isLoggedIn state change  useEffect(() => {    // Do stuff when isLoggedIn state changes  }, [isLoggedIn]);  // 5. Run effect on mount and clean up on unmount  useEffect(() => {    const handleKeyDown = e => console.log("keydown event: ", e);    document.addEventListener("keydown", handleKeyDown);    return () => {      document.removeEventListener("keydown", handleKeyDown);    };  }, []);};
```

#react  #hooks

[[Власні хуки]]

