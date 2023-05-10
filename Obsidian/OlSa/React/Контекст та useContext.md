[[Власні хуки]]

Дані передаються зверху вниз через пропси, але це може бути незручно для певних глобальних даних, які потрібні багатьом компонентам на різних рівнях у додатку (локалізація, тема оформлення, стан авторизації та ін.).

![props-context](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/img/extras/props-context.png)

Контекст забезпечує спосіб передачі даних глибоко по дереву компонентів без необхідності явно передавати пропси в проміжні компоненти вручну на кожному рівні.

УВАГА

Не використовуйте контекст, щоб уникнути передачі пропсів на кілька рівнів вниз. Цей механізм призначений для вузького спектра завдань.

[Документація Context API](https://reactjs.org/docs/context.html)

## Функція `createContext()`[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-08/context#%D1%84%D1%83%D0%BD%D0%BA%D1%86%D1%96%D1%8F-createcontext "Пряме посилання на цей заголовок")

```
import { createContext } from "react";const MyContext = createContext(defaultValue);
```

-   Створює об'єкт контексту, що містить пару компонентів: `<Context.Provider>` (постачальник) та `<Context.Consumer>` (споживач).
-   Під час рендеру, споживач прочитає поточне значення контексту з найближчого відповідного постачальника вище у дереві компонентів.
-   Аргумент `defaultValue` використовується споживачем, якщо в нього немає відповідного постачальника над ним у дереві. На практиці можна не вказувати, тому що немає сенсу намагатися отримати доступ до контексту якого немає.

## Компонент `<Provider>`[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-08/context#%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82-provider "Пряме посилання на цей заголовок")

Дозволяє споживачам підписуватись на зміни контексту. Використовується для створення та передачі контексту.

```
import { createContext } from "react";import ReactDOM from "react-dom/client";const MyContext = createContext(defaultValue);ReactDOM.createRoot(document.getElementById("root")).render(  <MyContext.Provider value={/* context value */}>    <App />  </MyContext.Provider>);
```

-   Приймає проп `value` - значення контексту, яке буде передано нащадкам-споживачам цього контексту.
-   Дозволяє споживачам підписуватись на зміни контексту незалежно від глибини вкладеності.
-   Один провайдер може бути пов'язаний із багатьма споживачами.
-   Провайдери можуть бути вкладені один в одного.

## Хук `useContext()`[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-08/context#%D1%85%D1%83%D0%BA-usecontext "Пряме посилання на цей заголовок")

Дозволяє отримати доступ до поточного значення контексту. Отримує поточний контекст із найближчого порівнянного `<Provider>` вище у дереві.

```
import { createContext, useContext } from "react";const MyContext = createContext();const contextValue = useContext(MyContext);
```

-   Очікує єдиний аргумент – посилання на створений контекст.
-   Поверне значення контексту найближчого провайдера для цього контексту вище дереві.
-   Щоразу, коли оновиться значення контексту, залежний компонент ре-рендерується з новим значенням.

### Кастомний хук контексту[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-08/context#%D0%BA%D0%B0%D1%81%D1%82%D0%BE%D0%BC%D0%BD%D0%B8%D0%B9-%D1%85%D1%83%D0%BA-%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%BA%D1%81%D1%82%D1%83 "Пряме посилання на цей заголовок")

Щоразу імпортувати посилання на об'єкт контексту не зручно. Тому робиться кастомний хук для доступу до контексту.

```
import { createContext, useContext } from "react";const MyContext = createContext();// Імпортуємо та використовуємо цей хук у компонентахexport const useMyContext = () => useContext(MyContext);
```

## Контекст користувача[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-08/context#%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%BA%D1%81%D1%82-%D0%BA%D0%BE%D1%80%D0%B8%D1%81%D1%82%D1%83%D0%B2%D0%B0%D1%87%D0%B0 "Пряме посилання на цей заголовок")

Напишемо контекст для зберігання інформації про поточний стан користувача - статусу логіну та особистої інформації.

userContext.js

```
import { createContext, useContext } from "react";export const UserContext = createContext();export const useUser = () => useContext(UserContext);
```

Обертаємо провайдером все дерево компонентів. Це можна зробити у компоненті `App` або прямо в головному файлі `index.js`.

index.js

```
import { UserContext } from "path/to/userContext.js";ReactDOM.createRoot(document.getElementById("root")).render(  <UserContext.Provider value={{ username: "Mango" }}>    <App />  </UserContext.Provider>);
```

Додамо компонент меню користувача вкладений у `<App>`, у ньому будемо отримувати значення контексту та відображати ім'я користувача.

App.jsx

```
import { UserMenu } from "path/to/UserMenu";const App = () => {  return (    <div>      <UserMenu />    </div>  );};
```

Використовуємо наш кастомний хук `useUser` для доступу до значення контексту.

UserMenu.jsx

```
import { useUser } from "path/to/userContext.js";export const UserMenu = () => {  const { username } = useUser();  return (    <div>      <p>{username}</p>    </div>  );};
```

## Кастомний компонент провайдера[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-08/context#%D0%BA%D0%B0%D1%81%D1%82%D0%BE%D0%BC%D0%BD%D0%B8%D0%B9-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82-%D0%BF%D1%80%D0%BE%D0%B2%D0%B0%D0%B9%D0%B4%D0%B5%D1%80%D0%B0 "Пряме посилання на цей заголовок")

Нині значення контексту не динамічне. Користувач може зареєструватися і розлогінітися, зберігатимемо це в стані компонента. Крім цього необхідні методи його зміни. Створимо кастомний компонент провайдера `<UserProvider>` в якому закриємо логіку роботи зі станом.

userContext.jsx

```
import { createContext, useContext, useState } from "react";const UserContext = createContext();export const useUser = () => useContext(UserContext);export const UserProvider = ({ children }) => {  const [isLoggedIn, setIsLoggedIn] = useState(false);  const [username, setUsername] = useState(null);  const logIn = () => {    setIsLoggedIn(true);    setUsername("Mango");  };  const logOut = () => {    setIsLoggedIn(false);    setUsername(null);  };  return (    <UserContext.Provider value={{ isLoggedIn, username, logIn, logOut }}>      {children}    </UserContext.Provider>  );};
```

Обертаємо все дерево компонентів кастомним провайдером. Це можна зробити в компоненті `App` або прямо в головному файлі `index.js`.

index.js

```
import { UserProvider } from "path/to/userContext";ReactDOM.createRoot(document.getElementById("root")).render(  <UserProvider>    <App />  </UserProvider>);
```

У компоненті `<App>` все також рендерується компонент меню користувача.

App.jsx

```
import { UserMenu } from "path/to/UserMenu";const App = () => {  return (    <div>      <UserMenu />    </div>  );};
```

Використовуємо `useUser` для доступу до значення контексту користувача.

UserMenu.jsx

```
import { useUser } from "path/to/userContext";export const UserMenu = () => {  const { isLoggedIn, username, logIn, logOut } = useUser();  return (    <div>      {isLoggedIn && <p>{username}</p>}      {isLoggedIn ? (        <button onClick={logOut}>Log out</button>      ) : (        <button onClick={logIn}>Log in</button>      )}    </div>  );};
```

ВСЕ РАЗОМ

Результат усіх кроків побудови контексту користувача можна переглянути в живому прикладі.

https://codesandbox.io/s/goit-react-lesson-8-usecontext-t6ndci?from-embed


#react #hooks 

[[Хук useRef]]
