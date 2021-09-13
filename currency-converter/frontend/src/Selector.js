import {TextField, MenuItem} from '@material-ui/core';
import { useEffect,useRef} from 'react';


const Selector = ({from,id,setToCurrency,setFromCurrency,token,currencies}) => {

    const reference = useRef(null);


    // If token changes selector  should get the currencies again and rerender 
    useEffect( ()=> {

        },[token])


    const selectHandle=(e)=>{

        (from ? setFromCurrency(e.target.value): setToCurrency(e.target.value) )
    }   




    return (


        <div className='selector' ref = {reference}>
            <form className = { from ? `selector_form_base ${id}`:`selector_form_target`}>                            
                <TextField 
                    className = 'selector-input'
                    onChange = {selectHandle} 
                    select variant = 'outlined' 
                    label= {from ? "From" : "To"}                
                    margin = "normal"
                    id = { from ? "From" : "To" }
                    defaultValue = ""
                    >
                    

                    { currencies && currencies.map(
                        (currency,index)=> (

                    <MenuItem   key={index}
                                value = {currency}
                                form = {`convert_form_${id}`}
                               >{currency}
                              
                                
                    </MenuItem>

                    ))}          

                </TextField>
            </form>

        </div>







    );
}
 
export default Selector;