// middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
    if (req.session.user && req.session.user.type === 'admin') {
      next();
    } else {
      res.redirect('/');
    }
  };
  
  module.exports = authMiddleware;
  