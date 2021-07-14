import React, { Component, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import AddStudent from './AddStudent';
import api from "../../../AxiosCall";
import StudentItems from './StudentItems';
import { useCrudContext } from '../../../providers/CrudProvider';
import { useAppContext } from '../../../providers/AppProvider';

function Student() {

    const { user } = useAppContext();

    const { register, handleSubmit, reset } = useForm();
    const [show, setShow] = useState(false);
    const [students, setStudents] = useState([]);
   // const[cityId,birthplaceId,genderId]=useState([];)
    const { data, dispatchCrud } = useCrudContext();
    useEffect(() => {
        console.log(user);
        getItems();
    }, []);

    const getItems = async () => {
        await api.get('/Student/getAllStudents')
            .then(res => {
                console.log(res);
                dispatchCrud({ type: 'init', payload: res.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (

        <div >
            <div>
                <AddStudent />
            </div>
            <Table responsive>
                
                    
                    <thead>
                    
                       
                    </thead>
                    
                        {data.map((d) => {
                            return <StudentItems key={d.studentId,d.birthplaceId,d.cityId} {...d} />
                        })}

                

                
            </Table>
        </div>

    )
}
export default Student;


