const Database = require("../db/config");

module.exports = {
   async create(req, res) {
      const { password } = req.body;
      let room, exists = true;

      const db = await Database();

      //GENERATE NON-EXISTENT ID FOR ROOM
      while (exists) {
         room = Math.floor(Math.random() * 900000) + 100000;
         const rooms = await db.get(`SELECT id FROM rooms WHERE id = ${room}`);
         if (!rooms) break;
      }

      //SAVE ROOM IN DATABASE
      await db.run(`INSERT INTO rooms (
         id,
         pass
      ) VALUES (
         ${room},
         ${password}
      )`);

      await db.close();

      res.redirect(`/room?id=${room}`);
   },

   async render(req, res) {
      const { id: room } = req.query;

      const db = await Database();
      const questions = await db.all(`SELECT * FROM questions WHERE room = ${room} ORDER BY read ASC`);
      const id = await db.get(`SELECT id FROM rooms WHERE id = ${room}`);
      await db.close();

      room.length < 6 || id === undefined ? res.redirect('/') : res.render('room', { room, questions });
   },

   enter(req, res) {
      res.redirect(`/room?id=${req.body.room}`);
   }
};