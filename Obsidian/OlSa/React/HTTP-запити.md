[[Життєвий цикл]]

Припустимо, що вже є дерево компонентів, яке має кілька рівнів ієрархії, і необхідно отримати колекцію елементів від API. Який саме компонент в ієрархії повинен відповідати за HTTP-запити і зберігання результату відповіді? Якщо не використовуємо бібліотеку управління станом, то це залежить від трьох критеріїв.

-   Яким компонентам будуть необхідні отримані дані?
-   Де буде рендеритися індикатор завантаження, доки виконується HTTP-запит?
-   Де буде рендеритися повідомлення у разі помилки HTTP-запиту?

Методи життєвого циклу `componentDidMount` та `componentDidUpdate` ідеально підходять для HTTP-запитів. Коли викликається `componentDidMount()`, компонент вже був відрендерений у DOM і готовий до подальшого оновлення стану. Коли викликається `componentDidUpdate()`, пропи або стан компонента змінилися, і, можливо, необхідно зробити новий запит, попередньо порівнявши їх, щоб не зациклити рендер компонента.

Для HTTP-запиту можна використовувати будь-що: `XMLHTTPRequest`, `fetch`, `axios`, `superagent` тощо. Ми будемо використовувати бібліотеку [axios](https://github.com/axios/axios#axios).

```
npm install axios
```

Запити будемо робити на [Hacker News API](https://hn.algolia.com/api). Після завершення HTTP-запиту зберігаємо результат у стані компонента. У методі `render` використовуємо стан.

```
import React, { Component } from "react";import axios from "axios";axios.defaults.baseURL = "https://hn.algolia.com/api/v1";const ArticleList = ({ articles }) => (  <ul>    {articles.map(({ objectID, url, title }) => (      <li key={objectID}>        <a href={url} target="_blank" rel="noreferrer noopener">          {title}        </a>      </li>    ))}  </ul>);class App extends Component {  state = {    articles: [],  };  async componentDidMount() {    const response = await axios.get("/search?query=react");    this.setState({ articles: response.data.hits });  }  render() {    const { articles } = this.state;    return (      <div>        articles.length > 0 ? <ArticleList articles={articles} /> : null      </div>    );  }}
```

Крім поля зберігання даних, можна додати поле для зберігання прапорця індикатора завантаження і помилки. Це дозволить зробити використання інтерфейсу приємнішим для користувача.

## Індикатор завантаження[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-06/http#%D1%96%D0%BD%D0%B4%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%80-%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F "Пряме посилання на цей заголовок")

Доки чекаємо на відповідь на HTTP-запит, показуємо індикатор завантаження. Щойно надійшла відповідь, ховаємо індикатор. Для цього, на старті запиту ставимо `isLoading` – `true`, а у разі успішної відповіді або помилки – `false`.

```
/* ... */class App extends Component {  state = {    articles: [],    isLoading: false,  };  async componentDidMount() {    this.setState({ isLoading: true });    const response = await axios.get("/search?query=react");    this.setState({      articles: response.data.hits,      isLoading: false,    });  }  /* ... */}
```

В методі `render` за умовою повертаємо розмітку. Якщо дані завантажуються, показуємо лоадер, в іншому випадку – список з результатами.

```
/* ... */class App extends Component {  /* ... */  render() {    const { articles, isLoading } = this.state;    return (      <div>        isLoading ? <p>Loading...</p> : <ArticleList articles={articles} />      </div>    );  }}
```

Індикатор завантаження може бути будь-чим: від простого тексту або спінера до кастомного компонента, наприклад [react-content-loader](https://github.com/danilowoz/react-content-loader).

## Обробка помилки[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-06/http#%D0%BE%D0%B1%D1%80%D0%BE%D0%B1%D0%BA%D0%B0-%D0%BF%D0%BE%D0%BC%D0%B8%D0%BB%D0%BA%D0%B8 "Пряме посилання на цей заголовок")

HTTP-запит не завжди виконується без помилок, тому користувачеві обов'язково потрібно дати зрозуміти, якщо щось пішло не так. Для цього у стан додаємо властивість зберігання помилки.

При використанні промісів для обробки помилок використовується блок `catch`, якщо він виконається, значить, сталася помилка. Встановлення індикатора завантаження переносимо в блок `finally`, щоб не дублювати код, який буде виконаний в будь-якому випадку.

```
/* ... */class App extends Component {  state = {    articles: [],    isLoading: false,    error: null,  };  async componentDidMount() {    this.setState({ isLoading: true });    try {      const response = await axios.get("/search?query=react");      this.setState({ articles: response.data.hits });    } catch (error) {      this.setState({ error });    } finally {      this.setState({ isLoading: false });    }  }  /* ... */}
```

Залишилось доповнити метод `render`.

```
/* ... */class App extends Component {  /* ... */  render() {    const { articles, isLoading, error } = this.state;    return (      <div>        {error && <p>Whoops, something went wrong: {error.message}</p>}        {isLoading && <p>Loading...</p>}        {articles.length > 0 && <ArticleList articles={articles} />}      </div>    );  }}
```

## Поділ відповідальності[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-06/http#%D0%BF%D0%BE%D0%B4%D1%96%D0%BB-%D0%B2%D1%96%D0%B4%D0%BF%D0%BE%D0%B2%D1%96%D0%B4%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%96 "Пряме посилання на цей заголовок")

Зберігати код, пов'язаний з HTTP-запитом, безпосередньо в компоненті – не найкраща практика. У застосунку буде багато різних запитів до API і вони будуть використовуватися у різних компонентах. До того ж код HTTP-запитів може бути складним та громіздким. Для зручності рефакторингу будемо все зберігати в одному місці.

Створимо додаткову папку всередині `src`. Назва папки довільна, але логічна, наприклад `helpers`, `api`, `services` тощо. У цій папці будемо зберігати файл з функціями для HTTP-запитів.

```
// services/api.jsimport axios from "axios";export const fetchArticlesWithQuery = async searchQuery => {  const response = axios.get(`/search?query=${searchQuery}`);  return response.data.hits;};export default {  fetchArticlesWithQuery,};
```

Імпортуємо сервіс у файлі компонента та викликаємо потрібний метод.

```
/* ... */import api from "./path/to/services/api";class App extends Component {  state = {    articles: [],    isLoading: false,    error: null,  };  async componentDidMount() {    this.setState({ isLoading: true });    try {      const articles = api.fetchArticlesWithQuery("react");      this.setState({ articles });    } catch (error) {      this.setState({ error });    } finally {      this.setState({ isLoading: false });    }  }  /* ... */}
```

#react 

[[Вступ. Хуки]]
