import React, { Component, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import AddProfessor from './AddProfessor';
import api from "../../../AxiosCall";
import ProfessorItem from './ProfessorItem';
import { useCrudContext } from '../../../providers/CrudProvider';
import { useAppContext } from '../../../providers/AppProvider';

function Professor() {

    const { user } = useAppContext();

    const { register, handleSubmit, reset } = useForm();
    const [show, setShow] = useState(false);
    const [professors, setProfessors] = useState([]);
   // const[cityId,birthplaceId,genderId]=useState([];)
    const { data, dispatchCrud } = useCrudContext();
    useEffect(() => {
        console.log(user);
        getItems();
    }, []);

    const getItems = async () => {
        await api.get('/Professor/getAllProfessors')
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
                <AddProfessor />
            </div>
            <Table responsive>
                
                    
                    <thead>
                    
                       
                    </thead>
                    
                        {data.map((d) => {
                            return <ProfessorItem key={d.professorId,d.birthplaceId,d.cityId} {...d} />
                        })}

                

                
            </Table>
        </div>

    )
}
export default Professor;


