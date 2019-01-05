const articles = require('./controllers/articlesController')
const users = require('./controllers/usersController')
const services = require('./controllers/servicesController')

module.exports = app => {
  app.get('/api/v1/articles',articles.index)
  app.get('/api/v1/articles/:id',articles.show)
  app.post('/api/v1/articles',articles.create)
  app.put('/api/v1/articles',articles.update)
  app.delete('/api/v1/articles',articles.destroy)

  app.post('/api/v1/auth', users.authorize)
  app.get('/api/v1/token', users.token)

  app.post('/api/v1/users', users.create)
  app.get('/api/v1/users', users.index)

  app.post('/api/v1/email',         services.mailList )
  app.post('/api/v1/contact',       services.contact)
}
