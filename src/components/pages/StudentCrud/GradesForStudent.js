import React, { Component, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AddStudent from "./AddStudent";
import api from "../../../AxiosCall";
import { useCrudContext } from "../../../providers/CrudProvider";
import { useAppContext } from "../../../providers/AppProvider";
import PostGrades from "./PostGrades";

function GradesForStudent() {
  const { user } = useAppContext();
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const [students, setStudents] = useState([]);
  const { data, dispatchCrud } = useCrudContext();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    await api
      .get("/Student/getStudentGrades", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setGrades(res.data);
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
            <h6 class="m-0 font-weight-bold text-primary">Grades</h6>
          </div>
          <div class="card-body">
            <Table responsive="sm" className="mt-3">
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>Professor</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((d) => {
                  return (
                    <tr key={d.studentGradesId}>
                      <td>{d.grade.value}</td>
                      <td>
                        {d.professor.firstName} {d.professor.lastName}
                      </td>
                      <td>{d.subject.subjectName}</td>
                    </tr>
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
export default GradesForStudent;
