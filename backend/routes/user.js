const express = require('express');
const {authMiddleware}=require("../middleware")
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
 const zod=require("zod");
// Single routing
const router = express.Router();

let signupSchema = zod.object({
    username : zod.string(),
    password: zod.string(),
  firstName: zod.string(),
    lastName :zod.string()
})

let updateBody= zod.object({
    password: zod.string(),
  firstName: zod.string(),
    lastName :zod.string()
})
router.post('/signup', async (req, res) => {
    const {success}=signupSchema.safeParse(req.body);
     
    if(!success){
        return res.json({
            message:"incorrect inputs"
        })
    }
    
    try{
        const existingUser = await User.findOne({username : req.body.username});
        console.log(existingUser)
        if(existingUser){
            return res.status(411).json("user already exists");
        } else{
            const user = await User.create({
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            })

            console.log(user)
            const userId = user._id;
            console.log(userId)
        
            await Account.create({
                userId,
                balance: 1 + Math.random() * 10000
            })
        
            const token = jwt.sign({
                userId
            }, JWT_SECRET);
        
            res.json({
                message: "User created successfully",
                token: token
            })
           
        }
    } catch(err){
        console.log(err)
        return res.status(501).json("internal server error");
    }


});


router.post('/signin', async (req, res) => {
    let {username, password} = req.body;

    try{
        let instance = await User.findOne({username : username});
        if(instance){
            if(instance.username == username && instance.password == password){
                const token = jwt.sign({
                    userId: instance._id
                }, JWT_SECRET);
                console.log(token)
                res.status(211).json({token : token});
            } else{
                res.status(411).json("password is incorrect");
            }
        } else{
            res.status(411).json("username doesn't exist please signup");
        }
    } catch(err){
        console.log(err)
        res.status(511).json("internal server error");
    }
});

router.put('/',authMiddleware,async (req,res)=>{
 const{success}=updateBody.safeParse(req.body)

 if(!success){
    res.status(411).json({
        message:"Error while updating information"
    })
 }

 await User.updateOne(req.body,{
    id:req.userId
 })

 res.json({
    message:"updated successfully"
 })
})


router.get("/bulk",async(req,res)=>{
    const filter=req.query.filter

    const users=await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastname:{
                "$regex":filter
            }
        
        }]
    })

    return res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})





module.exports=router;