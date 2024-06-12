const router = require('express');
const app = router();
const controller = require('../Controller/AuthController')


app.post('/api/register',controller.register)
app.post('/api/login',controller.login)

module.exports = app