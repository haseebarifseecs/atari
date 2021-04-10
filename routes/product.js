const router = require('express').Router();
const { authenticate } = require("./middleware/auth")
router.get("/",authenticate, async function(req,res){
    const role = req.user.role;
    if(role !== "admin"){
        res.status(401).send(
            {
                "status":"Invalid Access",
                "message":"Only Admin Can Access this Route"
            }
        )
    }else{
        res.status(200).send({
            "products":["sample Product1", "sample Product 2"]
        });
    }
})


module.exports = router;