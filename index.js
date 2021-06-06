const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
//impost routes
const authRoute = require("./Routes/auth");
const productRoute = require("./Routes/Products");
const category = require("./Routes/category");
const order = require("./Routes/order");
const UploadFile = require('./Routes/UploadFile');
dotenv.config()
app.use(cors())
//connect mongoose
mongoose.connect(
    process.env.DB_LOCALHOST,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connect to db"));

//middleware
app.use(express.json())

//route middleware
app.use("/api/user", authRoute)
app.use('/upload', express.static('upload'))
app.use("/api/product", productRoute)
app.use("/api/category", category)
app.use("/api/order", order)
app.use('/api/uploads', UploadFile);
app.listen(8080, () => console.log("server up and running"));
