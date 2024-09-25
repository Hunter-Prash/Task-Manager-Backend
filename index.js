const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const path=require('path')
require('dotenv').config(); // Load environment variables from .env file


//importing task model
const Task=require('./models/Task');

const app=express()

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));


//connect to DB
const dburi=process.env.DB_URI;
const PORT=process.env.PORT || 4000

const connectDB=async()=>{
    try{
        await mongoose.connect(dburi)
        console.log('DB connected succesfully')

    }
    catch(err){
        console.error('DB connection error',err)
        process.exit(1)
    }
};
connectDB();

//route to render ejs page
app.get('/',async(req,res)=>{
    const tasks=await Task.find();
    res.render('index',{tasks})
})

//route to add tasks
app.post('/tasks',async(req,res)=>{
    const {title,description}=req.body
    const newTask= new Task({title,description});
    await newTask.save();
    res.redirect('/');
})

//route to get the task which we wanna edit
app.get('/tasks/:id/edit',async(req,res)=>{
    const task=await Task.findById(req.params.id)
    res.render('edit',{task})
})

// Route to handle updating a task
app.post('/tasks/:id/update', async (req, res) => {
    const { title, description } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { title, description });
    res.redirect('/');
});

//route to delete tasks
app.post('/tasks/:id', async (req, res) => {
    if (req.body._method === 'DELETE') {
        await Task.findByIdAndDelete(req.params.id);
    }
    res.redirect('/');
});

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})

