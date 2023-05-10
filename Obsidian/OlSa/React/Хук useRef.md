[[Контекст та useContext]]

Рефи дозволяють отримати прямий доступ до DOM-вузлів або React-елементів із шаблону компонента. Вони використовуються якщо необхідно звернутися до імперативних методів та властивостям елемента.

-   Фокус елемент під час події, виділення тексту
-   Контроль програвання медіаконтенту
-   Інтеграція з DOM-бібліотеками
-   Доступ до DOM-властивостей, значення яких неможливо отримати по-іншому - розміри елемента, значення скрола тощо.

## Створення[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-08/user-ref#%D1%81%D1%82%D0%B2%D0%BE%D1%80%D0%B5%D0%BD%D0%BD%D1%8F "Пряме посилання на цей заголовок")

Рефи створюються хуком `useRef()` та прив'язані до React-елементів за допомогою атрибуту `ref` (скорочення від reference), який зберігатиме посилання на DOM-елемент.

```
import { useRef } from "react";const App = () => {  const btnRef = useRef();  return <button ref={btnRef}>Button with ref</button>;};
```

## Життєвий цикл рефа[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-08/user-ref#%D0%B6%D0%B8%D1%82%D1%82%D1%94%D0%B2%D0%B8%D0%B9-%D1%86%D0%B8%D0%BA%D0%BB-%D1%80%D0%B5%D1%84%D0%B0 "Пряме посилання на цей заголовок")

React надає властивості `current` посилання на DOM-елемент коли компонент монтується та `null` при розмонтуванні, тому значення рефа доступне тільки **після монтування**.

```
import { useState, useRef } from "react";const App = () => {  const [value, setValue] = useState(0);  const btnRef = useRef();  // Буде null на першому рендері  // і посиланням на DOM-елемент всі наступні  console.log(btnRef.current);  useEffect(() => {    // Ефект виконується після монтування,    // тому завжди буде посиланням на DOM-елемент    console.log(btnRef.current);  });  const handleClick = () => {    // Кліки будуть після монтування,    // тому завжди буде посиланням на DOM-елемент    console.log(btnRef.current);  };  return (    <>      <button onClick={() => setValue(value + 1)}>        Update value to trigger re-render      </button>      <button ref={btnRef} onClick={handleClick}>        Button with ref      </button>    </>  );};
```

## Відсутність реактивності[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-08/user-ref#%D0%B2%D1%96%D0%B4%D1%81%D1%83%D1%82%D0%BD%D1%96%D1%81%D1%82%D1%8C-%D1%80%D0%B5%D0%B0%D0%BA%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D1%81%D1%82%D1%96 "Пряме посилання на цей заголовок")

Рефи це не стан, тобто вони не реактивні, тому зміна значення рефа не впливає на оновлення компонента і не викликає ре-рендер.

```
import { useEffect, useRef } from "react";const App = () => {  const valueRef = useRef(0);  useEffect(() => {    // Виконається лише один раз під час монтування.    // Наступні оновлення значення рефа не    // викличуть оновлення компонента    console.log(valueRef.current);  });  const handleClick = () => {    valueRef.current += 1;  };  return <button onClick={handleClick}>Click to update ref value</button>;};
```

ПОЧАТКОВЕ ЗНАЧЕННЯ

Рефи також можна використовувати як сховище довільних значень, які не змінюються між рендерами компонента та на нього не впливають. Тому в прикладі хуку `useRef` передано початкове значення якості `current` - число 0. Ця можливість використовується для класу завдань при створенні складніших компонентів.

```
const valueRef = useRef(0);
```

## Простий відеоплеєр[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-08/user-ref#%D0%BF%D1%80%D0%BE%D1%81%D1%82%D0%B8%D0%B9-%D0%B2%D1%96%D0%B4%D0%B5%D0%BE%D0%BF%D0%BB%D0%B5%D1%94%D1%80 "Пряме посилання на цей заголовок")

Створимо компонент `Player` для програвання відео, використовуючи нативний тег `<video>`. Щоб запустити та зупинити програвання необхідно викликати методи `HTMLMediaElement.play()` та `HTMLMediaElement.pause()`, де `HTMLMediaElement` це елемент `<video>`. Використовуємо реф для отримання доступу до DOM-елементу та його методам.

```
import { useRef } from "react";const Player = ({ source }) => {  const playerRef = useRef();  const play = () => playerRef.current.play();  const pause = () => playerRef.current.pause();  return (    <div>      <video ref={playerRef} src={source}>        Sorry, your browser does not support embedded videos.      </video>      <div>        <button onClick={play}>Play</button>        <button onClick={pause}>Pause</button>      </div>    </div>  );};const App = () => {  return <Player source="http://media.w3.org/2010/05/sintel/trailer.mp4" />;};
```

## Перенаправлення рефів[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-08/user-ref#%D0%BF%D0%B5%D1%80%D0%B5%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F-%D1%80%D0%B5%D1%84%D1%96%D0%B2 "Пряме посилання на цей заголовок")

При використанні рефів на компоненті, проп `ref` не передається автоматично. Це створює проблеми у випадку коли ми хочемо отримати `ref` на елемент усередині самого компонента, а не на сам компонент. Функція `forwardRef` автоматично передає пропси, отримані батьківським компонентом його дочірнім елементам.

```
import { forwardRef, useRef, useEffect } from "react";const CustomButton = forwardRef((props, ref) => (  <button ref={ref}>{props.children}</button>));const App = () => {  const btnRef = useRef();  useEffect(() => btnRef.current.focus(), []);  return <CustomButton ref={btnRef}>Button with forwarded ref</CustomButton>;};
```

Такий підхід дозволяє отримати посилання у батьківському компоненті на DOM-елемент усередині іншого компонента. Наприклад, ви створюєте галерею, так можна отримати посилання на DOM-елементи поза них і працювати з їх властивостями, наприклад використовувати метод `Element.getBoundingClientRect()` і тому подібне.

#react #hooks 

[[Хук useMemo]]
