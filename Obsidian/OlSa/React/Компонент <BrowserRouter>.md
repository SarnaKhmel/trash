[[Маршрутизація]]

Командний центр управління маршрутизацією, який приховує в собі всю логіку взаємодії із історією браузера. Створює маршуртизатор та об'єкт історії навігації, щоб синхронізувати інтерфейс із URL-адресою. Використовуючи React контекст передає інформацію про поточний стан історії навігації всім нащадкам. Все, що необхідно зробити, це обернути компонентом `<BrowserRouter>` всі програми.

index.js

```
import { BrowserRouter } from "react-router-dom";ReactDOM.createRoot(document.getElementById("root")).render(  <React.StrictMode>    <BrowserRouter>      <App />    </BrowserRouter>  </React.StrictMode>);
```

Далі розглянь як описувати маршрути програми.

#react 

[[Компоненти <Route> та <Routes>]]
