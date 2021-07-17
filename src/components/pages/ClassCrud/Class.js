import React, { Component, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AddClass from "./AddClass";
import { Button, ButtonToolbar, Modal, Row, Col, Form } from "react-bootstrap";
//import { EditClass } from "./EditClass";
import api from "../../../AxiosCall";
import ClassItems from "./ClassItems";
import { useCrudContext } from "../../../providers/CrudProvider";
import { useAppContext } from "../../../providers/AppProvider";

function Class() {
  const { user } = useAppContext();
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const { data, dispatchCrud } = useCrudContext();
  useEffect(() => {
    getItems();
  }, []);
  const getItems = async () => {
    await api
      .get("/Classes")
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
            <h6 class="m-0 font-weight-bold text-primary">Classes</h6>
          </div>
          <div class="card-body">
            <div class="col-md-1 mt-3">
              <AddClass />
            </div>
            <Table responsive="sm" className="mt-3">
              <thead>
                <tr>
                  <th>Professor</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => {
                  console.log(d);
                  return (
                    <ClassItems
                      key={(d.classId,d.professor)}
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
  );
}
export default Class;
