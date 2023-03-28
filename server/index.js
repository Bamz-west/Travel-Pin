const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

dotenv.config();

// to use data from a post request i.e req.body
app.use(express.json());

app.use(cors());

// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     next(); 
// })

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => console.log(err));

app.use('/api/pins', pinRoute);
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
    res.send("its working");
})

app.listen(process.env.PORT || 8800, () => {
    console.log("Backend server is running!!!");
});