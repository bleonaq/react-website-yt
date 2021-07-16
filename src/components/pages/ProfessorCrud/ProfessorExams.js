import React, { Component, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import api from "../../../AxiosCall";
import { useCrudContext } from "../../../providers/CrudProvider";
import { useAppContext } from "../../../providers/AppProvider";
import { format } from "date-fns";
import AddExam from "./AddExam";
function StudentExams() {
  const { user } = useAppContext();
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const { data, dispatchCrud } = useCrudContext();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    await api
      .get("/Exams/professor", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setExams(res.data);
        // dispatchCrud({ type: "init", payload: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
        <div className="container-fluid">
      <div className="col-xl-12">
        <div className="card shadow mb-4">
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Provimet</h6>
          </div>

          <div class="card-body">
            <div className="col-md-1 mt-3">
             <AddExam/>
            </div>
            <Table responsive="sm" className="mt-3">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                  
                {exams.map((d) => {
                    return(
                    <tr>
                        <td>{d.description}</td>
                        <td>{d.dateOfRetention}</td>
                    </tr>
                    );
                })}
                  
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
      
    </>
  );
}
export default StudentExams;
