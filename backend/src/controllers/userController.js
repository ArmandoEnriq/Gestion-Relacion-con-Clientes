const { User } = require("../models");
const createError = require('http-errors'); // Creador de errores que podemos manejar

const getAllEmployees = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: ["employee","manager"] },
      attributes: ["id", "name", "email", "role"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const updateEmployee = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) throw createError(404,'Usuario no encontrado')  // return res.status(404).json({ error: "Usuario no encontrado" });

    await user.update(req.body);
    res.json({ message: "Empleado actualizado", user });
  } catch (err) {
    next(err);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) throw createError(404,'Usuario no encontrado') // return res.status(404).json({ error: "Usuario no encontrado" });

    await user.destroy();
    res.json({ message: "Empleado eliminado" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
