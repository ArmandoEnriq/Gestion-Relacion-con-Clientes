const express = require("express");
const router = express.Router();
const {createTask, getTasks, updateTask, deleteTask, updateTaskStatusByEmployee} = require("../controllers/taskController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.use(authenticate);

router.post("/",authorize('admin','manager'), createTask);
router.get("/", getTasks);
router.put("/:id",authorize('admin','manager'), updateTask);
router.delete("/:id",authorize('admin','manager'), deleteTask);
router.patch("/status/:id", authorize('employee'), updateTaskStatusByEmployee);

module.exports = router;
