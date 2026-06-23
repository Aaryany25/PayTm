import jwt from "jsonwebtoken"
export function AuthMiddleware(req,res,next){
    const autHeader = req.headers.authorization

    if(!autHeader || !autHeader.startsWith("Bearer ")){
        console.log("AuthMiddleware hit")
        return res.status(403).json({
            message:"You are not logged in"
        })
    }
    const token = autHeader.split(" ")[1]

    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decodedToken.userId
        next()
        
    } catch (error) {
        return res.status(403).json({});
    }
}