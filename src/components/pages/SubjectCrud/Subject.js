import React, { Component, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AddSubject from "./AddSubject";
import api from "../../../AxiosCall";
import SubjectItem from "./SubjectItem";
import { useCrudContext } from "../../../providers/CrudProvider";
import { useAppContext } from "../../../providers/AppProvider";

function Subject() {
  const { user } = useAppContext();
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const { data, dispatchCrud } = useCrudContext();

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    await api
      .get("/Subject/getAllSubjects")
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
            <h6 class="m-0 font-weight-bold text-primary">Subjects</h6>
          </div>
          <div class="card-body">
            <div className="col-md-1 mt-3">
              <AddSubject />
            </div>
            <Table responsive="sm" className="mt-3">
              <thead>
                <tr>
                  <th>Subject Name</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => {
                  return <SubjectItem key={d.subjectId} {...d} />;
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Subject;
