// Express.js A web framework for Node.js allows for the creation of server-side applications, routing & handling HTTP requests and responses. 
const express = require('express');
// Initialize an instance of express
const app = express();


// CORS (Cross-Origin-Resource-Sharing) middleware for allowing cross-origin requests
const cors = require("cors");

// express.json is used to parse incoming JSON data in HTTP requests 
app.use(express.json());
// Middleware to enable CORS for all routes
app.use(cors());

// Import database models
const db = require('./models');

// Routers for different endpoints
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);
const adminRouter = require("./routes/Admins");
app.use("/auth/admin", adminRouter);
const shelterRouter = require("./routes/Shelters");
app.use("/auth/shelter", shelterRouter);
const animalRouter = require("./routes/Animals");
app.use("/auth/animals", animalRouter);


//app.post("/upload", upload.single("image"),(req, res) =>{
//    const image = req.file.filename;
//    const sql = "UPDATE ImageTests SET picture = ?"
//    db.query(sql, [image], (err, result) =>{
//        if(err) return res.json({Message: "error"});
//        return res.json({status: "Success"});
//    })
//})

// sequalize an ORM library for Node.js it enables database interactions using JS objects 
// Sync the models with the database
// A promise .then is waiting for a callback
db.sequelize.sync().then(()=>{
    // Listen for a incoming HTTP requests on port 3002, once the call is received, create the connection.
    app.listen(3002, ()=> {
        console.log("Server active on port 3002");
    });
});