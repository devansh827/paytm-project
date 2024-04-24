const {JWT_SECRET}=require("./config");
const jwt=require("jsonwebtoken")




async function authMiddleware(req, res, next) {
    let {authorization} = req.headers;
    if(!authorization||!authorization.startsWith('Bearer ')){
       return res.status(411).json("you are not authenticated");
        
    }
    const words = authorization.split(" "); 
    const jwtToken = words[1]; 
    try {
        const decodedValue = jwt.verify(jwtToken, jwtPassword);
        if (decodedValue.userId) {
            req.userId=decodedValue.userId;
            next();
        } else {
            res.status(403).json({
                msg: "you don't have the right token signin again"
            })
        }
    } catch(e) {
        res.json({
            msg: "Incorrect inputs"
        })
    }    
}

module.exports = authMiddleware;