import { TextField,MenuItem, FormControl,OutlinedInput,InputLabel} from '@material-ui/core';

const Mode = ({currencies,callRates,callBase}) => {

    
    
    const handleChange = (e)=>{
    
       const id = e.target.id; 
       const value = e.target.value;
       localStorage.setItem(id,value);
       const items = { ...localStorage };
       
       for (var key in items) {
            items[key] = Number(items[key]);
         }
        


        let ratesObj = {...items};

        callRates(ratesObj)        
      

    }


    const handleBase=(e)=>{
        let base = e.target.value;
        callBase(base)       

    }




    return  (
        <div className ="mode-container">
            <form id = "mode-form"  autoComplete="off">               

                <TextField  select variant = "outlined" defaultValue = ""

                 margin = "dense" size = "small" label = "Base" onChange = {handleBase}>
                    {currencies.map((cur,index)=>(
                        <MenuItem key = {cur} value = {cur}>{cur}</MenuItem>
                    ))}
                </TextField>
            

            {
            

             currencies.map((cur,index) =>             
             
             (
                <FormControl variant = "outlined" key ={index}>
                    <InputLabel variant = "outlined" htmlFor={cur}>{cur}</InputLabel>
                    <OutlinedInput  label = {cur} onChange= {handleChange} margin = "dense" variant= "outlined" id={cur}
                     defaultValue={''} type = "number" required={true} inputProps={{min:0}}/>                
              </FormControl>
               
                
                ))
            }   

                

            </form>

        </div>
        





     );
}
 
export default Mode;