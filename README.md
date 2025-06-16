🗄 Требования к окружению

Для полноценной работы проекта необходима СУБД PostgreSQL.

🔧 Настройка окружения: (.env)

DATABASE_URL="postgresql://user:password@localhost:5432/your_db_name"

Убедись, что PostgreSQL запущен и база данных создана.


Установи зависимости:

npm install

npx prisma migrate deploy

Запусти сервер:

npm start

Открой в браузере:

http://localhost:3000