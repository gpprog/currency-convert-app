import { useState } from "react";
import axios from 'axios';
import { Button,InputLabel,OutlinedInput,FormControl,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@material-ui/core";
import React from 'react';


const AddRates = ({token,currencies,isGuest}) => {

  const [open, setOpen] = React.useState(false);
  const [newCurrency,setNewCurrency] = useState('');
  const [rates,setRates] = useState('');
  const loginMessage = 'Please login to add more currencies and rates!'

  const handleBase = (e)=>{
    let newCurrency = e.target.value;
    setNewCurrency(newCurrency);

 }

 const handleRates = (e)=>{

    const id = e.target.id; 
    const value = e.target.value;
    localStorage.setItem(id,value);
    const items = { ...localStorage };
    
    for (var key in items) {
         items[key] = Number(items[key]);
      }
     

    
     let ratesObj = {...items};   
     
     ratesObj[newCurrency] = 1 ;
     setRates(ratesObj)
     

 }
    

  const handleClickOpen = () => {
    
    localStorage.clear()
    setOpen(true);
  };

  const handleClose = () => {

    localStorage.clear()
    setOpen(false);
  };

  const handleAdd = async (e) =>{

        e.preventDefault();       
        if (currencies.includes(newCurrency.toUpperCase())){    
            window.alert("This currency is already in the database you can update or remove it using the proper form")

        }
        else{
                if (newCurrency){


                try{
                    let headers = { headers: { 'auth-token': token}};    
                    // let url = 'http://localhost:80/api/ratios/add';
                    let url = 'https://inky-thirsty-clutch.glitch.me/api/ratios/add';

                    
                    let body = { "base": newCurrency.toUpperCase(), "rates": rates };
                    
                    const add = await axios.post(url,body,headers);
                    let response = add.data;
                    window.alert(response)        
                    setOpen(false);
                }
                catch(err){
                    window.alert(err)
                }
                }
                else{
                    window.alert('A base currency is required... ')
                }

        }
}
    const checkOrAdd=()=>{
        if (isGuest){
            window.alert(loginMessage);            
        }
        else{
            handleAdd()
        }
    }



    return (

        <div className = "add-rates-container">

                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                   Add currencies
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add currency and rates</DialogTitle>
                    <DialogContent>
                        <DialogContentText>You can now add a new currency! Please add the relative rates as well.
                        </DialogContentText>                           
                        <form onSubmit = {checkOrAdd} autoComplete="off" className="addRates-form">
                                <FormControl required>
                                    <InputLabel variant = "outlined" htmlFor ="newCurrency">BASE</InputLabel>
                                    <OutlinedInput variant ="outlined"
                                     label = "Enter New" id ="newCurrency" onChange = {handleBase} defaultValue =''
                                      required={true} inputProps={{ maxLength: 3,style: {textTransform: 'upperCase'} }}
                                     ></OutlinedInput>
                                </FormControl>
                                


                            {currencies && currencies.map((cur)=>(
                                <FormControl required key = {cur}> 
                                    <InputLabel variant = "outlined" htmlFor={cur}>{cur}</InputLabel>
                                    <OutlinedInput onChange = {handleRates} label = {cur} id = {cur} variant ={cur} 
                                    type = "number"  defaultValue='' inputProps={{min:0,step:0.0001}}></OutlinedInput>
                                </FormControl>
                            ))}
                            <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type = "submit" color="primary">
                        Add
                    </Button>
                    </DialogActions>

                        </form>
                    </DialogContent>
                    
                </Dialog>
            
        </div>





      );
}
 
export default AddRates;