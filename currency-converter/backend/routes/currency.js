const router = require('express').Router();
const Currency = require ('../model/Currency');

router.post('/add', async(req,res)=>{

    const currency = new Currency ({
        currencyName: req.body.currencyName,
        currencySymbol: req.body.currencySymbol,
        currencyId: req.body.currencyId
        
    });
    try{

        const savedCurrency = await currency.save()
        res.send(savedCurrency)
    }
    catch(err){
        console.log(req.body)        
        res.status(400).send(err);
    }    

    
})


router.get('/read', async(req,res)=>{

    const currency = await Currency.findOne({ currencyId: req.body.currencyId });
    if(!currency) return res.status(400).send('No such a currency found');  


    res.send(currency);
    console.log('found a record')
})


router.get('/read/all', async(req,res)=>{


    try{
    const currencies = await Currency.find({});
    if (!currencies) return res.status(400).send('No currencies found');

    res.send(currencies)
    console.log('got all currencies')
    }
    catch(err){
        console.log(err)
    }


})


router.delete('/delete',async(req,res)=>{

    const currency = await Currency.findOneAndDelete({
        currencyId : req.body.currencyId
    })

    if (!currency) return res.status(400).send('Ooops Something went wrong!')

    res.send(`You deleted currency : ${req.body.currencyId}`)



})






module.exports = router;


