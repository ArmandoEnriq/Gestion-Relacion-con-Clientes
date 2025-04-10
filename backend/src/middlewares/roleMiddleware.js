const createError = require('http-errors');
const requireRole = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        next(createError(403,'Acceso denegado: permisos insuficientes'))// Anteriormente return res.status(403).json({ error: 'Acceso denegado: permisos insuficientes' });
      }
      next();
    };
  };
  
  module.exports = requireRole;
  