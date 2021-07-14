import React from 'react'
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import './SignUp.css';
import { Button } from 'react-bootstrap'
import { Divider } from '@material-ui/core';
import api from '../../../../AxiosCall';
import { useHistory } from "react-router-dom";
toast.configure();

const SignUp = () => {
    let history = useHistory();
    const Email = useInput('');
    const Password = useInput('');
    const FirstName = useInput('');
    const LastName = useInput('');
    const Address = useInput('');
    const onRegisterHandel = async (event) => {
        event.preventDefault();
        let userData = {
            Email: Email.value,
            Password: Password.value,
            FirstName: FirstName.value,
            LastName: LastName.value,
            Address: Address.value,
        };
        await api.post('/authenticate/register', userData).then(res => {
            Email.onClear();
            Password.onClear();
            FirstName.onClear();
            LastName.onClear();
            Address.onClear();
            history.push('/login');
            toast("You are now Registered. Please login!");
        }).catch(error => {
            console.log(error);
        });
    }

    function useInput(init) {
        const [value, setValue] = useState(init);
        const onHandleChange = (e) => {
            setValue(e.target.value);
        }
    
        const onHandleClear = () => {
            setValue('');
        }
        return {
            value,
            onChange: onHandleChange,
            onClear: onHandleClear
        };
    }
    return (
        <div className="app1">
            <div>
                <div className="icon">
                    <div className="icon_class">
                        <PersonAddIcon fontSize="large" />
                    </div>
                    <div className="text">Sign Up</div>
                </div>
                <form  onSubmit={onRegisterHandel}>
                    <div class Name="row m-2">
                        <div className="col-6  p-2 ">
                            <TextField id="firstname" {...FirstName} type="text" variant="outlined" label="Enter First Name" fullWidth />
                        </div>
                        <div className="col-6  p-2" style={{ marginTop: "10px" }}>
                            <TextField id="lastName" {...LastName} type="text" variant="outlined" label="Enter Last Name" fullWidth />
                        </div>
                        <div className="col-6  p-2" style={{ marginTop: "10px" }}>
                            <TextField id="address" {...Address} type="text" variant="outlined" label="Enter Address" fullWidth />
                        </div>
                    </div>
                    <div className="row m-2">
                        <TextField id="email" {...Email} className="p-2" type="text" variant="outlined" label="Enter Email" fullWidth style={{ marginTop: "10px" }} />
                        <TextField id="Pasword" {...Password} className="p-2" type="password" variant="outlined" label="Enter Password" fullWidth style={{ marginTop: "10px" }} />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                    name="checkedI"
                                />
                            }
                            label="I agree to all terms and conditions."
                        />
                        <Button variant="cotained" color="primary" type="submit">Create Account</Button>
                    </div>
                </form>
                <Divider variant="middle" />
                <p className="text-center">
                    <Link to="login" className="text-black-50">
                        <h5>Already have an Account?</h5>
                    </Link>
                </p>



            </div>
        </div>
    )

}
export default SignUp;