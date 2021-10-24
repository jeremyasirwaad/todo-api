const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todo = require('./model/Todo');
let port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://jeremy:jeremy4755@cluster0.byg43.mongodb.net/To-Do-DB?retryWrites=true&w=majority');
mongoose.connection.on('connected', () => {
    console.log('Connected to DB');
})

app.get('/',(req,res)=>{
    res.send('this is home');
})

app.get('/todos', async (req,res)=>{
    const Todo = await todo.find();
    res.send(Todo);
    res.json(Todo);
})

app.post('/todo/new', (req,res)=>{
    const Todo = new todo({
        text:req.body.text
    })

    Todo.save();

    res.json(Todo);
})

// app.get('/todo/summa',async (req,res) => {
//     const summa = await todo.findById("6172e7ae1ea989b186f19ae1");

//     res.json(summa);
// })

app.get('/todo/complete/:id', async (req, res) => {
    const Todo =  await todo.findById(req.params.id);

    Todo.complete = !Todo.complete;

    Todo.save();

    res.json(Todo)
} )

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.listen(port,()=>{
    console.log(`listening to ${port}`);
})