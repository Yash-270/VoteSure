const mongoose=require('mongoose');

require('dotenv').config();
const mongoURL=process.env.MONGODB_URL_LOCAL;
//const mongoURL='mongodb+srv://kyash4634:QWERTY1234@cluster0.stogbez.mongodb.net/'

//const mongoURL=process.env.MONGO_URI;
if (!mongoURL) {
    console.error("❌ MONGO_URI is undefined! Check your .env file");
    process.exit(1);
}
mongoose.connect(mongoURL)
    .then(() => console.log("MongoDB Connected 🚀"))
    .catch(err => console.log("MongoDB Error ❌", err));
const db=mongoose.connection;
// db.on('connected',() => {
//     console.log('connected to mongodb server');
// });
// db.on('error',(err)=>{
//     console.log('Mongodb Disconnected');
// });
db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});
module.exports=db;
