const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
//const methodOverrride=require('method-override')
const path=require('path')
require('dotenv').config(); // Load environment variables from .env file


//importing task model
const Task=require('./models/Task');

const app=express()

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(methodOverride('_method'));
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

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})

