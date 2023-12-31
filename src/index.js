

const app = require('./app');
const logger = require('./logger');
const port = process.env.PORT


app.listen(port, ()=>{
    console.log("server is on port "+port);
    // logger.info("server is on ");
})  


// copied and pasted this code to app.js 

// const express = require('express');
// require("./db/mongoose");               // for connecting to the database ( compass app)
// const User = require('./models/user');  // here we define  / given reference of model user which is a seperate file .  
// const Task = require('./models/task');  // here we define  / given reference of model task which is in a seperate file . 

// const user_Router = require('./routers/user')   // importing user file from routers folder
// const task_Router = require('./routers/task');
// const { model } = require('mongoose');

// const app = express();
// const port = process.env.PORT

// // ------------------------------- file / photo upload -----------------------------------------------------------
// /*
// const multer = require('multer')
// const upload = multer({
//     dest : 'images',
//     limits : {
//         fileSize : 1000000
//     },
//     fileFilter(req,file,cb){
//         // if(file.originalname.endsWith('.jpg'))
//         if(file.originalname.match(/\.(jpg|jpeg)$/))
//         {
//             cb(undefined,true)
//         }

//         else
//         {
//            cb(new Error('please upload .jpg file'))
//         }

//     }
// })
// app.post('/upload'  ,   upload.single('upload') ,   (req,res)=>{
//     res.send();
// })
// */
// // ---------------------------------------------------------------------------------------------------------------

// app.use(express.json())

// //---------------------------------------------------------------------------- User ----------------------------------------------------------------------------

// app.use(user_Router) 

// // ---------------------------------------------------------------------------- Task ----------------------------------------------------------------------------

// app.use(task_Router)

// // ----------------------------------------------------------------------------  ----------------------------------------------------------------------------


// app.listen(port, ()=>{
//     console.log("server is on port "+port);
// })  



// before making routers folder and making routing of user and task every thing was inside index.js so that code is below     

// -------------------------------------------------------------- code WITH Async Await every thing inside this file ---------------------------------------------------------------------
/*

const express = require('express');
require("./db/mongoose");   // for connecting to the database ( compass app)
const User = require('./models/user');  // here we define  / given reference of model user which is a seperate file .  
const Task = require('./models/task');  // here we define  / given reference of model task which is in a seperate file . 

const app = express();
const port = process.env.PORT || 5000

app.use(express.json())


//---------------------------------------------------------------------------- User ----------------------------------------------------------------------------

                                                    // here we have created 1st rest api route 
                                                    // route for creating new user =  start           // route is like /about, /help ,etc 
app.post('/users', async (req,res)=>{                     // '/users' is what we will give in = localhost:5000/users in mongodb database
    const user = new User(req.body);

    try{
        await user.save()
        console.log(req.body)
        res.status(201).send(user)
    }   
    catch(e){
         res.status(400).send(e)
    }
})
                                                                // user rest api route =  over


                                                // (this route is for fetching / reading all users) =  start   
app.get('/users', async (req,res)=>{                // '/users' is what we will give in = localhost:5000/users in mongodb database
    
    try{
        const users = await User.find({})
        res.send(users)
    }   
    catch(e){
        res.status(500).send(e)
    }
})
                                                        // user rest api route =  over


                                                    // (this route is for fetching / reading 1 user based on id) =  start   
app.get('/users/:id', async (req,res)=>{                // '/users' is what we will give in = localhost:5000/users in mongodb database
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        
        if(user === null)
        {
            res.status(404).send()
        }

        else
        {
            res.send(user) 
        }
    }
    catch(e){
        res.status(500).send(e)
    }

})
                                                    // user rest api route =  over


app.patch('/users/:id' , async(req,res) => { 
    const updates = Object.keys(req.body)
    const updates_allowed_on_column = [ 'name' , 'email' , 'age' , 'password' ]     
    const isValidOperation =  updates.every((i) => updates_allowed_on_column.includes(i))    
    
    if(isValidOperation===false)
    {
        res.status(400).send({ error : 'invalid update' })
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id , req.body , { new : true, runValidators: true})

        if(user===null){
            res.status(404).send()
        }

        else{
            res.send(user)
        }
    }
    catch(e)
    {
        res.status(400).send()
    }
})


app.delete('/users/:id' , async(req,res) => {
    try 
    {
        const user = await User.findByIdAndDelete(req.params.id)

        if(user===null)
        {
            res.status(404).send()
        }

        else
        {
            res.send(user)
        }
    } 
    
    catch(e)
    {
        res.status(500).send()
    }
}) 

// ---------------------------------------------------------------------------- Task ----------------------------------------------------------------------------


                                                                // route for creating new task =  start  
app.post('/tasks' , async (req,res)=>{                    // '/tasks' is what we will give in = localhost:5000/tasks in mongodb database
    const task = new Task(req.body);

    try {
        await task.save()                                // if anything in try block gets error then catch block will be executed
        console.log(req.body)
        res.status(201).send(task)
    } 
    catch(e) {
        res.status(400).send(e)
    }
})
                                                                // task rest api route =  over

                                                            // route for fetching / reading all tasks = start
app.get('/tasks' , async (req,res) => {
    
    try {
        const tasks = await Task.find({})
        res.send(tasks) 
    } 
    catch(e) {
        res.status(500).send(e)
    }
})
                                                            // task rest api route =  over



                                                        // route for fetching / reading all tasks = start
app.get('/tasks/:id' , async (req,res) => {
    const _id = req.params.id ;

    try {
        const task = await Task.findById(_id)

        if(task === null)
        {
            res.status(404).send()
        }  
        
        else
        {
            res.send(task) 
        }     
    } 
    catch(e){ 
        res.status(500).send(e)
    }

})
                                                        // task rest api route =  over                                                                                                                              //task rest api route =  over

app.patch('/tasks/:id' , async(req,res) => { 
const updates = Object.keys(req.body)
    const updates_allowed_on_column = [ 'discription' , 'completed' ]     
    const isValidOperation =  updates.every((i) => updates_allowed_on_column.includes(i))    
    
    if(isValidOperation===false)
    {
        res.status(400).send({ error : 'invalid update' })
    }
                                                        
    try{
        const task = await Task.findByIdAndUpdate(req.params.id , req.body , { new : true, runValidators: true})
                                                        
        if(task===null){
            res.status(404).send()
        }
                                                        
        else{
            res.send(task)
        }
    }
    catch(e)
    {
        res.status(400).send()
    }
})

app.delete('/tasks/:id' , async(req,res) => {
    try 
    {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(task===null)
        {
            res.status(404).send()
        }

        else
        {
            res.send(task)
        }
    } 
    
    catch(e)
    {
        res.status(500).send()
    }
}) 



app.listen(port, ()=>{
    console.log("server is on port "+port);
})  

*/





