const express = require('express');
const connection = require('./database/connection');
const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngsControllers');
const IncidentController = require('./controllers/IncidentController');
const IncidentProfile = require('./controllers/ProfileController');
const routes = express.Router();

routes.post('/session', SessionController.session);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delet);

routes.get('/profile', IncidentProfile.index);

module.exports = routes;
