const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./confiq/db.js');
const authRoutes =require('./routes/authRoutes.js');  
const errorHandler = require('./middlewares/errorMiddleware.js');
// dotenv
dotenv.config();
// rest object
const app = express();
// middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(errorHandler)
// connect mongoose
connectDB();
// API routes
app.use('/api/v1/auth',authRoutes) ;
app.use("/api/v1/openai", require("./routes/openaiRoutes"));
// listen server
app.listen(8080,()=>{console.log("server Started")} )