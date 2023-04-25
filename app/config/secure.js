'use strict';

module.exports = {
  db: {
    database: 'shishiwang',
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    username: 'root',
    password: 'li1397065932@',
    logging: false,
    timezone: '+08:00',
    define: {
      charset: 'utf8mb4'
    }
  },
  secret:
    'li397065932@#' // 发布生产环境前，请务必修改此默认秘钥
};
