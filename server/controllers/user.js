import bcrypt from "bcryptjs";
import  Jwt  from "jsonwebtoken";
import   UserModel from "../models/user.js"

const secret= "test";
export const signin = async (req,res)=>{
    const {email,password}=req.body;
    try  {
        const oldUser=await UserModel.findOne({email});
        if(!oldUser) return res.status(404).json({message:"user doesn't exists"});

    const isPasswordCorrect = await bcrypt.compare(password,oldUser.password);
    if(!isPasswordCorrect) return res.status(404).json({message:"inavailid credential"})
    const token =Jwt.sign({email:oldUser.email, id: oldUser._id},secret,{expiresIn:"1h"});
    res.status(200).json({result : oldUser,token});
    } catch(error){
        res.status(500).json({message: "somethingwent worng"})
        console.log(error);
    }
}
export const signup = async (req,res)=>{
    const {email,password,firstName,lastName}=req.body;
    try {
        const oldUser=await UserModel.findOne({email});
        if(oldUser){
            return res.status(400).json({message:"user alredy exists"})
        }
        const hashedPassword=await bcrypt.hash(password,12);
        const result = await UserModel.create({
            email,
            password:hashedPassword,
            name: `${firstName} ${lastName}`
        })
        const token =Jwt.sign({email:result.email, id: result._id},secret,{expiresIn:"1h"});
   res.status(201).json({result,token});
    } catch (error){
        res.status(500).json({message: "somethingwent worng"})
        console.log(error);
    }
}

export const googleSignIn =async(req,res)=>{
    const {email,name,token,googleId}=req.body


try {
    const oldUser=await UserModel.findOne(email)
    if(oldUser){
        const result= {_id:oldUser._id.toString(),email, name}
        return res.status(200).json({result,token})
    }
    const result= await UserModel.create({
        name,
        email,
        googleId
    })
    res.status(200).json({result,token})
}catch (error){
    res.status(500).json({message: "somethingwent worng"})
    console.log(error);
}

}