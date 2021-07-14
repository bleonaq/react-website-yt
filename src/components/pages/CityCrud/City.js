import React, { Component, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import AddCity from './AddCity';
import { Button, ButtonToolbar, Modal, Row, Col, Form } from 'react-bootstrap';
import { EditCity } from './EditCity';
import api from "../../../AxiosCall";
import CityItem from './CityItem';
import { useCrudContext } from '../../../providers/CrudProvider';
import { useAppContext } from '../../../providers/AppProvider';


function City() {
    const { user } = useAppContext();
   //te dhenat per qdo kend qe eshte login ==) 
    const { register, handleSubmit, reset } = useForm();
    const [show, setShow] = useState(false);
    const [cities, setCities] = useState([]);
    const { data, dispatchCrud } = useCrudContext();
    useEffect(() => {
        console.log(user);
        getItems();
    }, []);
    const getItems = async () => {
        await api.get('/Administration/getAllCities')
            .then(res => {
                console.log(res);
                dispatchCrud({ type: 'init', payload: res.data })
            })
            .catch(error => {
                // AlertError.fire();
                console.log(error);
            });
    }

    return (
        
        <div >
            <div>
                <AddCity />
            </div>
            <Table responsive>
                <table class="table table-sm">


                <thead>
                    <tr>

                        <th>Emri Qytetit</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((d) => {
                        return <CityItem key={d.cityId} {...d} />
                    })}

                </tbody>
                </table>


            </Table>
        </div>

    )
}
export default City;