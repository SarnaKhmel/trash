# Критерії приймання

Використовуй цей [шаблон React-проекту](https://github.com/goitacademy/react-homework-template#readme) як стартову точку своєї програми.

-   Створені репозиторії `goit-react-hw-03-phonebook` і `goit-react-hw-03-image-finder`
-   При здачі домашньої роботи є посилання: на вихідні файли та робочу сторінку проектів на `GitHub Pages`.
-   У стані компонентів зберігається мінімально необхідний набір даних, решта обчислюється
-   Під час запуску коду завдання в консолі відсутні помилки та попередження.
-   Для кожного компонента є окрема папка з файлом React-компонента та файлом стилів
-   Для компонентів описані `propTypes`
-   Все, що компонент очікує у вигляді пропсів, передається йому під час виклику.
-   Імена компонентів зрозумілі та описові
-   JS-код чистий і зрозумілий, використовується `Prettier`.
-   Стилізація виконана `CSS-модулями` або `Styled Components`.

## 1 - Книга контактів[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-03/#1---%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0-%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D1%96%D0%B2 "Пряме посилання на цей заголовок")

Візьми своє рішення завдання з попередньої домашньої роботи і додай зберігання контактів телефонної книги в `localStorage`. Використовуй методи життєвого циклу.

-   Під час додавання та видалення контакту контакти зберігаються у локальне сховище.
-   Під час завантаження застосунку контакти, якщо такі є, зчитуються з локального сховища і записуються у стан.

## 2 - Пошук зображень[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-03/#2---%D0%BF%D0%BE%D1%88%D1%83%D0%BA-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D1%8C "Пряме посилання на цей заголовок")

Напиши застосунок пошуку зображень за ключовим словом. Прев'ю робочого застосунку [дивись за посиланням](https://drive.google.com/file/d/1oXCGyiq4uKwW0zzraZLKk4lh3voBlBzZ/view?usp=sharing).

Створи компоненти `<Searchbar>`, `<ImageGallery>`, `<ImageGalleryItem>`, `<Loader>`, `<Button>` і `<Modal>`. Готові стилі компонентів можна взяти у файлі [styles.css](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/goitacademy/react-homework/blob/master/homework-03/image-finder/styles.css) і підправити під себе, якщо потрібно.

![component preview](https://textbook.edu.goit.global/lms-react-homework/v1/uk/img/hw-03/image-finder.jpg)

### Інструкція Pixabay API[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-03/#%D1%96%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%86%D1%96%D1%8F-pixabay-api "Пряме посилання на цей заголовок")

Зареєструйся та отримай приватний ключ доступу. Для HTTP-запитів використовуй публічний сервіс пошуку зображень [Pixabay](https://pixabay.com/api/docs/).

URL-рядок HTTP-запиту.

```
https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
```

Pixabay API підтримує пагінацію, за замовчуванням параметр `page` дорівнює `1`. Нехай у відповіді надходить по 12 об'єктів, встановлено в параметрі `per_page`. Не забудь, що під час пошуку за новим ключовим словом, необхідно скидати значення `page` до `1`.

У відповіді від апі приходить масив об'єктів, в яких тобі цікаві лише наступні властивості.

-   `id` - унікальний ідентифікатор
-   `webformatURL` - посилання на маленьке зображення для списку карток
-   `largeImageURL` - посилання на велике зображення для модального вікна

### Опис компонента `<Searchbar>`[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-03/#%D0%BE%D0%BF%D0%B8%D1%81-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0-searchbar "Пряме посилання на цей заголовок")

Компонент приймає один проп `onSubmit` – функцію для передачі значення інпута під час сабміту форми. Створює DOM-елемент наступної структури.

```
<header class="searchbar">  <form class="form">    <button type="submit" class="button">      <span class="button-label">Search</span>    </button>    <input      class="input"      type="text"      autocomplete="off"      autofocus      placeholder="Search images and photos"    />  </form></header>
```

### Опис компонента `<ImageGallery>`[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-03/#%D0%BE%D0%BF%D0%B8%D1%81-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0-imagegallery "Пряме посилання на цей заголовок")

Список карток зображень. Створює DOM-елемент наступної структури.

```
<ul class="gallery">  <!-- Набір <li> із зображеннями --></ul>
```

### Опис компонента `<ImageGalleryItem>`[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-03/#%D0%BE%D0%BF%D0%B8%D1%81-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0-imagegalleryitem "Пряме посилання на цей заголовок")

Компонент елемента списку із зображенням. Створює DOM-елемент наступної структури.

```
<li class="gallery-item">  <img src="" alt="" /></li>
```

### Опис компонента `<Button>`[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-03/#%D0%BE%D0%BF%D0%B8%D1%81-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0-button "Пряме посилання на цей заголовок")

При натисканні на кнопку `Load more` повинна довантажуватись наступна порція зображень і рендеритися разом із попередніми. Кнопка повинна рендеритися лише тоді, коли є якісь завантажені зображення. Якщо масив зображень порожній, кнопка не рендериться.

### Опис компонента `<Loader>`[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-03/#%D0%BE%D0%BF%D0%B8%D1%81-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0-loader "Пряме посилання на цей заголовок")

Компонент спінера відображається, доки відбувається завантаження зображень. Використовуйте будь-який готовий компонент, наприклад [react-loader-spinner](https://github.com/mhnpd/react-loader-spinner) або будь-який інший.

### Опис компонента `<Modal>`[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-03/#%D0%BE%D0%BF%D0%B8%D1%81-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0-modal "Пряме посилання на цей заголовок")

Під час кліку на елемент галереї повинно відкриватися модальне вікно з темним оверлеєм і відображатися велика версія зображення. Модальне вікно повинно закриватися по натисканню клавіші `ESC` або по кліку на оверлеї.

Зовнішній вигляд схожий на функціонал цього [VanillaJS-плагіна](https://basiclightbox.electerious.com/), тільки замість білого модального вікна рендериться зображення (у прикладі натисніть `Run`). Анімацію робити не потрібно!

```
<div class="overlay">  <div class="modal">    <img src="" alt="" />  </div></div>
```