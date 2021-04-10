require("dotenv").config();
const express = require("express");
// Express as a middleware to handle routing
const app = express();
const productRoute = require("./routes/product");
const usersRoute = require("./routes/users");
// Defining routes handlers

app.use('/product',productRoute);
app.use('/users',usersRoute);



// Server Listener
app.listen(process.env.port,()=>{
    console.log(`Server started on ${process.env.port}`);
}).on(`error`, (err)=>{
    console.error(err);
});