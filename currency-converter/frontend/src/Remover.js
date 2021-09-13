import {  useState ,isGuest} from "react";
import axios from 'axios';
import { Button, MenuItem, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React from 'react';



const Remover = ({token,currencies}) => {


  const [open, setOpen] = React.useState(false);
  const [base,setBase] = useState('');


  

 

  const handleClickOpen = () => {
    localStorage.clear()
    setOpen(true);
  };

  const handleClose = () => {
    localStorage.clear()    
    setOpen(false);
  };
  
  const handleBase=(e)=>{
    let base = e.target.value;
    setBase(base);
           

}
  const loginMessage ='You are logged in as a Guest, please login or register to remove a currency.'




  const handleRemove = async (e) =>{


    let headers = { headers: { 'auth-token': token}};    
    // let url = 'http://localhost:80/api/ratios/remove';
    let url = 'https://inky-thirsty-clutch.glitch.me/api/ratios/remove';        
 
    let body =  {base: base}

    if (body.base){  

   
    const remove = await axios.post(url,body,headers);
    let response = remove.data;
    window.alert(response);
    setBase('')
    setOpen(false);
    }

    else{
      window.alert('You have to select which currency to remove')
    }
    


  };
  
  const checkOrRemove =(isGuest)=>{

    if (isGuest){
      window.alert(loginMessage)
      setOpen(false);

    }
    else {
     handleRemove()
    }

  }








    return (

        <div className = "remove-rates-container">

                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Delete currencies
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Delete currency</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                    Please select a currency from the list and hit the delete button.
                    </DialogContentText>
                      <form>
                        <TextField  required onChange = {handleBase} select variant = "outlined" 
                          defaultValue = "" margin = "dense" size = "small" label = "Base" >
                          {currencies && currencies.map((cur,index)=>(
                          <MenuItem 
                            key = {cur} defaultValue ='' value={cur}>{cur}
                          </MenuItem> ))}
                        </TextField>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={checkOrRemove} color="primary">
                                Delete
                            </Button>
                        </DialogActions>

                      </form>
                    </DialogContent>
                
                </Dialog>
            
        </div>





      );
}
 
export default Remover;