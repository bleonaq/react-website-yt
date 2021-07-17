import React, { Component, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AddCity from "./AddCity";
import { Button, ButtonToolbar, Modal, Row, Col, Form } from "react-bootstrap";
import { EditCity } from "./EditCity";
import api from "../../../AxiosCall";
import CityItem from "./CityItem";
import { useCrudContext } from "../../../providers/CrudProvider";
import { useAppContext } from "../../../providers/AppProvider";

function City() {
  const { user } = useAppContext();
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const [cities, setCities] = useState([]);
  const { data, dispatchCrud } = useCrudContext();
  useEffect(() => {
    getItems();
  }, []);
  const getItems = async () => {
    await api
      .get("/Administration/getAllCities")
      .then((res) => {
        dispatchCrud({ type: "init", payload: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Cities</h6>
          </div>
          <div class="card-body">
            <div class="col-md-1 mt-3">
              <AddCity />
            </div>
            <Table responsive="sm" className="mt-3">
              <thead>
                <tr>
                  <th>City Name</th>
                  <th style={{ width: "20%" }}>Modify</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => {
                  return <CityItem key={d.cityId} {...d} />;
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default City;
