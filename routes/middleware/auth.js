const jwt = require(`jsonwebtoken`);


const generateToken = (signObj,key) => {
    return jwt.sign(
        signObj,key
    )

}

const authenticate = (req, res, next) => {
    const bearer = req.headers["authorization"];
    if(!bearer){
        res.status(401).send({
            "error":"Unauthorized Access"
        })
    }
    else{
        jwt.verify(bearer, process.env.JWTKEY,
            (err,user) => {
                if(err){
                    res.status(401).send({
                        "error":"Invalid Token"
                    });
                }
                req.user = user;
                next();
            })

    }

}
module.exports = 
                {
                    generateToken,
                    authenticate,
                }