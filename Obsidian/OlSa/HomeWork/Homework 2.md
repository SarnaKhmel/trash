# Критерії приймання

Використовуй цей [шаблон React-проекту](https://github.com/goitacademy/react-homework-template#readme) як стартову точку своєї програми.

-   Створені репозиторії `goit-react-hw-02-feedback` і `goit-react-hw-02-phonebook`.
-   При здачі домашньої роботи є два посилання: на вихідні файли та робочі сторінки кожного завдання на `GitHub Pages`.
-   Під час запуску коду завдання в консолі відсутні помилки та попередження.
-   Для кожного компонента є окремий файл у папці `src/components`.
-   Для компонентів описані `propTypes`.
-   Все, що компонент очікує у вигляді пропсів, передається йому під час виклику.
-   JS-код чистий і зрозумілий, використовується `Prettier`.
-   Стилізація виконана `CSS-модулями` або `Styled Components`.

## 1 - Віджет відгуків[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-02/#1---%D0%B2%D1%96%D0%B4%D0%B6%D0%B5%D1%82-%D0%B2%D1%96%D0%B4%D0%B3%D1%83%D0%BA%D1%96%D0%B2 "Пряме посилання на цей заголовок")

Як і більшість компаній, кафе Expresso збирає відгуки від своїх клієнтів. Твоє завдання – створити додаток для збору статистики. Є лише три варіанти зворотного зв'язку: добре, нейтрально і погано.

### Крок 1[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-02/#%D0%BA%D1%80%D0%BE%D0%BA-1 "Пряме посилання на цей заголовок")

Застосунок повинен відображати кількість зібраних відгуків для кожної категорії. Застосунок не повинен зберігати статистику відгуків між різними сесіями (оновлення сторінки).

Стан застосунку обов'язково повинен бути наступного вигляду, додавати нові властивості не можна.

```
state = {  good: 0,  neutral: 0,  bad: 0}
```

Інтерфейс може мати такий вигляд.

![component preview](https://textbook.edu.goit.global/lms-react-homework/v1/uk/img/hw-02/feedback/step-1.png)

### Крок 2[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-02/#%D0%BA%D1%80%D0%BE%D0%BA-2 "Пряме посилання на цей заголовок")

Розшир функціонал застосунку таким чином, щоб в інтерфейсі відображалося більше статистики про зібрані відгуки. Додай відображення загальної кількості зібраних відгуків з усіх категорій та відсоток позитивних відгуків. Для цього створи допоміжні методи `countTotalFeedback()` і `countPositiveFeedbackPercentage()`, які підраховують ці значення, ґрунтуючись на даних у стані (обчислювані дані).

![component preview](https://textbook.edu.goit.global/lms-react-homework/v1/uk/img/hw-02/feedback/step-2.png)

### Крок 3[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-02/#%D0%BA%D1%80%D0%BE%D0%BA-3 "Пряме посилання на цей заголовок")

Виконай рефакторинг застосунку. Стан застосунку повинен залишатися у кореневому компоненті `<App>`.

-   Винеси відображення статистики в окремий компонент `<Statistics good={} neutral={} bad={} total={} positivePercentage={}>`.
-   Винеси блок кнопок в компонент `<FeedbackOptions options={} onLeaveFeedback={}>`.
-   Створи компонент `<Section title="">`, який рендерить секцію із заголовком і дітей (children). Обгорни кожен із `<Statistics>` і `<FeedbackOptions>` у створений компонент секції.

### Крок 4[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-02/#%D0%BA%D1%80%D0%BE%D0%BA-4 "Пряме посилання на цей заголовок")

Розшир функціонал застосунку таким чином, щоб блок статистики рендерився тільки після того, як було зібрано хоча б один відгук. Повідомлення про відсутність статистики винеси в компонент `<Notification message="There is no feedback">`.

![component preview](https://textbook.edu.goit.global/lms-react-homework/v1/uk/img/hw-02/feedback/preview.gif)

## 2 - Книга контактів[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-02/#2---%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0-%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D1%96%D0%B2 "Пряме посилання на цей заголовок")

Напиши застосунок зберігання контактів телефонної книги.

### Крок 1[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-02/#%D0%BA%D1%80%D0%BE%D0%BA-1-1 "Пряме посилання на цей заголовок")

Застосунок повинен складатися з форми і списку контактів. На поточному кроці реалізуй додавання імені контакту та відображення списку контактів. Застосунок не повинен зберігати контакти між різними сесіями (оновлення сторінки).

Використовуйте цю розмітку інпуту з вбудованою валідацією для імені контакту.

```
<input  type="text"  name="name"  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"  required/>
```

Стан, що зберігається в батьківському компоненті `<App>`, обов'язково повинен бути наступного вигляду, додавати нові властивості не можна.

```
state = {  contacts: [],  name: ''}
```

Кожен контакт повинен бути об'єктом з властивостями `name` та `id`. Для генерації ідентифікаторів використовуй будь-який відповідний пакет, наприклад [nanoid](https://www.npmjs.com/package/nanoid). Після завершення цього кроку, застосунок повинен виглядати приблизно так.

![component preview](https://textbook.edu.goit.global/lms-react-homework/v1/uk/img/hw-02/phonebook/step-1.png)

### Крок 2[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-02/#%D0%BA%D1%80%D0%BE%D0%BA-2-1 "Пряме посилання на цей заголовок")

Розшир функціонал застосунку, дозволивши користувачам додавати номери телефонів. Для цього додай `<input type="tel">` у форму і властивість для зберігання його значення в стані.

```
state = {  contacts: [],  name: '',  number: ''}
```

Використовуй цю розмітку інпуту з вбудованою валідацією для номеру контакту.

```
<input  type="tel"  name="number"  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"  required/>
```

Після завершення цього кроку, застосунок повинен виглядати приблизно так.

![component preview](https://textbook.edu.goit.global/lms-react-homework/v1/uk/img/hw-02/phonebook/step-2.png)

### Крок 3[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-02/#%D0%BA%D1%80%D0%BE%D0%BA-3-1 "Пряме посилання на цей заголовок")

Додай поле пошуку, яке можна використовувати для фільтрації списку контактів за ім'ям.

-   Поле пошуку – це інпут без форми, значення якого записується у стан (контрольований елемент).
-   Логіка фільтрації повинна бути нечутливою до регістру.

```
state = {  contacts: [],  filter: '',  name: '',  number: ''}
```

![component preview](https://textbook.edu.goit.global/lms-react-homework/v1/uk/img/hw-02/phonebook/step-3.gif)

Коли ми працюємо над новим функціоналом, буває зручно жорстко закодувати деякі дані у стан. Це позбавить необхідності вручну вводити дані в інтерфейсі для тестування роботи нового функціоналу. Наприклад, можна використовувати такий початковий стан.

```
state = {  contacts: [    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},  ],  filter: '',  name: '',  number: ''}
```

### Крок 4[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-02/#%D0%BA%D1%80%D0%BE%D0%BA-4-1 "Пряме посилання на цей заголовок")

Якщо твій застосунок реалізований в одному компоненті `<App>`, виконай рефакторинг, виділивши відповідні частини в окремі компоненти. У стані кореневого компонента `<App>` залишаться тільки властивості `contacts` і `filter`.

```
state = {  contacts: [],  filter: ''}
```

Достатньо виділити чотири компоненти: форма додавання контактів, список контактів, елемент списку контактів та фільтр пошуку.

Після рефакторингу кореневий компонент застосунку виглядатиме так.

```
<div>  <h1>Phonebook</h1>  <ContactForm ... />  <h2>Contacts</h2>  <Filter ... />  <ContactList ... /></div>
```

### Крок 5[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-02/#%D0%BA%D1%80%D0%BE%D0%BA-5 "Пряме посилання на цей заголовок")

Заборони користувачеві можливість додавати контакти, імена яких вже присутні у телефонній книзі. При спробі виконати таку дію виведи `alert` із попередженням.

![component preview](https://textbook.edu.goit.global/lms-react-homework/v1/uk/img/hw-02/phonebook/step-5.png)

### Крок 6[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-02/#%D0%BA%D1%80%D0%BE%D0%BA-6 "Пряме посилання на цей заголовок")

Розшир функціонал застосунку, дозволивши користувачеві видаляти раніше збережені контакти.

![component preview](https://textbook.edu.goit.global/lms-react-homework/v1/uk/img/hw-02/phonebook/step-6.gif)