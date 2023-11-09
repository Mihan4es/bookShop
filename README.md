# bookShop

ЗАДАНИЕ

В рамках проекта вам необходимо:

Сверстать главную страницу интернет-магазина Bookshop. Макет находится здесь.
Подключить Google Books API так, чтобы данные о книгах подгружались с сервера.
Подключить созданный вами ранее слайдер.
Поработать над правильной организацией проекта:
реализовать модульную структуру;
подключить Webpack;
настроить сборку с минификацией.
Применить пройденные вами ранее инструменты оптимизации.

![image](https://github.com/Mihan4es/bookShop/assets/141183140/dfbf71f8-4115-43cf-a8a9-9da6576bbace)


ФУНКЦИОНАЛЬНЫЕ ТРЕБОВАНИЯ

В рамках проекта нужно создать одну (главную) страницу книжного магазина. На странице должен быть следующий набор элементов:

1
Шапка сайта
Шапка содержит логотип, навигацию и набор кнопок. Ссылки в меню можно оставить пустыми, так как реализация остальных страниц сайта в проекте не предусмотрена.

Кнопки авторизации, поиска и корзины неактивны. Однако при добавлении товара в корзину у иконки должен появиться бейджик с количеством товара в корзине.

При прокрутке сайта шапка должна оставаться закреплённой в верхней части экрана.

2
Слайдер
Под шапкой сайта располагается слайдер. Чтобы сократить время разработки, рекомендуем вам использовать слайдер, которые вы создали при прохождении модулей по JavaScript.

Слайдер автоматически пролистывает изображения каждые 5 секунд, а после последнего изображения вновь переключается на первое. Перелистывать изображения можно также с помощью точек под слайдером.

![image](https://github.com/Mihan4es/bookShop/assets/141183140/eb963092-6a90-45ac-98fe-accec96b1fba)

Справа от слайдера располагаются цветные блоки. Их нужно сверстать как ссылки, адреса ссылок можно оставить пустыми.

3
Список категорий и список книг
Под слайдером в левой части экрана располагается список категорий. Активная категория должна быть выделена визуально.

![image](https://github.com/Mihan4es/bookShop/assets/141183140/4c8cd48f-325f-4b20-b3d4-386db70964ac)

По умолчанию в качестве активной выбрана первая категория в списке. Клик на неактивную категорию делает её активной, и список книг перезагружается, чтобы отобразить книги из этой категории.

Список книг подгружается из Google Books API в соответствии с выбранной категорией. Для списка книг необходимо реализовать ленивую загрузку: сначала подгружаются первые 6 книг, по клику на кнопку «Load more» — ещё 6, и так далее.

4
Карточка книги
В карточке книги должна быть отображена следующая информация:

Обложка. Если API не возвращает обложку, подставить вместо неё любую картинку-плейсхолдер.
Автор. Если авторов несколько, перечислить их через запятую.
Заголовок.
Рейтинг: от 1 до 5 звёздочек плюс общее количество отзывов. Если в данных о книге нет рейтинга, не показывать эту строчку.
Описание. Если текст в описании занимает больше 3-х строк, его нужно обрезать и добавить в конце многоточие.
Цена с указанием валюты. Если в данных о книге нет цены, не показывать эту строчку.
Ниже приведён пример карточки товара, а также названия свойств в объекте книги, которые содержат необходимую информацию:

![image](https://github.com/Mihan4es/bookShop/assets/141183140/4ea2b3a6-9f1c-456c-a09c-d0bcbbb09648)

Под описанием каждой книги должна быть кнопка «Buy now». При клике на неё товар добавляется в корзину, а кнопка меняет внешний вид (см. скриншот выше). При повторном нажатии на кнопку товар убирается из корзины.

Информация о книгах, добавленных в корзину, должна сохраняться в localStorage.

ОПИСАНИЕ GOOGLE BOOKS API

Подробное описание вы найдёте в документации, однако разберём пару основных моментов.

Для отправки запросов вам необходим аккаунт Google, а также ключ авторизации. Его можно сгенерировать в Google Console, подробная инструкция есть в документации.

Запрос выглядит следующим образом:

https://www.googleapis.com/books/v1/volumes?q="subject:Business"&key=<ваш ключ API>&printType=books&startIndex=0&maxResults=6&langRestrict=en



