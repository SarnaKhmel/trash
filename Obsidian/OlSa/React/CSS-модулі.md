[[Ванільний CSS]]

CSS-модулі - це не офіційна специфікація, вони не імплементовані в браузери. Це процес, що запускається на стадії складання проекту (наприклад, за допомогою Webpack), в результаті виконання якого імена класів замінюються на унікальні. Це дозволяє використовувати одне і те ж ім'я класу в різних CSS-файлах, не турбуючись про конфлікти імен. Цей підхід був розроблений, щоб вирішити проблему глобальної області видимості в CSS.

Create React App за замовчуванням підтримує CSS-модулі, все, що необхідно зробити це створювати файли стилів з розширенням `.module.css`, наприклад `Alert.module.css`. Всередині модуля CSS можна використовувати будь-який валідний CSS.

src/components/Alert.module.css

```
.alert {  margin: 8px;  padding: 12px 16px;  border-radius: 4px;  background-color: gray;  color: white;}
```

ТРОХИ ГЛИБШЕ

Хоча CSS-модуль виглядає як звичайний CSS, насправді він компілюється у формат, що називається ICSS (Interoperable CSS), який призначений для розробників інструментів на зразок Webpack, а не для кінцевих користувачів.

Синтаксис імпорту CSS-модуля нагадує імпорт файлу JavaScript модуля. У CSS-модулі є експорт за замовчуванням - об'єкт відповідності оригінального та згенерованих імен класів. У фінальному файлі стилів буде унікальне ім'я класу у форматі `[filename]_[classname]__[hash]`.

src/components/Alert.js

```
// Синтаксис імпорту CSS-модуляimport css from "./Alert.module.css";// Отримуємо об'єкт відповідності імен класівconsole.log(css); // { alert: "Alert_alert_ax7yz" }const Alert = ({ children }) => {  // Звертаємось до властивості об'єкта на ім'я класу з файлу модуля  return <p className={css.alert}>{children}</p>;};
```

Розберіть код живого прикладу, в якому використовується весь матеріал, який ми з вами розібрали до цього моменту.

ГЛОБАЛЬНІ СТИЛІ

Селектори тегів за замовчуванням будуть у глобальній області видимості, CSS-модулі генерують лише унікальні імена селекторів класу.

## Властивість `composes`[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-02/modules#%D0%B2%D0%BB%D0%B0%D1%81%D1%82%D0%B8%D0%B2%D1%96%D1%81%D1%82%D1%8C-composes "Пряме посилання на цей заголовок")

Композиція селекторів це одна з ключових можливостей CSS-модулів, яка дозволяє створювати клас, наслідуючи стилі іншого класу, але не дублюючи їх. Використовуємо композицію класів та виконаємо рефакторинг стилів компонента `Alert`. Наслідуємо стилі базового класу `.alert` у всіх класах варіантів. Властивість `composes` має передувати іншим правилам, щоб можна було перевизначити стилі, якщо це необхідно.

src/components/Alert.module.css

```
.alert {  margin: 8px;  padding: 12px 16px;  border-radius: 4px;  background-color: gray;  color: white;}.info {  composes: alert;  background-color: blue;}.success {  composes: alert;  background-color: green;}.error {  composes: alert;  background-color: red;}.warning {  composes: alert;  background-color: orange;}
```

При композиції у простих випадках можна обійтися без бібліотеки `clsx`. Не задаємо базовий клас `alert`, тому що від нього виконано композицію класів варіантів. В результаті на елементі `<p>` будуть два класи, базовий `alert` і клас варіанта, у якому перевизначається значення кольору фону.

src/components/Alert.js

```
import css from "./Alert.module.css";const Alert = ({ variant, children }) => {  return <p className={css[variant]}>{children}</p>;};
```

ДОСТУП ДО ВЛАСТИВОСТЕЙ

До властивостей об'єкта зазвичай звертаються як `css.alert`, але можна використовувати квадратні дужки, наприклад `css["alert"]`. Це корисно у випадку коли ім'я властивості зберігається у змінній, як у нас у пропсі `variant`.

## Бібліотека `clsx`[​](https://textbook.edu.goit.global/react-zr7b4k/v1/uk/docs/lesson-02/modules#%D0%B1%D1%96%D0%B1%D0%BB%D1%96%D0%BE%D1%82%D0%B5%D0%BA%D0%B0-clsx "Пряме посилання на цей заголовок")

Додамо CSS класи для вже знайомих нам пропсів `outlined` та `elevated`. Імена класи, що складаються з декількох слів записують у верблюжій нотації. В протилежному випадку, оскільки вони стають властивостями об'єкта, звертатися до них доведеться через квадратні дужки, наприклад `css["is-outlined"]`, що менш зручно.

src/components/Alert.module.css

```
/* Весь попередній CSS код */.alert.isOutlined {  outline: 1px solid black;}.alert.isElevated {  box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px,    rgb(0 0 0 / 12%) 0px 1px 8px 0px;}
```

Тепер ми знову використовуємо бібліотеку `clsx` для складання фінального значення властивості `className`.

src/components/Alert.js

```
import clsx from "clsx";import css from "./Alert.module.css";const Alert = ({ variant, outlined, elevated, children }) => {  return (    <p      className={clsx(css[variant], {        [css.isOutlined]: outlined,        [css.isElevated]: elevated,      })}    >      {children}    </p>  );};
```

Розберіть код живого прикладу, в якому використовується весь матеріал, який ми з вами розібрали до цього моменту.

#react #css 

[[Нормалізація стилів]]
