import React, { Component, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import AddSubject from './AddSubject';
import api from "../../../AxiosCall";
import SubjectItem from './SubjectItem';
import { useCrudContext } from '../../../providers/CrudProvider';
import { useAppContext } from '../../../providers/AppProvider';

function Subject() {

const {user}= useAppContext();

    const{register,handleSubmit,reset}=useForm();
    const[show,setShow]=useState(false);
    const[subjects,setSubjects]=useState([]);
    const{data,dispatchCrud} =useCrudContext();
    useEffect(() => {
        console.log(user);
        getItems();
    }, []);
    
    const getItems = async () => {
        await api.get('/Subject/getAllSubjects')
        .then(res => {
            console.log(res);
            dispatchCrud({type:'init',payload: res.data})
        })
        .catch(error =>{
        console.log(error);
         });
}

return(

    <div >
         <div>
            <AddSubject/>
        </div>
    <Table responsive>
    <table class ="table table-sm">
        
        <thead>
            <tr>
            
                <th>Emri i Lendes</th>
                
            </tr>
        </thead>
        <tbody>
            {data.map((d) => {
                return <SubjectItem key={d.subjectId} {...d} />
            })}

        </tbody>

    </table>
    </Table>
</div>

)
}
export default Subject;


