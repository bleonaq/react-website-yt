import React from "react";
import "../../../App.css";
import Navbar from "../Nav-Button/Navbar";
import TopNav from "../Nav-Button/TopNav";
import { useAppContext } from "../../../providers/AppProvider";
import { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import api from "../../../AxiosCall";
import { useForm } from "react-hook-form";

function Home() {
  const { user, dispatch } = useAppContext();
  const [firstTime, setFirstTime] = useState(true);
  const [show, setShow] = useState(false);
  let password = sessionStorage.getItem("password");
  const lPassword = password;
  const nPassword = useInput("");
  const { register, setValue, handleSubmit } = useForm();

  const check = async () => {
    await api
      .get("/authenticate/firstTime", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        if (!res.data) {
          setShow(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    check();
  }, []);

  const onHandleSubmit = (data) => {
    console.log(data);
    api
      .post("/authenticate/changePassword", data, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((data) => {
        setShow(false);
        sessionStorage.removeItem("password");
      })
      .catch((error) => {
        console.log("error ->", error);
      });
  };

  return (
    <>
      <Modal
        size="md"
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Regjistro </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onHandleSubmit)}>
            <Form.Group>
              <Form.Label>Fjalekalimi</Form.Label>
              <Form.Control
                value={password}
                type="hidden"
                {...register("currentPassword", { required: true, maxLength: 150 })}
              />
              <Form.Control
                type="text"
                placeholder="Fjalëkalimi"
                {...register("newPassword", { required: true, maxLength: 150 })}
              />
            </Form.Group>
            <Button type="submit">Ruaj</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
function useInput(init) {
  const [value, setValue] = useState(init);
  return {
    value,
  };
}
export default Home;
