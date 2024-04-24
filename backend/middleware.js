const {JWT_SECRET}=require("./config");
const jwt=require("jsonwebtoken")




 const authMiddleware=(req, res, next) =>{
    let {authorization} = req.headers;
    if(!authorization||!authorization.startsWith('Bearer ')){
       return res.status(411).json("you are not authenticated");
        
    }
    const words = authorization.split(" "); 
    const jwtToken = words[1]; 
    try {
        const decodedValue = jwt.verify(jwtToken,JWT_SECRET);
         req.userId=decodedValue.userId;
         next();
    } catch(e) {
       return res.status(403).json({});
    }    
}

module.exports = {authMiddleware};

// const { JWT_SECRET } = require("./config");
// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(403).json({});
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);

//         req.userId = decoded.userId;

//         next();
//     } catch (err) {
//         return res.status(403).json({});
//     }
// };

// module.exports = {
//     authMiddleware
// }