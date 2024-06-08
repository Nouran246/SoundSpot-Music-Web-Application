const userController = require('../controllers/userController');

const setupRoutes = (app) => {
  // Middleware to check if the user is logged in
  app.use((req, res, next) => {
    if (req.session.user !== undefined) {
      next();
    } else {
      res.status(404).render('404', {
        user: req.session.user === undefined ? "" : req.session.user,
        currentPage: '404',
      });
    }
  });

  // User-related routes
  app.get('/display', userController.displayAllUsers);
  app.post('/users', userController.addUser);
  app.delete('/users/:id', userController.deleteUser);
  app.put('/users/:id', userController.editUser);
};

module.exports = { setupRoutes };
