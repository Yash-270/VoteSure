const express=require('express');
const router=express.Router();
const User=require('../models/user');
const {jwtAutMidd, generateToken}= require('./../jwt');
router.post('/signup', async(req,res)=>{
    try{
        const data=req.body;
        const newUser = new User(data);
        const reso = await newUser.save();
        console.log('data saved');
        const payload={
            id: reso.id
        }
        console.log(JSON.stringify(payload))
        const token=generateToken(payload);
        console.log("Token is : ",token)
        res.status(200).json({reso: reso, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});
router.post('/login',async(req,res)=>{
    try{
        const {aadharCardNo,password} = req.body;
        const user = await User.findOne({aadharCardNo: aadharCardNo});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or Password'});
        }
        const payload ={
            id: user.id
        }
        const token = generateToken(payload);
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
//profile route
router.get('/profile',jwtAutMidd,async (req, res)=>{
    try{
        const userData=req.user;
        console.log("UserDta is: ",userData);
        const userid = userData.id;
        const user = await User.findById(userid);
        res.status(200).json({user});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
});

// router.get('./:id',async(req,res)=>{
//     try{
//         const id=req.params.id;
//         if(id=='' || id=='manager' || id=='waiter'){
//             const reso=await User.find({work: id});
//             console.log('res fetch');
//             res.status(200).json(reso);
//         }
//         else{
//             res.status(404).json({error: 'Ivalid work'});
//         }
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }

// });
router.put('/profile/password',jwtAutMidd,async (req,res)=>{
    try{
        const userId= req.user.id;
        const {currentPassword,newPassword}= req.body;
        const user= await User.findById(userId);
        if(!(await user.comparePassword(currentPassword))){
            return res.status(404).json({error: 'Invalid Password'});
        }
        user.password=newPassword;
        await user.save();
        console.log("Password is changed");
        console.log('data updated');
        res.status(200).json({Message: "Password Updated"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports=router;