import React from 'react'
import '../../App.css';
import {TextField} from '@material-ui/core';
import {Link} from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Button } from 'react-bootstrap'
import { Divider } from '@material-ui/core';
const Singup=()=> {
    return(
        <div>
            <div className="icon">
                <div className="icon_class"></div>
                <div className="text">Sign Up</div>
            </div>

            <div class Name="row m-2">
                <div className="col-6  p-2 ">
                <TextField id="firstname" type="text" variant="outlined" label="Enter First Name" fulWidth/>
                </div>
                <div className="col-6  p-2">
                <TextField id="firstname" type="text" variant="outlined" label="Enter Last Name" fulWidth/>   
                </div>
              </div>  

              <div className="row m-2">
              <TextField id="email" className="p-2" type="text" variant="outlined" label="Enter Email" fulWidth/>
              <TextField id="Pasword" className="p-2" type="text" variant="outlined" label="Enter Password" fulWidth/>
              <FormControlLabel
              control={
                  <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small"/>}
                  name="checkedI"
                  />
              }
              label="I agree to all terms and conditions."
              />
             <Button variant="cotained" color="primary">Create Account</Button>
              </div>
              <Divider variant="middle"/>
              <p className="text-center">
                  <Link to="\login" className="text-black-50">
                    <h5>Already have an Account?</h5> 
                  </Link>
              </p>
              
              

        </div>
    )

}
export default Singup