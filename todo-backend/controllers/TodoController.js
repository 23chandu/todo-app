const Todo = require('../models/db-schema')
const logger = require('../utils/logger')

exports.home = (req, res) => {
    res.send('Message from the server');
}

exports.getTodo = async (req, res) => {
    try {
        logger.info("fetching data from the DB");
        const todos = await Todo.find();
        res.status(200).json(todos);
        logger.info(todos);

    }
    catch (error) {
        logger.error(`failed while fetching the data form the DB: ${error.message}`)
        res.status(500).json({ message: "Something goes wrong while connecting to DB", error: error.message });
    }
}

exports.postTodo = async (req, res) => {
    try {
        logger.info("adding a new todo")
        const todo = new Todo({
            title: req.body.title
        });
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        logger.error(`adding new todo failed: ${error.message}`)
        res.status(500).json({ message: "Failed to add todo", error: error.message });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        console.log(req)
        const id = req.params.id
        const deleted = await Todo.findByIdAndDelete(id)
        if (!deleted) {
            return res.status(404).json({ message: "todo not found" })
        }
        return res.status(200).json({ message: "todo item deleted, deleted item is", deleted })

    } catch (err) {
        logger.error(`delete todo failed: ${err.message}`)
        return res.status(500).json({ message: "server error", error: err.message })

    }

};