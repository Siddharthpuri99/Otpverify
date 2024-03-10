const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "abcdefghiklmnop"
// "fname":"",
//     "email":"",
//     "password":"",
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not Valid Email");
            }
        }

    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    token:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ]
});

//hashpassword........
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})

//token generated......
// userSchema.methods.generateAuthtoken = async function(){
//     try{
//         let newtoken = jwt.sign({_id:this._id},SECRET_KEY,{
//             expiresIn:"1d"
//         });
//         this.tokens = this.tokens.concat({token:newtoken});
//         await this.save();
//         return newtoken;

//     } catch(err){
//         res.status(400).json({ error: "Invalid Details" ,error});
//     }
// }
userSchema.methods.generateAuthToken = async function () {
    try {
        let newtoken = jwt.sign({ _id: this._id }, SECRET_KEY, {
            expiresIn: "1d",
        });
        this.token = this.token.concat({ token: newtoken }); // Use this.token instead of this.tokens
        await this.save();
        return newtoken;
    } catch (err) {
        // Throw the error so it can be handled elsewhere
        throw new Error("Error generating authentication token");
    }
};
const users=  new mongoose.model("users",userSchema);
module.exports = users;