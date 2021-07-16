import React, { Component, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AddStudent from "./AddStudent";
import api from "../../../AxiosCall";
import { useCrudContext } from "../../../providers/CrudProvider";
import { useAppContext } from "../../../providers/AppProvider";
import PostGrades from "./PostGrades";
import { format } from "date-fns";

function HomeworkStudent() {
  const { user } = useAppContext();
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const [students, setStudents] = useState([]);
  const { data, dispatchCrud } = useCrudContext();
  const [homework, setHomework] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    await api
      .get("/Homework", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
          console.log(res.data);
        setHomework(res.data);
        // dispatchCrud({ type: "init", payload: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
          <div className="container-fluid">
          <div className="row">

      {homework.map((d) => {
          console.log(d);
        return (
              <div className="col-xl-4 mb-4">
                <div className="card border-left-primary shadow h-100 py-2 my-4" >
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="h4 text-xs mb-1">
                            Lenda: <span className="h5 text-primary font-weight-bold">{d.subject.subjectName}</span>
                        </div>
                        <div className="h4 text-xs mb-1">
                            Ligjeruesi: <span className="h5 text-primary font-weight-bold">{d.professor.firstName} {d.professor.lastName}</span>
                        </div>
                        <div classNameName="h4 mb-0 font-weight-bold text-gray-800">
                            Pershkrim: <span className=" mb-0 font-weight-bold text-gray-800">{d.description}</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        );
      })}
          </div>
          </div>
      
    </>
  );
}
export default HomeworkStudent;
