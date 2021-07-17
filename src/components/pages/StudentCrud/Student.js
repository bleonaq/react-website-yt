import React, { Component, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AddStudent from "./AddStudent";
import api from "../../../AxiosCall";
import StudentItems from "./StudentItems";
import { useCrudContext } from "../../../providers/CrudProvider";
import { useAppContext } from "../../../providers/AppProvider";
import PostGrades from "./PostGrades";

function Student() {
  const { user } = useAppContext();
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const [students, setStudents] = useState([]);
  const { data, dispatchCrud } = useCrudContext();

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    await api
      .get("/Student/getAllStudents")
      .then((res) => {
        dispatchCrud({ type: "init", payload: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="col-xl-12">
        <div className="card shadow mb-4">
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Students</h6>
          </div>
          <div class="card-body">
            <div className="col order-first">
              <AddStudent />
            </div>
            <Table responsive="sm" className="mt-3">
              <thead>
                <tr>
                  <th>Personal Num</th>
                  <th>Name</th>
                  <th>Parent Name</th>
                  <th>Surname</th>
                  <th>Phone Num</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => {
                  return (
                    <StudentItems
                      key={(d.studentId, d.birthplaceId, d.cityId)}
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
export default Student;
