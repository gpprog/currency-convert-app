import { useEffect, useState } from 'react';
import Selector from './Selector'
import { Button, makeStyles,TextField} from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import axios from 'axios';


// use some styling for delete button
const useStyles = makeStyles({
        
    btn: {
    minWidth:40
    }
  })
  



const Converter = (props) => {
    
    //importing props
    const id = props.id
    const convertNum = props.convertNum;
    const setConvertNum = props.setConvertNum;
    const token = props.token;
    const currencies = props.currencies;
    
  

    // Declarig some basic states needed
    const[fromCurrency,setFromCurrency] = useState('');
    const[toCurrency,setToCurrency] = useState('');
    const[amount,setAmount] = useState(1);
    const[converted,setConverted] = useState(0);
    const[rate,setRate] = useState();





    // this block runs when a remove is clicked by the user and removes a converter

    const removeConverter = (e)=>{
        let clickedId = e.target.parentNode.id;
        if (!clickedId){
        clickedId = e.target.id;
        }
        
        let arr = [...convertNum];
        arr = arr.filter((item)=> item != clickedId)
        
        
        setConvertNum(arr);

       

      }


    // make requests to convert currencies

    useEffect(()=>{
        
        async function convertRates() {

            if (fromCurrency&& toCurrency){
    
    
            // const baseURL = 'http://localhost:80/api/ratios/convert'
            const baseURL = 'https://inky-thirsty-clutch.glitch.me/api/ratios/convert'
    
    
            let headers = { headers: { 'auth-token': token}};
    
    
            const body =  {
                "base": fromCurrency,
                "target": toCurrency,
                "amount": amount
            }
            const request = await axios.post(baseURL,body,headers);
    
            let result = request.data;
            
            setConverted(result) 
            }
        
             
        }
    
        convertRates()
    },[toCurrency,fromCurrency,amount,token])
    
 
    // A function to convert the given amount
    const amountHandle=(e)=>{

        let newAmount = e.target.value
        setAmount(newAmount);
        let newConverted = (newAmount*rate)
        setConverted(newConverted)
    }


    const classes = useStyles()



    return (

        <div className="converter-container">
            <TextField margin = "dense" onChange={amountHandle} label="Amount" type='number' inputProps={{min:0}}></TextField>
                <Selector from={true} fromCurrency = {fromCurrency} setFromCurrency= {setFromCurrency} token={token} currencies={currencies}  />
                <Selector  toCurrency = {toCurrency} setToCurrency={setToCurrency} token ={token}  currencies={currencies}/>
            <TextField margin = "dense"  value={converted ? converted : ''} label="Converted Amount" ></TextField>
            <Button className = {classes.btn}  id ={id} variant = "contained" size="small" onClick={removeConverter} color="secondary"><RemoveCircleIcon id={id}/></Button>
        </div>




      );
}
 

export default Converter;
