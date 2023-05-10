[[Інструменти]]

```
const link = <a href="https://reactjs.org/">React website</a>;
```

Це не рядок і не HTML, цей XML-образний синтаксис називається `JSX` (JavaScript Syntax Extension) - розширення синтаксису JavaScript, за допомогою якого зручно описувати розмітку того, що ми хочемо побачити на екрані.

-   Дозволяє використовувати XML-образний синтаксис прямо у JavaScript
-   Спрощує код, робить його декларативним та читабельним
-   Описує об'єкти - елементи Virtual DOM
-   Це не HTML, Babel трансформує JSX у виклики функцій
-   У JSX можна використовувати всі можливості JavaScript

REACT ЕЛЕМЕНТИ

JSX створює елементи – найменші будівельні блоки React. Елементи Virtual DOM це звичайні JavaScript об'єкти, тому створювати їх дуже швидко.

Використовуючи `JSX`, розмітка стає схожою на звичні HTML-шаблони.

src/index.js

```
const imageUrl =  "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640";const productPrice = 10.99;const product = (  <div>    <img src={imageUrl} alt="Tacos With Lime" width="640" />    <h2>Tacos With Lime</h2>    <p>Price: {productPrice}$</p>    <button type="button">Add to cart</button>  </div>);
```

-   Усередині JSX можна використовувати будь-який валідний вираз, обертаючи його в фігурні дужки.
-   Значення атрибутів вказуються в подвійних лапках, якщо це звичайний рядок, та у фігурних дужках, якщо значення обчислюється, або тип відрізняється від рядка.
-   Всі атрибути React-елементів іменуються в camelCase нотації.
-   JSX-теги можуть бути батьками інших JSX-тегів. Якщо тег порожній або самозакривається, його обов'язково необхідно закрити використовуючи `/>`.

## Рендер елементів у DOM-дерево[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-01/jsx#%D1%80%D0%B5%D0%BD%D0%B4%D0%B5%D1%80-%D0%B5%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D1%96%D0%B2-%D1%83-dom-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BE "Пряме посилання на цей заголовок")

Для того, щоб відрендерувати елемент у DOM-дерево, у пакеті `react-dom` є методи `createRoot(container)` та `render(element)`, які працюють разом.

-   Перший приймає посилання на існуючий DOM-елемент, наприклад `div#root` з `index.html` і створює корінь, в який буде рендеруватись вся програма.
-   Другий чекає на посилання на React-елемент або компонент (що рендерити).

src/index.js

```
import ReactDOM from "react-dom/client";const imageUrl =  "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640";const productPrice = 10.99;const product = (  <div>    <img src={imageUrl} alt="Tacos With Lime" width="640" />    <h2>Tacos With Lime</h2>    <p>Price: {productPrice}$</p>    <button type="button">Add to cart</button>  </div>);ReactDOM.createRoot(document.getElementById("root")).render(product);
```

ОДИН `render()` НА ПРОГРАМУ

React використовує модель відносин предок - нащадок, тому достатньо використовувати лише один виклик `render()` в програмі. Рендер найвищого елемента в ієрархії потягне за собою рендер всього піддерева.

## Правило спільного батька[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-01/jsx#%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%BE-%D1%81%D0%BF%D1%96%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE-%D0%B1%D0%B0%D1%82%D1%8C%D0%BA%D0%B0 "Пряме посилання на цей заголовок")

Права частина висловлювання присвоювання має повертати одне значення. Розберемо наступний код із невалідною JSX-розміткою.

```
const post = (  <h2>Post Header</h2>  <p>Post text</p>);
```

Вираз це одне значення, результат деяких обчислень, звідси випливає правило спільного батька.

```
const post = (  <div>    <h2>Post Header</h2>    <p>Post text</p>  </div>);
```

Якщо в розмітці зайвий тег-обгортка не потрібний, використовуються фрагменти, схожі на `DocumentFragment`. Цей вбудований компонент при рендері розчиняється, підставляючи свій вміст.

```
import { Fragment } from "react";const post = (  <Fragment>    <h2>Post Header</h2>    <p>Post text</p>  </Fragment>);
```

Синтаксис фрагментів можна скоротити та не додавати імпорт `Fragment`. Babel зробить всі необхідні трансформації, замінивши порожні JSX-теги на `React.Fragment`.

```
const post = (  <>    <h2>Post Header</h2>    <p>Post text</p>  </>);
```

## Додаткові матеріали[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-01/jsx#%D0%B4%D0%BE%D0%B4%D0%B0%D1%82%D0%BA%D0%BE%D0%B2%D1%96-%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D1%96%D0%B0%D0%BB%D0%B8 "Пряме посилання на цей заголовок")

-   [Знайомство з JSX](https://reactjs.org/docs/introducing-jsx.html)
-   [Відмінності в атрибутах](https://reactjs.org/docs/dom-elements.html#differences-in-attributes)
-   [Рендеринг елементів](https://reactjs.org/docs/rendering-elements.html)

#react #jsx

[[Компоненти]]

 


