# Критерії прийому

Використовуй цей [шаблон React-проекту](https://github.com/goitacademy/react-homework-template#readme) як стартову точку своєї програми.

-   Створено репозиторій `goit-react-hw-07-phonebook`
-   Використана бібліотека `Redux Toolkit`

## Книга контактів[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-07/#%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0-%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D1%96%D0%B2 "Пряме посилання на цей заголовок")

Виконайте рефакторинг коду програми «Книга контактів». Видали код, що відповідає за зберігання та читання контактів з локального сховища, та додай взаємодію з бекендом для зберігання контактів.

### Бекенд[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-07/#%D0%B1%D0%B5%D0%BA%D0%B5%D0%BD%D0%B4 "Пряме посилання на цей заголовок")

Створи свій персональний бекенд для розробки за допомогою UI-сервісу [mockapi.io](https://mockapi.io/). Зареєструйся використовуючи свій обліковий запис GitHub. Створи ресурс `contacts` щоб отримати ендпоінт `/contacts`. Використай конструктор ресурсу та опиши об'єкт контакту як на ілюстрації.

![Contact schema](https://textbook.edu.goit.global/lms-react-homework/v1/uk/img/hw-07/api.png)

### Форма стану[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-07/#%D1%84%D0%BE%D1%80%D0%BC%D0%B0-%D1%81%D1%82%D0%B0%D0%BD%D1%83 "Пряме посилання на цей заголовок")

Додай у стан Redux обробку індикатора завантаження та помилки. Для цього зміни форму стану.

```
{  contacts: {    items: [],    isLoading: false,    error: null  },  filter: ""}
```

### Операції[​](https://textbook.edu.goit.global/lms-react-homework/v1/uk/docs/hw-07/#%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D1%96%D1%97 "Пряме посилання на цей заголовок")

Використовуй функцію [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk) для оголошення асинхронних генераторів екшенів та виконання HTTP-запитів. Обробку екшенів та зміну даних у стані Redux зроби за допомогою [`createSlice`](https://redux-toolkit.js.org/api/createSlice).

Оголоси наступні операції:

-   `fetchContacts` - одержання масиву контактів (метод GET) запитом. Базовий тип екшену `"contacts/fetchAll"`.
-   `addContact` - додавання контакту (метод POST). Базовий тип екшену `"contacts/addContact"`.
-   `deleteContact` - видалення контакту (метод DELETE). Базовий тип екшену `"contacts/deleteContact"`.