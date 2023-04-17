docker-compose нужно поместить на деррикторию выше и также добавить два миркосервиса app(Profile) и auth
на данный момент соединение настроено с бд в докере 
при первом запуске необходимо выполнит команды docker-compose exec db1 psql -U postgres
затем 
CREATE DATABASE "Profiles";
CREATE DATABASE "Users";
после можно запустить полностью docker-compose, будет успешное подколючение и старт серверов
