const createError = require('http-errors');
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      next(createError(403,'Acceso denegado: permisos insuficientes')) // return res.status(403).json({ error: 'Acceso denegado: permiso insuficiente' });
    }
    next();
  };
};

module.exports = authorize;
