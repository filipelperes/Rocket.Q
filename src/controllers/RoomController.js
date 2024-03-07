const Database = require("../db/config");

module.exports = {
   async create(req, res) {
      const { password } = req.body;
      let room, exist = true;

      const db = await Database();

      while (exist) {
         room = Math.floor(Math.random() * 900000) + 100000;

         // CHECK IF ROOM ID EXIST
         const rooms = await db.all(`SELECT id FROM rooms`);
         exist = rooms.some(id => id === room);
      }

      //SAVE ROOM IN DATABASE IF ID ROOM NOT EXIST
      !exist && await db.run(`INSERT INTO rooms (
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