const User = require('../models/auth.model.js')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const { errorHandler } = require('../utills/error.js')
const emailvalidator = require("email-validator")


const registerUser = async (req,res,next)=>{
    try {
        const { username , email , password } = req.body;
        if(!username || !email || !password){
            return next(errorHandler(401,'Fill all fields'))
        }
        if(!emailvalidator.validate(email)){
            return next(errorHandler(400,'Invalid Email'))
      }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return next(errorHandler(403,"User Already Exist"));
        }
        if(password.length > 6){
            if(/[A-Z]/.test(password)){
                if(/[a-z]/.test(password)){
                    if(/[!#%&@]/.test(password)){
                        if(/[0-9]/.test(password)){
        const newUser = await User.create({
            username,
            email,
            password:bcrypt.hashSync(password,10)
        });
        res.status(200).json("User created successfully");
                        }
                        else{
            return next(errorHandler(422, "Password should contain at least one number"))
                        }
                    }
                    else{
                        return next(errorHandler(422, "Password should contain at least one of these letters @#!%&"))
                    }
                }
                else{
                    return next(errorHandler(422, "Password should contain at least one lowercase letter"))
                }
            }
            else{
                return next(errorHandler(422, "Password should contain at least one uppercase letter"))
            }
        }
        else{
            return next(errorHandler(422, "Password should contain more than 6 letters"))
        }

    } catch (error) {
        next(error)
    }
}

const loginUser = async (req,res,next)=>{
    try {
        const { email ,password } = req.body;
        if(!email || !password){
            return next(errorHandler(401,"Fill all fields"))
        }
        const userExist = await User.findOne({email});
        if(!userExist){
            return next(errorHandler(404,"User not found"))
        } 
        const isValidPass = bcrypt.compareSync(password,userExist.password)
        if(!isValidPass){
            return next(errorHandler(401,"Wrong credentials"))
        }
        const token =  jwt.sign({
            id:userExist._id
        },process.env.JWT)

        const { password:pass , ...rest } = userExist._doc;

        res
        .cookie("authentic_Token",token,{httpOnly:false})
        .status(200)
        .json(rest)

    } catch (error) {
        next(error)
    }
}

const signOutUser = async (req,res,next)=>{
    try {
        res.clearCookie('authentic_Token');
        res.status(200).json('User signout.')
    } catch (error) {
        next(error);
    }
}

module.exports = { signOutUser , loginUser , registerUser }