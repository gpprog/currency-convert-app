import React,{ useState } from "react";
import axios from 'axios';
import { Button, Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@material-ui/core";
import Mode from './Mode';



const Modifier = ({token,currencies,isGuest}) => {

    const [userData,setUserData] = useState('start');
    const [base,setBase] = useState('');


    // callbacks to pass data from Mode child component
    const callRates = (ratesObj)=>{

        setUserData(ratesObj)        
        

    };

    const callBase = (base)=>{
        setBase(base)

    }
    

    // modify dialog handlers
  const [open, setOpen] = React.useState(false);
 
    
  const handleClickOpen = () => {

    localStorage.clear()
    setOpen(true);
  };


  const handleClose = () => {

    localStorage.clear()
    setOpen(false);
  };



  // Update oparation handler
  const handleUpdate = async(e)=>{
    if(!isGuest){

            try{

                let headers = { headers: { 'auth-token': token}};    
                // let url = 'http://localhost:80/api/ratios/update';
                let url = 'https://inky-thirsty-clutch.glitch.me/api/ratios/update';        
     
                let body = { "base": base, "rates": userData };

                if (body.base&&body.rates){

                const update = await axios.post(url,body,headers);
                let response = update.data;
                window.alert(response);


                setOpen(false)
                }
                else{
                    window.alert('You have to select a base currency and type the relative ratios.')
                }

            }catch(err){

                window.alert(err)
            };
    }
    else{
        window.alert("You are logged as a Guest, login or register to update currencies' rates!")
    }
    setOpen(false)
    
  };



    return (

        <div className = "modifier-container">          

            <form>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Update rates
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle id="form-dialog-title">Update Ratios</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                    You can now enter new rates for each currency. Choose a base currency and the updated rates.
                    </DialogContentText>                      
                       <Mode currencies = {currencies} callRates = {callRates} callBase ={callBase} />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary">
                        Update
                    </Button>
                    </DialogActions>
                </Dialog>
            </form>

        </div>

      );
}
 
export default Modifier;