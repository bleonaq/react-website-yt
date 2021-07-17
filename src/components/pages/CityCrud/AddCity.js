import React, { Component, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import api from "../../../AxiosCall";
import { useCrudContext } from "../../../providers/CrudProvider";

function AddCity() {
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const { dispatchCrud } = useCrudContext();
  const onHandleSubmit = (data) => {
    api
      .post("/Administration/cityPost", data)
      .then((data) => {
        setShow(false);
        dispatchCrud({ type: "insert", payload: data.data });
        reset({ cityName: "" });
      })
      .catch((error) => {
        console.log("error ->", error);
      });
  };
  return (
    <>
      <Form.Group>
        <Button variant="success" size="xl" onClick={() => setShow(true)}>
          Register
        </Button>
      </Form.Group>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Regjistro qytet te ri</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onHandleSubmit)}>
            <Form.Group>
              <Form.Label>Emri i Qytetit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Emri i qytetit"
                {...register("cityName", { required: true, maxLength: 150 })}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="success" type="submit">
                Ruaj
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Mbyll
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCity;
