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

            <div className="container-fluid">
              <div className="col-xl-8 col-lg-7">
                <div className="card shadow mb-4">
                  <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Profesoret</h6>
                  </div>
                  <div className="col-md-1 mt-3">
                  <AddProfessor />
                  </div>
                  <div class="card-body">
                    <Table responsive="sm" className="mt-3">
                      <thead>
                        <tr>
                          <th>Emri</th>
                          <th>Mbiemri</th>
                          <th>Modifiko</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((d) => {
                          return (
                            <ProfessorItem
                              key={(d.professorId, d.birthplaceId, d.cityId)}
                              {...d}
                            />
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
      

    )
}
export default Professor;


