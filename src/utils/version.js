export const version = "38 от 06.06.2022";

export const todo = `
- омнипоиск, искать место прямо в строке поиска
- звание и подразделение руководителей выпадать список
- place_others и realiz_place_others привести в соответствие
- добавить редактирование карточки
- валидация должна не просто подсвечивать инпуты, но и не пропускать форму если есть инвалидные поля
- исправить стиль выпадающего меню под строкой поиска
- очищать форму после успешного ввода, а не переходить в окно поиска
- добавить окно администрирования с добавлением пользователей
`;

export const whatsNew = `
(06.06.2022)
- Реализована возможность открывать карточку на редактирование
- При открытии карточки из старых версий программы для редактирования доступны не все поля

(01.06.2022)
- реализована возможность передачи в форму начальных значений
- если в мультиполе есть текст, то при потере фокуса полем этот текст добавляется в список значений

(30.05.2022)
- улучшенный показ подсказок при вводе значения с клавиатуры
- после ввода ФИО поле "Сотрудник, заполнивший карту", заполняется автоматически
- при вводе фамилии показывается подсказка из имеющихся в базе людей
- добавлен справочник подразделений
- добавлен справочник должностей

(27.05.2022)
- Исправлен стиль у выпадающего меню
- Сортировка результатов поиска не сбрасывается при клике по содержимому
- Добавлена возможность регулировать ширину колонки в результатах поиска

(26.05.2022)
- исправлены условия валидации некоторых полей
- исправлена ошибка с расшифровкой кодового поля при отправке на сервер

(23.05.2022)
- добавлена простая валидация полей
- добавлена возможность в мультиполях перечислять варианты в столбик, а не в строку
- исправлены стили
`;