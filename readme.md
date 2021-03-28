# Структура проекта
* src - модули работы
    * db - работа с БД
        * migration - миграции
        * controls - контроллеры
        * models - модели
    * routes - папка с роутами, создаем для ролей пользователя    
    * views - представления
        * part - части проекта
    
Используем SASS

## Работа с БД
* создание миграции и модели
sequelize model:create --name User --attributes email:string, password:string

sequelize migration:create --name name_of_your_migration
* запуск миграции

sequelize db:migrate

* seeders
  sequelize db:seed:all
  - позволяет заполнить таблицу начальными данными
    
#Роли пользователя
* Покупатель - 1
* Фермер - 2
* Администратор - 3
* Менеджер (логист) - 4
* Копирайтер - 5