import React, { Component, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
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
        console.log(error);
      }); //
  }

  useEffect(() => {
    console.log(user);
    getItemsId();
  }, []);

  return (
    <div className="container-fluid">
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Vendi i Lindjes</h6>
          </div>
          <div class="card-body">
          <div class="col-md-1 mt-3">
            <AddBirthplace />
          </div>
            <Table responsive="sm" className="mt-3">
              <thead>
                <tr>
                  <th>Emri Vendit te Lindjes</th>
                  <th>Modifiko</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => {
                  return (
                    <BirthplaceItems
                      key={(d.cityId)}
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

export default Birthplace;