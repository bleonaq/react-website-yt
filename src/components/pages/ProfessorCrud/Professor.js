import React, { Component, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AddProfessor from "./AddProfessor";
import api from "../../../AxiosCall";
import ProfessorItem from "./ProfessorItem";
import { useCrudContext } from "../../../providers/CrudProvider";
import { useAppContext } from "../../../providers/AppProvider";

function Professor() {
  const { user } = useAppContext();
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const [professors, setProfessors] = useState([]);
  const { data, dispatchCrud } = useCrudContext();

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    await api
      .get("/Professor/getAllProfessors")
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
            <h6 class="m-0 font-weight-bold text-primary">Professors</h6>
          </div>
          <div class="card-body">
            <div className="col-md-1 mt-3">
              <AddProfessor />
            </div>
            <Table responsive="sm" className="mt-3">
              <thead>
                <tr>
                  <th>Personal Num</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Phone Num</th>
                  <th>Modify</th>
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
  );
}
export default Professor;
