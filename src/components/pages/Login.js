
import React from 'react'
import '../../login.css';
import {TextField} from '@material-ui/core';
import {Link} from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Button } from 'react-bootstrap'
import { Divider } from '@material-ui/core';

const Login=()=> {
    return(
        <div className="app">
        <div> 
            <div className="icon">
                <div className="icon_class">
                    <PersonAddIcon fontSize="large"/>
                </div>
                <div className="text">Log in</div>
            </div>


              <div className="row m-2">
              <TextField id="email" className="p-2" type="text" variant="outlined" label="Enter Email" fullWidth/>
              <TextField id="Pasword" className="p-2" type="text" variant="outlined" label="Enter Password" fullWidth style={{marginTop:"10px"}}/>
              <FormControlLabel
              control={
                  <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small"/>}
                  name="checkedI"
                  />
              }
              label="Remember me"
              />
             <Button variant="cotained" color="primary" fullWidth>Log in</Button>
              </div>
              <Divider variant="middle"/>
              <p className="text-center">
                  <Link to="signin" className="text-black-50">
                      <h5>Create Account</h5>
                  </Link>
              </p>
        </div>
        </div>
    )

}
export default Login
