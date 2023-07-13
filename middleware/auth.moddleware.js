const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token =  req.headers.authorization;
    console.log(token)
    if(token){
        try{
            const decode = jwt.verify(token,"blog");
            console.log(decode)
            if(decode){
                console.log( req.body.userID,decode.userID)
                req.body.userID =decode.userID;
                next()
            }else{
                // console.log("err")
                res.status(404).send({"Error" : "Invalid access token"})
            }
        }catch(err){
            console.log(err)
        res.status(404).send({"error" : err.message})
        }
    }else{
        res.status(401).send({"ERROR":"Please login!!"})
    }
}

module.exports = {
    auth
}