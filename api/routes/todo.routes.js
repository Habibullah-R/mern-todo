const express = require('express')
const { addTodo , showTodo , deleteTodo , updatedTodo } = require("../controller/todo.controller.js")
const { verifyToken } = require('../utills/verifyUser.js')

const router = express.Router();

router.post("/add",verifyToken, addTodo)
router.get("/show/:id",verifyToken, showTodo)
router.delete("/delete/:id",verifyToken, deleteTodo)
router.post("/updated/:id",verifyToken, updatedTodo)


module.exports = router