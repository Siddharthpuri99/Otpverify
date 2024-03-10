// const users = require("../models/userSchema")
// const userotp = require("../models/userOtp");
// const nodemailer = require("nodemailer");
// // import {PASS, EMAIL} from env;


// const taransporter = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:process.env.EMAIL,
//         pass:process.env.PASSWORD
//     }
// })

// exports.userregister = async(req,res)=>{
//     const {fname,email,password} = req.body;
//     if(!fname || !email || !password){
//         res.status(400).json({error:"Please Ebter All iNPUT DATA"});
//     }
//     try{
//         const preusers = await users.findOne({email:email});
//         if(preusers){
//             res.status(400).json({error:"this user is Already exist"});
//         } else{
//             const userregister = new users({
//                 fname,email,password
//             });
//             const storeData = await userregister.save();
//             res.status(200).json(storeData);

//             //hasing password.....
//         }
//     }
//     catch(error){
//         res.status(400).json({error:"Invalid Details",error});
//     }
// };

// exports.userotpSend = async(req,res)=>{
//     const {email} = req.body;
//     if(!email){
//         res.status(400).json({error:"Please enter Your Email..."});
//     }
//     try{
//         const presuer = await users.findOne({email:email});
//         if(presuer){
//             const OTP = Math.floor(100000*Math.random()*900000);

//             const existEmail = await userotp.findOne({email:email});
//             if(existEmail){
//                 const updateData = await userotp.findByIdAndUpdate({_id:existEmail._id},{
//                     opt:OTP
//                 },{new:true})
//                 await updateData.save();

//                 const mailOptions = {
//                     from :process.env.EMAIL,
//                     to:email,
//                     subject:"Sending Email for Otp Validaion",
//                     text:`OTP:- ${OPT}`
//                 }
//                 taransporter.sendMail(mailOptions, (error, info) => {
//                     if (error) {
//                         console.log("error", error);
//                         res.status(400).json({ error: "email not send" })
//                     } else {
//                         console.log("Email sent", info.response);
//                         res.status(200).json({ message: "Email sent Successfully" })
//                     }
//                 })


//             } else{
//                 const saveOtpData = new userotp({
//                     email,otp:OTP
//                 });
//                 await saveOtpData.save();
//             }
//         } else{
//             res.status(400).json({error:"this user not exist"});
//         }
//     }
//     catch(error){
//         res.status(400).json({error:"Invalid Details"});
//     }
// }

const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

exports.userregister = async (req, res) => {
    const { fname, email, password } = req.body;
    if (!fname || !email || !password) {
        return res.status(400).json({ error: "Please Enter All Input Data" });
    }

    try {
        const preUser = await users.findOne({ email: email });

        if (preUser) {
            return res.status(400).json({ error: "This user is already exist" });
        } else {
            const userRegister = new users({
                fname,
                email,
                password
            });

            // Hashing password logic here...

            const storedData = await userRegister.save();
            return res.status(200).json(storedData);
        }
    } catch (error) {
        return res.status(400).json({ error: "Invalid Details", error });
    }
};

exports.userotpSend = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Please enter your email" });
    }

    try {
        const preUser = await users.findOne({ email: email });

        if (preUser) {
            const OTP = Math.floor(100000 + Math.random() * 900000);

            const existEmail = await userotp.findOne({ email: email });

            if (existEmail) {
                existEmail.otp = OTP;
                await existEmail.save();
            } else {
                const saveOtpData = new userotp({
                    email,
                    otp: OTP
                });

                await saveOtpData.save();
            }

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Sending Email for OTP Validation",
                text: `OTP: ${OTP}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error:", error);
                    return res.status(400).json({ error: "Email not sent" });
                } else {
                    console.log("Email sent:", info.response);
                    return res.status(200).json({ message: "Email sent successfully" });
                }
            });
        } else {
            return res.status(400).json({ error: "This user does not exist" });
        }
    } catch (error) {
        return res.status(400).json({ error: "Invalid Details" });
    }
};

// exports.userLogin = async(req,res)=>{
//     const {email,otp} = req.body;
//     if(!otp || !email){
//         res.status(400).json({error:"please enter your OTP"})
//     }
//     try{
//         const  otpverification = await userotp.findOne({email:email});
//         if(otpverification.otp === otp){
//             const preuser = await users.findOne({email:email});

//             const token = await preuser.generateAuthtoken();
//             console.log(token);
//         }
//         else{
//             res.status(400).json({error:"Invalid Otp "})
//         }
//     } catch(error){
//         res.status(400).json({ error: "Invalid Details",error });
//     }
// }

 exports.userLogin = async (req, res) => {
    const { email, otp } = req.body;
 
    if (!otp || !email) {
       return res.status(400).json({ error: "Please enter your OTP and email" });
    }
 
    try {
       const otpVerification = await userotp.findOne({ email: email });
 
       if (otpVerification) {
          if (otpVerification.otp === otp) {
             const preuser = await users.findOne({ email: email });
 
             if (preuser) {
                const token = await preuser.generateAuthToken();
                // Consider securely sending the token to the client or handling it as needed
 
                return res.status(200).json({ message:"User successfully login",userToken: token });
                console.log(token);
             } else {
                return res.status(400).json({ error: "User not found" });
             }
          } else {
             return res.status(400).json({ error: "Invalid OTP" });
          }
       } else {
          return res.status(400).json({ error: "OTP record not found" });
       }
    } catch (error) {
       if (error.name === 'MongoError' && error.code === 11000) {
          return res.status(400).json({ error: 'Duplicate key error' });
       }
       return res.status(500).json({ error: "Internal Server Error", error });
    }
 };
 
