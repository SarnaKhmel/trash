# Критерії приймання

Використовуй цей [шаблон React-проекту](https://github.com/goitacademy/react-homework-template#readme) як стартову точку своєї програми.

-   Створений репозиторій `goit-react-hw-01-components`.
-   Компоненти всіх завдань рендеряться на одній сторінці, всередині загального контейнера - кореневого компонента `<App>`.
-   При здачі домашньої роботи є посилання на репозиторій з вихідним кодом проекту.
-   У шапці репозиторія є посилання на живу сторінку на `GitHub pages`.
-   Під час відвідування робочої сторінки (GitHub pages) завдання, в консолі відсутні помилки і попередження.
-   Для кожного компонента є окрема папка з файлом React-компонента та файлом стилів.
-   Для всіх компонентів описані `propTypes`.
-   Все, що компонент очікує у вигляді пропсів, передається йому під час виклику.
-   Імена компонентів зрозумілі та описові.
-   JS-код чистий та зрозумілий, використовується `Prettier`.
-   Стилізація виконана `CSS-модулями` або `Styled Components`, тому класи в результуючому DOM відрізнятимуться від прикладів.
-   Достатньо базової стилізації застосунку, насамперед він повинен працювати, а вже потім бути гарним. Приділяй 20% часу на CSS і 80% на JS.

## 1 - Профіль соціальної мережі[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-01/#1---%D0%BF%D1%80%D0%BE%D1%84%D1%96%D0%BB%D1%8C-%D1%81%D0%BE%D1%86%D1%96%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%97-%D0%BC%D0%B5%D1%80%D0%B5%D0%B6%D1%96 "Пряме посилання на цей заголовок")

Необхідно створити компонент `<Profile>`, за допомогою якого ми могли б відображати інформацію про користувача соціальної мережі. Дані про користувача лежать у файлі [user.json](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/goitacademy/react-homework/blob/master/homework-01/social-profile/user.json).

![component preview](https://textbook.edu.goit.global/lms-react-homework/v1/uk/img/hw-01/social-profile.png)

### Опис компонента `<Profile>`[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-01/#%D0%BE%D0%BF%D0%B8%D1%81-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0-profile "Пряме посилання на цей заголовок")

Компонент повинен приймати кілька пропсів з інформацією про користувача:

-   `username` — ім'я користувача
-   `tag` — тег в соціальній мережі без `@`
-   `location` — місто і країна
-   `avatar` — посилання на зображення
-   `stats` — об'єкт з інформацією про активності

Компонент повинен створювати DOM елемент наступної структури.

```
<div class="profile">  <div class="description">    <img      src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"      alt="User avatar"      class="avatar"    />    <p class="name">Petra Marica</p>    <p class="tag">@pmarica</p>    <p class="location">Salvador, Brasil</p>  </div>  <ul class="stats">    <li>      <span class="label">Followers</span>      <span class="quantity">1000</span>    </li>    <li>      <span class="label">Views</span>      <span class="quantity">2000</span>    </li>    <li>      <span class="label">Likes</span>      <span class="quantity">3000</span>    </li>  </ul></div>
```

### Приклад використання[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-01/#%D0%BF%D1%80%D0%B8%D0%BA%D0%BB%D0%B0%D0%B4-%D0%B2%D0%B8%D0%BA%D0%BE%D1%80%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D0%BD%D1%8F "Пряме посилання на цей заголовок")

```
import user from 'path/to/user.json;<Profile  username={user.username}  tag={user.tag}  location={user.location}  avatar={user.avatar}  stats={user.stats}/>
```

## 2- Секція статистики[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-01/#2--%D1%81%D0%B5%D0%BA%D1%86%D1%96%D1%8F-%D1%81%D1%82%D0%B0%D1%82%D0%B8%D1%81%D1%82%D0%B8%D0%BA%D0%B8 "Пряме посилання на цей заголовок")

Створити компонент `<Statistics>`, який би відображав статистику з переданих пропсів. Наприклад, завантаження у хмару за типом файлів, відвідування веб-сторінки користувачами різних країн, фінансові витрати тощо. Дані про статистику лежать у файлі [data.json](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/goitacademy/react-homework/blob/master/homework-01/statistics/data.json).

![component preview](https://textbook.edu.goit.global/lms-react-homework/v1/uk/img/hw-01/statistics.jpg)

### Опис компонента `<Statistics>`[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-01/#%D0%BE%D0%BF%D0%B8%D1%81-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0-statistics "Пряме посилання на цей заголовок")

Компонент повинен приймати два пропи `title` і `stats`, в яких вказується заголовок та об'єкт статистики.

-   `title` – не обов'язковий, і якщо він не переданий, не повинна рендеритись розмітка заголовка `<h2>`.
-   `stats` – масив об'єктів, що містять інформацію про елемент статистики. Може мати довільну кількість елементів.
-   Колір фону елемента статистики в оформленні можна пропустити або створити функцію для генерації випадкового кольору.

Компонент повинен створювати DOM елемент наступної структури.

```
<section class="statistics">  <h2 class="title">Upload stats</h2>  <ul class="stat-list">    <li class="item">      <span class="label">.docx</span>      <span class="percentage">4%</span>    </li>    <li class="item">      <span class="label">.mp3</span>      <span class="percentage">14%</span>    </li>    <li class="item">      <span class="label">.pdf</span>      <span class="percentage">41%</span>    </li>    <li class="item">      <span class="label">.mp4</span>      <span class="percentage">12%</span>    </li>  </ul></section>
```

### Приклад використання[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-01/#%D0%BF%D1%80%D0%B8%D0%BA%D0%BB%D0%B0%D0%B4-%D0%B2%D0%B8%D0%BA%D0%BE%D1%80%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D0%BD%D1%8F-1 "Пряме посилання на цей заголовок")

```
import data from '/path/to/data.json';<Statistics title="Upload stats" stats={data} /><Statistics stats={data} />
```

## 3 - Список друзів[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-01/#3---%D1%81%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%B4%D1%80%D1%83%D0%B7%D1%96%D0%B2 "Пряме посилання на цей заголовок")

Необхідно створити компонент `<FriendList>`, за допомогою якого ми могли б відображати інформацію про друзів користувача. Інформація про друзів зберігається у файлі [friends.json](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/goitacademy/react-homework/blob/master/homework-01/friend-list/friends.json).

![component preview](https://textbook.edu.goit.global/lms-react-homework/v1/uk/img/hw-01/friend-list.jpg)

![[Pasted image 20230502182808.png]]
### Опис компонента `<FriendList>`[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-01/#%D0%BE%D0%BF%D0%B8%D1%81-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0-friendlist "Пряме посилання на цей заголовок")

Компонент повинен приймати один проп `friends` – масив об'єктів друзів.

Компонент повинен створювати DOM наступної структури.

```
<ul class="friend-list">  <!-- Довільна кіл-сть FriendListItem --></ul>
```

### Опис компонента `<FriendListItem>`[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-01/#%D0%BE%D0%BF%D0%B8%D1%81-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0-friendlistitem "Пряме посилання на цей заголовок")

Компонент повинен приймати кілька пропів:

-   `avatar` - посилання на аватар
-   `name` - ім'я друга
-   `isOnline` - буль, що сигналізує про стан друга: в мережі або ні.

Залежно від пропа `isOnline`, повинен змінюватися колір фону `span.status`. Це можна зробити за допомогою різних CSS-класів або Styled Components.

Компонент повинен створювати DOM наступної структури.

```
<li class="item">  <span class="status"></span>  <img class="avatar" src="" alt="User avatar" width="48" />  <p class="name"></p></li>
```

### Приклад використання[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-01/#%D0%BF%D1%80%D0%B8%D0%BA%D0%BB%D0%B0%D0%B4-%D0%B2%D0%B8%D0%BA%D0%BE%D1%80%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D0%BD%D1%8F-2 "Пряме посилання на цей заголовок")

```
import friends from 'path/to/friends.json';<FriendList friends={friends} />;
```

## 4 - Історія транзакцій[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-01/#4---%D1%96%D1%81%D1%82%D0%BE%D1%80%D1%96%D1%8F-%D1%82%D1%80%D0%B0%D0%BD%D0%B7%D0%B0%D0%BA%D1%86%D1%96%D0%B9 "Пряме посилання на цей заголовок")

Необхідно створити компонент історії транзакцій в особистому кабінеті інтернет-банку.

![component preview](https://textbook.edu.goit.global/lms-react-homework/v1/uk/img/hw-01/transactions.jpg)

Дані для списку доступні у форматі JSON у файлі [transactions.json](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/goitacademy/react-homework/blob/master/homework-01/transaction-history/transactions.json). Це масив об'єктів, де кожен об'єкт описує одну транзакцію з наступними властивостями:

-   `id` — унікальний ідентифікатор транзакції
-   `type` — тип транзакції
-   `amount` - сума транзакції
-   `currency` - тип валюти

### Опис компонента `<TransactionHistory>`[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-01/#%D0%BE%D0%BF%D0%B8%D1%81-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0-transactionhistory "Пряме посилання на цей заголовок")

Необхідно створити компонент `<TransactionHistory>`, який приймає один проп `items` – масив об'єктів транзакцій з `transactions.json`. Компонент створює розмітку таблиці. Кожна транзакція – це рядок таблиці. У прикладі наведена розмітка двох транзакцій.

```
<table class="transaction-history">  <thead>    <tr>      <th>Type</th>      <th>Amount</th>      <th>Currency</th>    </tr>  </thead>  <tbody>    <tr>      <td>Invoice</td>      <td>125</td>      <td>USD</td>    </tr>    <tr>      <td>Withdrawal</td>      <td>85</td>      <td>USD</td>    </tr>  </tbody></table>
```

### Приклад використання[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-01/#%D0%BF%D1%80%D0%B8%D0%BA%D0%BB%D0%B0%D0%B4-%D0%B2%D0%B8%D0%BA%D0%BE%D1%80%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D0%BD%D1%8F-3 "Пряме посилання на цей заголовок")

```
import transactions from 'path/to/transactions.json';<TransactionHistory items={transactions} />;
```