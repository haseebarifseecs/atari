const router = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const USER = require("../models/usersModel");
const { encrypt } = require("../models/encryption/passEncrypt");
const { generateToken } = require("./middleware/auth");
const { authenticate } = require("./middleware/auth");
require("../database");
require("dotenv").config()

router.get("/", authenticate, async function(req,res){
    const role = req.user.role;
    if(role !== "manager"){
        res.status(401).send(
            {
                "status":"Invalid Access",
                "message":"Only Manager Can Access this Route"
            }
        )
    }else{
        const users = await USER.find({});
        res.status(200).send(users);
    }
})

router.post("/login",jsonParser, async function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password){
        res.status(400).send({
            "error":"Authorization Failed",
            "message":"Email or Password Cannot be empty"
        })
    }else{
        try{
            const user = await USER.findOne(
                {
                    email:email,
                }
            )
            if(user){
                // console.log(user);
                // console.log(user.password);
                const existingPassword = user.password;
                const userSalt = existingPassword.split("salt=").pop(); //This will give us the salt of user hash
                const userHash = existingPassword.split("salt=")[0]; //This will give us the Sha512 Hash
                const check = encrypt(password, userSalt).passwordHash;
                // console.log(userHash);
                // console.log(check);
                if (check === userHash){
                    // Validated
                    const token = generateToken(
                        {
                            "ssid":user._id,
                            "name":user.name,
                            "role":user.role
                        },
                            process.env.JWTKEY
                        );
                    // console.log(token);
                    res.status(200).header(
                        'Authorization',token
                    ).send(
                        {
                            "status":"success",
                        });
                    // console.log("Matched");
                }
                else{
                    res.status(400).send(
                        {
                            "error":"Authorization Failed",
                            "message":"Invalid email or password"
                        }
                    )
                
                }
                

            }else{
                res.status(400).send(
                    {
                        "error":"Authorization Failed",
                        "message":"Invalid email or password"
                    }
                )
            }
        }catch(err){
            res.status(400).send(err);
        }
    }


})

router.post("/create",jsonParser, async function(req,res){
    const user = new USER(
        {
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,
            role:req.body.role,
        }
    );
    try{
        await user.save();
        res.status(200).send(
            {
                "success":"User Created Successfully"
            }
        );
    }catch(err){
        if(err.code === 11000){
            res.status(400).send( {
                "error":"Validation Error",
                "message":"Email is taken already"
            })
        }else{
            res.status(400).send(
                {
                    "error":err.name,
                    "message":err.message
                }
            );
        }
        
    }
})

module.exports = router;