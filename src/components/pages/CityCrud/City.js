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
  //te dhenat per qdo kend qe eshte login ==)
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
        // AlertError.fire();
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Earnings Overview</h6>
            <div class="dropdown no-arrow">
              <a
                class="dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                aria-labelledby="dropdownMenuLink"
              >
                <div class="dropdown-header">Dropdown Header:</div>
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="chart-area">
              <div class="chartjs-size-monitor">
                <div class="chartjs-size-monitor-expand">
                  <div class=""></div>
                </div>
                <div class="chartjs-size-monitor-shrink">
                  <div class=""></div>
                </div>
              </div>
              <canvas
                id="myAreaChart"
                width="1037"
                height="320"
                class="chartjs-render-monitor"
              ></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default City;
