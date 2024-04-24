const express = require('express');
const {authMiddleware}=require("../middleware")
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
    const body=req.body;
    const {success}=signupSchema.safeParse(req.body);
    let {username, password,firstName,lastName} = req.headers;
     
    if(!success){
        return res.json({
            message:"incorrect inputs"
        })
    }
    try{
        let existingUser = await User.findOne({username : username});
        if(existingUser){
            res.status(411).json("user already exists");
        } else{
            let obj = new User({
                username,
                password,
                firstName,
                lastName
            });
            let dbUser = await obj.save();
            const token=jwt.sign({
                userId:dbUser._id
            },JWT_SECRET);
          
            res.json({
                message:"user created successfully",
                token:token
            })
           
        }
    } catch(err){
        res.status(501).json("internal server error");
    }


});


router.post('/signin', async (req, res) => {
    let {username, password} = req.body;

  
    try{
        let instance = await User.findOne({username : username});
      
        if(instance){
            if(instance.username == username && instance.password == password){
                const token = jwt.sign({username : username}, jwtPassword);
                
                res.status(211).json({token : token});
            } else{
                res.status(411).json("password is incorrect");
            }
        } else{
            res.status(411).json("username doesn't exist please signup");
        }
    } catch(err){
        res.status(511).json("internal server error");
    }
});

router.put('/',authMiddleware,async(req,res)=>{
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

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})





module.exports=router;