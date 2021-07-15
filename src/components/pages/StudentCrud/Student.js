import React, { Component, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AddStudent from "./AddStudent";
import api from "../../../AxiosCall";
import StudentItems from "./StudentItems";
import { useCrudContext } from "../../../providers/CrudProvider";
import { useAppContext } from "../../../providers/AppProvider";

function Student() {
  const { user } = useAppContext();

  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const [students, setStudents] = useState([]);
  // const[cityId,birthplaceId,genderId]=useState([];)
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
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Studentet</h6>
          </div>
          <div className="col-md-1 mt-3">
          <AddStudent />
          </div>
          <div class="card-body">
            <Table responsive="sm" className="mt-3">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
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
    // <div >
    //     <div>
    //     </div>
    //     <Table responsive>

    //             <thead>

    //             </thead>

    //                 {data.map((d) => {
    //                     return <StudentItems key={d.studentId,d.birthplaceId,d.cityId} {...d} />
    //                 })}

    //     </Table>
    // </div>
  );
}
export default Student;
