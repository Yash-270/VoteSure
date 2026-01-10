const express=require('express');
const router=express.Router();
const User=require('../models/user');
const Candidate=require('../models/candidate');
const {jwtAutMidd, generateToken}= require('./../jwt');

const checkAdmin= async(userId)=>{
    try{
        const user=await User.findById(userId);
        return user.role === 'admin';
    }catch(err){
        return false;
    }
}
router.post('/',jwtAutMidd,async(req,res)=>{
    try{
        if(!await checkAdmin(req.user.id))
            return res.status(404).json({message: 'user has not admin status'});
        const data=req.body;
        const newCandidate = new Candidate(data);
        const reso = await newCandidate.save();
        console.log('data saved');
        res.status(200).json({reso: reso});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});
router.put('/:candidateID',jwtAutMidd,async (req,res)=>{
    try{
        if(!await checkAdmin(req.user.id))
            return res.status(403).json({message: 'user has not admin status'});
        const candidateID = req.params.candidateID;
        const updinfo=req.body;
   
        const reso=await Candidate.findByIdAndUpdate(candidateID,updinfo,{
            new: true,
            runValidators: true,
        });
        
        if(!reso){
            return res.status(404).json({error: 'Candidate not found'});
        }
        console.log('data updated');
        res.status(200).json(reso);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});
router.post('/vote/:candidateID',jwtAutMidd,async (req,res)=>{
    try{
        const candidateID = req.params.candidateID;
        const candidate=await Candidate.findById(candidateID);
        if(!candidate){
            return res.status(404).json({error: 'Candidate not found'});
        }
        const userId=req.user.id;
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({message: 'user not found'});
        }
        if(user.isVoted){
            return res.status(404).json({message: 'already voted'});
        }
        if(user.role === 'admin'){
            return res.status(403).json({message: 'admin is not allowed '});
        }
        candidate.votes.push({user: userId});
        candidate.voteCount++;
        await candidate.save();
        user.isVoted=true;
        await user.save();
        res.status(200).json({message: 'Voted successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});
//vote count

router.get('/vote/count',async(req,res)=>{
    try{
        const candidate=await Candidate.find().sort({voteCount: 'desc'});
        const voterecord=candidate.map((data)=>{
            return{
                party: data.party,
                count: data.voteCount
            }
        });
        return res.status(200).json(voterecord);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});
//list of candidates
router.get('/list',async(req,res)=>{
    try{
        const candidate= await Candidate.find();
        const list=candidate.map((data)=>{
            return{
                _id: data._id,
                name: data.name,
                party: data.party,
                age: data.age,
                image:data.image,
            }
        });
        return res.status(200).json(list);
    }
    catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal Server Error'}); 
    }
});

// router.delete('/:candidateID',jwtAutMidd,async(req,res)=>{
//     try{
//         if(!await checkAdmin(req.user.id))
//             return res.status(403).json({message: 'user has not admin status'});
//         const candidateID=req.params.candidateID;
//         const reso=await Candidate.findByIdAndDelete(candidateID);
//         if(!reso){
//             return res.status(404).json({error: 'Person not found'});
//         }
//         console.log("Data deleted");
//         res.status(200).json(reso);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// });

router.delete('/:candidateID', jwtAutMidd, async (req, res) => {
  try {
    console.log("PARAMS:", req.params);
    console.log("FULL URL:", req.originalUrl);

    const isAdmin = await checkAdmin(req.user.id);
    if (!isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const candidateID = req.params.candidateID;

    const reso = await Candidate.findById(candidateID);
    console.log("FOUND CANDIDATE:", reso);

    if (!reso) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    await Candidate.findByIdAndDelete(candidateID);

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports=router;