// ------------------------------------------------------------------------ code WITHOUT Async Await ---------------------------------------------------------------------
/*




const express = require('express');
require("./db/mongoose");   // for connecting to the database ( compass app)
const User = require('./models/user');  // here we define  / given reference of model user which is a seperate file .  
const Task = require('./models/task');  // here we define  / given reference of model task which is in a seperate file . 

const app = express();
const port = process.env.PORT || 5000

app.use(express.json())


//---------------------------------------------------------------------------- User ----------------------------------------------------------------------------

                                                    // here we have created 1st rest api route 
                                                    // route for creating new user =  start           // route is like /about, /help ,etc 
app.post('/users', (req,res)=>{                     // '/users' is what we will give in = localhost:5000/users in mongodb database
    const user = new User(req.body);

    user.save()
        .then( ()=>{
            console.log(req.body)
            res.status(201).send(user)
        })
        .catch( (e)=>{ 
            res.status(400).send(e)
        })
})
                                                                // user rest api route =  over


                                                // (this route is for fetching / reading all users) =  start   
app.get('/users', (req,res)=>{                // '/users' is what we will give in = localhost:5000/users in mongodb database
    User.find({})
        .then((users) => { 
            res.send(users) 
        })
        .catch((e) => { 
            res.status(500).send(e)
        })
})
                                                        // user rest api route =  over


                                                    // (this route is for fetching / reading 1 user based on id) =  start   
app.get('/users/:id', (req,res)=>{                // '/users' is what we will give in = localhost:5000/users in mongodb database
    const _id = req.params.id

    User.findById(_id)
    .then((user) => { 
        if(user === null)
        {
            return res.status(404).send()
        }  
        
        else
        {
            return res.send(user) 
        }
        
    })
    .catch((e) => { 
        res.status(500).send(e)
    })
})
                                                    // user rest api route =  over





// ---------------------------------------------------------------------------- Task ----------------------------------------------------------------------------


                                                                // route for creating new task =  start  
app.post('/tasks' , (req,res)=>{                    // '/tasks' is what we will give in = localhost:5000/tasks in mongodb database
    const task = new Task(req.body);

    task.save()
        .then( ()=>{
            console.log(req.body)
            res.status(201).send(task)
        })
        .catch( (e)=>{ 
            res.status(400).send(e)
        })
})
                                                                // task rest api route =  over

                                                            // route for fetching / reading all tasks = start
app.get('/tasks' , (req,res) => {
    Task.find({})
        .then((tasks) => { 
            res.send(tasks) 
        })
        .catch((e) => { 
            res.status(500).send(e)
        })
})
                                                            // task rest api route =  over



                                                        // route for fetching / reading all tasks = start
app.get('/tasks/:id' , (req,res) => {
    const _id = req.params.id ;

    Task.findById(_id)
    .then((task) => { 
        if(task === null)
        {
            return res.status(404).send()
        }  
        
        else
        {
            return res.send(task) 
        }
    })
    .catch((e) => { 
            res.status(500).send(e)
    })
})
                                                        // task rest api route =  over                                                                                                                              //task rest api route =  over

app.listen(port, ()=>{
    console.log("server is on port "+port);
})  


*/
 


// const main = async () => { 
//     // const task = await Task.findById('650c35315f23805e33c9e033')
//     // await task.populate('owner')
//     // console.log(task);

//     const user = await User.findById('650c32f0d50c0167667130a7')
//     await user.populate('mytasks')  // user will now be able to access task things. mytasks is a virtual/temp space in user database through which we will access anything of tasks.
//     /*  console.log(user.mytasks)
//             [
//             {
//                 _id: new ObjectId("650c35315f23805e33c9e033"),
//                 discription: 'this is created by kunj',
//                 completed: false,
//                 owner: new ObjectId("650c32f0d50c0167667130a7"),
//                 __v: 0
//             },
//             {
//                 _id: new ObjectId("650d1fcf156e2157c7794710"),
//                 discription: 'today i am at home',
//                 completed: false,
//                 owner: new ObjectId("650c32f0d50c0167667130a7"),
//                 __v: 0
//             }
//             ]
//     */
// }

// main() 