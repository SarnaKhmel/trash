
[[Компоненти <Link> та <NavLink>]]

Динамічні параметри схожі на параметри функції - у них завжди одна назва, але можуть бути різні значення. Вони дозволяють оголосити шаблон адреси, частини якого можуть мати довільне значення. Наприклад, немає сенсу визначати окремий маршрут для кожного посту у блозі, їх можуть бути тисячі. За структурою контенту такі сторінки будуть ідентичні, а відрізнятиметься лише назва, зображення, автор, текст тощо. Замість того, щоб визначати маршрут для кожної статті, ми можемо оголосити один маршрут з динамічним параметром по якому визначатимемо яку посаду необхідно відображати саме зараз. Для того, щоб вказати, що якась частина адреси це URL-параметр, використовується двокрапка (`:`) перед іменем параметра.

```
<Route path="/blog/:postId" element={<BlogPost />} />
```

Кожного разу, коли користувач буде відвідувати адресу, що відповідає шаблону `/blog/:postId`, наприклад `/blog/react-fundamentals` або `/blog/top-5-css-tricks`, йому відображатиметься сторінка цього поста.

ІМ'Я ПАРАМЕТРА

Ім'я URL-параметра може бути довільним, але воно має значення і має бути зрозумілим та описовим. Далі ми розглянемо, як отримувати значення URL-параметра. Спойлер - по його імені.

Додамо до нашої програми маршрут сторінки одного продукту з адресою `/products/:productId`. Це окрема сторінка, ніяк не прив'язана до `/products` - сторінці відображення всіх продуктів.

App.jsx

```
import { Routes, Route, Link } from "react-router-dom";import Home from "path/to/pages/Home";import About from "path/to/pages/About";import Products from "path/to/pages/Products";import NotFound from "path/to/pages/NotFound";import ProductDetails from "path/to/pages/ProductDetails";export const App = () => {  return (    <div>      <nav>        <Link to="/">Home</Link>        <Link to="/about">About</Link>        <Link to="/products">Products</Link>      </nav>      <Routes>        <Route path="/" element={<Home />} />        <Route path="/about" element={<About />} />        <Route path="/products" element={<Products />} />        <Route path="/products/:productId" element={<ProductDetails />} />        <Route path="*" element={<NotFound />} />      </Routes>    </div>  );};
```

УНІКАЛЬНІСТЬ ЗНАЧЕННЯ

Значення URL-параметра має бути унікальним всередині колекції, тому частіше всього використовують ідентифікатори об'єктів, які встановлює база даних (числа або рядки). Тому адреса може виглядати, наприклад, як `/products/1`, `/proudcts/2` і так далі.

### Хук `useParams`[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-09/url-params#%D1%85%D1%83%D0%BA-useparams "Пряме посилання на цей заголовок")

Повертає об'єкт з усіма динамічними параметрами, які є в поточному URL. Ім'я параметра буде ім'ям властивості в об'єкті, а його поточне значення в адресі - значенням властивості. Наприклад, якщо оголошено наступний маршрут `/books/:genreId/:authorName`, та користувач знаходиться за адресою `/books/adventure/herman-melville`.

```
const { genreId, authorName } = useParams();console.log(genreId, authorName); // adventure, herman-melville
```

Для того, щоб отримати значення динамічної частини URL, у нашому випадку ідентифікатор продукту, використовуємо хук `useParams` у компоненті сторінки продукту.

src/pages/ProductDetails.jsx

```
import { useParams } from "react-router-dom";const ProductDetails = () => {  const { productId } = useParams();  return <div>Now showing product with id - {productId}</div>;};
```

ЩО ДАЛІ?

Маючи значення параметра можна, наприклад, зробити запит на бекенд та отримати повну інформацію про продукт за його ідентифікатором, після чого відрендерити розмітку сторінки.

Розберіть код живого прикладу програми нашого магазину, в якому використовується весь матеріал, який ми з вами розібрали до цього моменту.

#react 

https://codesandbox.io/s/goit-textbook-lesson-9-url-params-grlik3?from-embed

[[Вкладені маршрути]]
