import React, { Component, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import api from "../../../AxiosCall";
import StudentItems from "./StudentItems";
import { useCrudContext } from "../../../providers/CrudProvider";
import { useAppContext } from "../../../providers/AppProvider";
import PostGrades from "./PostGrades";

function StudentGrades() {
  const { user } = useAppContext();
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const [grades, setGrades] = useState([]);
  const { data, dispatchCrud } = useCrudContext();

  // dispatchCrud({ type: "init", payload: res.data });

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    await api
      .get("/Professor/getProfessorPostedGrades", {headers: { Authorization: `Bearer ${user.token}` }})
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
            <h6 class="m-0 font-weight-bold text-primary">Grades</h6>
          </div>
          <div class="card-body">
            <div className="col order-second">
              <PostGrades />
            </div>
            <Table responsive="sm" className="mt-3">
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>Subject</th>
                  <th>Date Of Retention</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentGrades;
