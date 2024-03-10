require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./Routes/router.js")
// const cors = require("cors");
const PORT = 4002;
require("./db/conn");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(router);
app.listen(PORT,()=>{
    console.log(`SERVER IS STARTED AT PORT NO ${PORT}`);
});