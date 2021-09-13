const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken')



router.post('/register', async (req,res) =>{


    // check if an email is already registered
    const emailExist = await User.findOne({ email:req.body.email } )
    
    if (emailExist) return res.status(400).send('Email already in use');

    // hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);




    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
        
    });
    try{

        const savedUser = await user.save()
        res.send(savedUser)
    }
    catch(err){
        console.log(req.body)        
        res.status(400).send(err);
    }    

});


router.post('/login', async (req,res)=>{
    
    // check if email is registered 

    const user = await User.findOne({ email: req.body.email });

    if(!user) return res.status(400).send('Wrong email or password!');

    // check password


    const validPass = await bcrypt.compare(req.body.password,user.password);
    if (!validPass) return res.status(400).send('Invalid Password');


    // Create and assign a token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);

})






module.exports = router;


