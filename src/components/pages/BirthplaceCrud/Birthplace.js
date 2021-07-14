import React, { Component, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
//import { Component } from 'react';
import { useForm } from 'react-hook-form';
import AddBirthplace from './AddBirthplace';
import { Button, ButtonToolbar, Modal, Row, Col, Form } from 'react-bootstrap';
import api from "../../../AxiosCall";
import BirthplaceItems from './BirthplaceItems';
import { useCrudContext } from '../../../providers/CrudProvider';
import { useAppContext } from '../../../providers/AppProvider';
import { useParams } from 'react-router-dom';





function Birthplace() {


    const { user } = useAppContext();
    const { register, handleSubmit, reset } = useForm();
    const [show, setShow] = useState(false);
    const [birthplaces, setBirthplaces] = useState([]);
    const [cityId] = useState([])
    const { data, dispatchCrud } = useCrudContext();

    useEffect(() => {
        console.log(user);
        getItems();
    }, []);
    const getItems = async () => {
        await api.get('/Administration/getAllBirthPlaces')
            .then(res => {
                console.log(res);
                dispatchCrud({ type: 'init', payload: res.data })
            })
            .catch(error => {
                // AlertError.fire();
                console.log(error);
            });


    }



    const getItemsId = async () => {
        await api.get('/Administration/getAllBirthPlaces/' + cityId)
            .then(res => {
                console.log(res);
                dispatchCrud({ type: 'init', payload: res.data })
            })
            .catch(error => {
                // AlertError.fire();
                console.log(error);
            }); //


    }
    useEffect(() => {
        console.log(user);
        getItemsId();
    }, []);










    return (

        <div>
            <div>
                <AddBirthplace />
            </div>
            <Table responsive>




                <thead>
                    <tbody>
                        <tr>

                            <th>Emri i vendit te lindjes</th>

                        </tr>
                    </tbody>
                </thead>

                {data.map((d) => {
                    return <BirthplaceItems key={d.birthplaceId, d.cityId} {...d} />
                })}

             
                
                


            </Table>
        </div >

    )
}


export default Birthplace;