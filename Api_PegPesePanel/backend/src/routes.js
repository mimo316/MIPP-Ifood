const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const RequestController = require('./controllers/RequestController');

const routes = express.Router();

routes.post('/pedidos', celebrate({ 

[Segments.BODY]: Joi.object().keys({
  id: Joi.string().required(),
  estado: Joi.string().required().min(1).max(1),
})
}), RequestController.create);
routes.put('/pedidos', RequestController.update)
routes.get('/pedidos', RequestController.index)
 

// routes.get('/', (req, res) => {
//   res.send('ola')
// })

routes.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html')
})




module.exports = routes;