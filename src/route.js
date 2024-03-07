const express = require('express');
const QuestionController = require('./controllers/QuestionController');
const RoomController = require('./controllers/RoomController');

const route = express.Router();

route.get('/', (req, res) => res.render('index'));
route.get('/room', RoomController.render);

route.post('/enter', RoomController.enter);
route.post('/create', RoomController.create);
route.post('/question', QuestionController.create);
route.post('/action', QuestionController.action);

module.exports = route;