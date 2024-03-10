const Database = require('./config');

const initDb = {
   async init() {
      const tableRooms = `CREATE TABLE rooms (
         id INTEGER PRIMARY KEY,
         pass TEXT
      )`;

      const tableQuestions = `CREATE TABLE questions (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         title TEXT,
         read INT,
         room INT
      )`;

      const db = await Database();
      await db.exec(tableRooms);
      await db.exec(tableQuestions);
      await db.close();
   }
};

initDb.init();