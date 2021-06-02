
import React from 'react'
import '../../login.css';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Button } from 'react-bootstrap'
import { Divider } from '@material-ui/core';
import api from '../../AxiosCall';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
toast.configure();

const Login = () => {
    let history = useHistory();
    const email = useInput('');
    const password = useInput('');
    const onLoginHandel = async (event) => {
        event.preventDefault();
        let userData = {
            username: email.value,
            password: password.value
        };
        await api.post('/authenticate/login', userData).then(res => {
            email.onClear();
            password.onClear();
            history.push('/');
            toast("You are logged in now " + (res.data.name));
            
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <div className="app">
            <div>
                <div className="icon">
                    <div className="icon_class">
                        <PersonAddIcon fontSize="large" />
                    </div>
                    <div className="text">Log in</div>
                </div>
                <form onSubmit={onLoginHandel}>
                    <div className="row m-2">
                        <TextField id="email" {...email} className="p-2" type="text" variant="outlined" label="Enter Email" fullWidth />
                        <TextField id="Pasword" {...password} className="p-2" type="password" variant="outlined" label="Enter Password" fullWidth style={{ marginTop: "10px" }} />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                    name="checkedI"
                                />
                            }
                            label="Remember me"
                        />
                        <Button variant="cotained" color="primary" type="submit" fullWidth>Log in</Button>
                    </div>
                </form>
                <Divider variant="middle" />
                <p className="text-center">
                    <Link to="SignUp" className="text-black-50">
                        <h5>Create Account</h5>
                    </Link>
                </p>
            </div>
        </div>
    )

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
export default Login;
