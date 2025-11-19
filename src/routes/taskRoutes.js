const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");

router.get("/", auth, taskController.getTasks);

router.post(
  "/",
  auth,
  [body("title").notEmpty().withMessage("Title is required")],
  taskController.createTask
);

router.put(
  "/:id",
  auth,
  [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("description").optional().isString(),
    body("completed").optional().isBoolean().withMessage("Completed must be boolean"),
  ],
  taskController.updateTask
);

router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;
