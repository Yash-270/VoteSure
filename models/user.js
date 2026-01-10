const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    mobile:{
        type: String
    },
    email:{
        type:String
    },
    address:{
        type:String,
        required: true
    },
    aadharCardNo:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        required: true,
        type: String
    },
    role:{
        type: String,
        enum:['voter','admin'],
        default: 'voter'
    },
    isVoted:{
        type: Boolean,
        default: false
    }
});
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch{
        throw err;
    }
}
const User=mongoose.model('User',userSchema);
module.exports = User;