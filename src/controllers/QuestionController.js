const Database = require('../db/config');

module.exports = {
   async action(req, res) {
      const { "room-id": room, "question-id": question, slug } = req.query;
      const { password } = req.body;

      const db = await Database();
      const checkRoom = await db.get(`SELECT * FROM rooms WHERE id = ${room}`);
      checkRoom.pass === password && await db.run(`${slug == "delete" ? 'DELETE FROM questions' : 'UPDATE questions SET read = 1'} WHERE id = ${question}`);
      await db.close();

      res.redirect(`/room?id=${checkRoom.pass !== password ? `${room}&question=${question}&slug=${slug}&wrongPass` : `${room}`}`);
   },

   async create(req, res) {
      const { "room-id": room } = req.query;
      const { question } = req.body;

      const db = await Database();
      await db.run(`INSERT INTO questions (
         title,
         room,
         read
      ) values (
         "${question}",
         ${room},
         0
      )`);

      await db.close();

      res.redirect(`/room?id=${room}`);
   }
};