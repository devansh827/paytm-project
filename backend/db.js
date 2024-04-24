const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://devanshs288:Accenture%4023@cluster0.vsg5otw.mongodb.net/paytm_db');
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    
     },
    password:{
        type:String,
        required:true,
    },

    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
});


const accountSchema=new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    balance:{
        type:Number,
        required:true,
    }
})

module.exports = mongoose.model('User', UserSchema);

module.exports = mongoose.model('Account', accountSchema);