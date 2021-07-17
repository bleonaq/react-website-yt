import React, { Component, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AddBirthplace from "./AddBirthplace";
import { Button, ButtonToolbar, Modal, Row, Col, Form } from "react-bootstrap";
import api from "../../../AxiosCall";
import BirthplaceItems from "./BirthplaceItems";
import { useCrudContext } from "../../../providers/CrudProvider";
import { useAppContext } from "../../../providers/AppProvider";
import { useParams } from "react-router-dom";
import BirthplaceList from "./BirthplaceList";
function Birthplace() {
  const { user } = useAppContext();
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const [birthplaces, setBirthplaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState();
  const { data, dispatchCrud } = useCrudContext();

  const getCities = async () => {
    await api
      .get("/Administration/getAllCities")
      .then((res) => {
        setCities(res.data);
        setCityId(res.data[0].cityId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onHandleChangeCity = (e) => {
    const value = e.target.value;
    const getItems = async () => {
      await api
        .get("/Administration/getBirthplaceByCity/" + value)
        .then((res) => {
          setBirthplaces(res.data);
          dispatchCrud({ type: "init", payload: res.data });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    setCityId(value);
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div className="container-fluid">
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Birthplaces</h6>
          </div>
          <div className="card-body">
            <div className="col-md-1 mt-3">
              <AddBirthplace />
            </div>
            <div className="col-md-3 mt-3">
              <Form.Control
                as="select"
                onChange={onHandleChangeCity}
                {...cityId}
              >
                {cities.map((city) => {
                  return (
                    <option value={city.cityId} key={city.cityId}>
                      {city.cityName}
                    </option>
                  );
                })}
              </Form.Control>
            </div>
            <BirthplaceList cityId={cityId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Birthplace;
