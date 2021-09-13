const router = require('express').Router();
const Ratios = require('../model/Ratios');
const verify = require('./verifyToken');


router.post('/add', verify, async(req,res)=>{





  const ratios = new Ratios ({

    base : req.body.base,
    ratios: req.body.rates

  })

  try{

    const savedRatios = await ratios.save()
    res.send(`You succesfully added a new currency`)
}
catch(err){
    console.log(req.body)        
    res.status(400).send(err);
}    

});

router.get('/all',verify, async( req, res)=>{

	if (!verify) return res.status(401).send('Restriced Area Please login to access')




    try{
        const rates = await Ratios.find({});
        if (!rates) return res.status(400).send('No rates found');
        res.send(rates)
        console.log('got all currencies')
    }
    catch(err){
        console.log(err)
    }
});

router.post('/remove', verify, async(req,res)=>{

    const base = req.body.base;

    try{
         const currencies = await Ratios.findOneAndDelete({base: base})

        res.send(`You have deleted ${base} currency`)

    }
    catch(err){
        res.status(400).send('There was an error could not delete this base currency')

    }

})







router.get('/base', async(req,res)=>{
    const userBase = req.body.base;
    const base = await Ratios.findOne({base:userBase})

    if (!base) return res.status(400).send('No such a base currency')

    try {

        res.send(base)

    }

    catch(err){
        res.send(err)
    }


})

router.post('/update', verify, async(req,res)=>{

    const filter =  {base: req.body.base};
    const update = {ratios:[req.body.rates]}
    console.log(filter);
    const newRatios = await Ratios.findOneAndUpdate(filter,update);

   console.log(newRatios);
    if (!newRatios) return res.status(400).send('No such a base currency');

    try {
        res.send('The ratios have succesfully updated')

    }
    catch(err){
        res.status(400).send('An error has occured')
    }

})



router.post('/convert', verify, async(req,res)=>{

    let base = req.body.base;
    let target = req.body.target;
    let amount = req.body.amount;


    const getRatios = await Ratios.findOne({base: base})    
    const allRatios = getRatios.ratios[0];
    const ratio = allRatios[target];
    const converted = amount*ratio;
    
  
    

    
    
    if(!getRatios) return res.status(400).send('No such a currency found')

    try{         
     res.json(converted)        
        
    }

    catch(err){

        console.log('Something Went wrong');
        

    }





})








module.exports = router;