const Todo = require("../models/Todo")
const moment = require('moment');

const homeController = async (req, res, next) => {
    try {
        const todos = await Todo.find({}).sort({ createdAt: -1 });

        res.locals.moment = moment;

        res.render('index', { title: 'List todo', todos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addTodoFormController = (req, res, next) => {
    try {
        res.render("newTodo", { title: 'New todo' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTodoFormController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const todo = await Todo.findById(id);
        res.render("updateTodo", { title: 'Update todo', todo })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTodoFormController = async (req, res, next) => {
    try {
        const { id } = req.query;
        res.render("deleteTodo", { title: 'Delete todo', id })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addTodoController = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const todo = new Todo({
            title,
            description
        });
        await todo.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTodoController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const todo = await Todo.findByIdAndUpdate(id, { title, description });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTodoController = async (req, res, next) => {
    try {
        const { id, confirm } = req.query;

        if (confirm === "yes") {
            const todo = await Todo.findByIdAndDelete(id);
        }

        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    homeController,
    addTodoFormController,
    updateTodoFormController,
    deleteTodoFormController,
    addTodoController,
    updateTodoController,
    deleteTodoController
};