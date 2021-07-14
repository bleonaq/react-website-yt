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
                <table class="table table-sm">
                    <tbody>
                    <thead>
                        <tr>

                            <th>Emri i Profesorit</th>

                        </tr>
                        <tr>

                            <th>Emri i Prindit</th>

                        </tr>
                        <tr>

                            <th>Mbiemri i Profesorit</th>

                        </tr>
                        <tr>

                            <th>Numri Personal</th>

                        </tr>
                        <tr>

                            <th>Data Lindjes</th>

                        </tr>
                        <tr>

                            <th>Numri telefonit</th>

                        </tr>
                        <tr>

                            <th>Email</th>

                        </tr>
                    </thead>
                    
                        {data.map((d) => {
                            return <ProfessorItem key={d.professorId} {...d} />
                        })}

                    </tbody>

                </table>
            </Table>
        </div>

    )
}
export default Professor;


