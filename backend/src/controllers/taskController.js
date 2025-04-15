const { Task, Project, Client,User } = require("../models");

const createTask = async (req, res) => {
  try {
    const { name, status, dueDate, projectId, assignedTo } = req.body;

    let project;

    if (req.user.role === "admin") {
      // Admin puede acceder a cualquier proyecto
      project = await Project.findOne({ where: { id: projectId } });
    } else {
      // Manager solo puede acceder a sus proyectos
      project = await Project.findOne({
        where: { id: projectId },
        include: {
          model: Client,
          where: { createdBy: req.user.id },
        },
      });
    }

    if (!project) {
      return res
        .status(404)
        .json({ error: "Proyecto no encontrado o no autorizado" });
    }
    const assignedUser = await User.findByPk(assignedTo);

    if (!assignedUser) {
      return res.status(400).json({ error: "Usuario asignado no existe" });
    }

    const task = await Task.create({
      name,
      status,
      dueDate,
      projectId,
      assignedTo,
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear tarea" });
  }
};

const getTasks = async (req, res) => {
  try {
    let whereCondition = {};

    if (req.user.role === "employee") {
      // Solo sus tareas asignadas
      whereCondition = { assignedTo: req.user.id };
    }

    const tasks = await Task.findAll({
      where: whereCondition,
      include: [
        {
          model: Project,
          required: true,
          include: {
            model: Client,
            attributes: ["name", "company"],
          },
        },
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: {
        model: Project,
        include: {
          model: Client,
          attributes: ["createdBy"],
        },
      },
    });

    if (!task) {
        return res.status(404).json({ error: "Tarea no encontrada" });
      }
  
    // Verificar permisos
    const isAdmin = req.user.role === "admin";
    const isOwner = task.Project?.Client?.createdBy === req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: "No autorizado" });
    }
    await task.update(req.body);
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
};

const updateTaskStatusByEmployee = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task || task.assignedTo !== req.user.id) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para modificar esta tarea" });
    }

    const { status } = req.body;
    if (!["pendiente", "en progreso", "completada"].includes(status)) {
      return res.status(400).json({ error: "Estado inválido" });
    }

    task.status = status;
    await task.save();

    res.json({ message: "Estado de tarea actualizado", task });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar estado" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: {
        model: Project,
        include: {
          model: Client,
          attributes: ["createdBy"],
        },
      },
    });

    if (!task) {
        return res.status(404).json({ error: "Tarea no encontrada" });
      }
  
      // Verificar permisos
      if (req.user.role !== "admin" && task.Project.Client.createdBy !== req.user.id) {
        return res.status(403).json({ error: "No autorizado" });
      }

    await task.destroy();
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatusByEmployee,
};
