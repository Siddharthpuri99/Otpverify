const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose.connect(DB,{
    
}).then(()=>console.log("DATABASES Connected")).catch((error)=>console.log("ERROR",error));
