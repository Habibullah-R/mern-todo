const Todo = require('../models/todo.model.js')

const addTodo = async(req,res,next)=>{
    try {
        const {todo,check,userRef} = req.body;
        await  Todo.create({
        todo,
        check,
        userRef
        });
        res.status(200).json('Todo created')
    } catch (error) {
        next(error)
    }
}

const showTodo = async(req,res,next)=>{
    try {
        const todos = await Todo.find({ userRef : req.params.id });
        res.status(200).json(todos)
    } catch (error) {
        next(error)
    }
}

const deleteTodo = async(req,res,next)=>{
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json('Todo Deleted.')
    } catch (error) {
        next(error)
    }
}

const updatedTodo = async(req,res,next)=>{
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        res.status(200).json(updatedTodo)
    } catch (error) {
        next(error)
    }
}

module.exports = { updatedTodo , deleteTodo , showTodo , addTodo }