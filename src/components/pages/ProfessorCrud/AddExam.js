import React, { Component, useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import api from "../../../AxiosCall";
import { useCrudContext } from "../../../providers/CrudProvider";
import { useAppContext } from "../../../providers/AppProvider";

function AddExam() {
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const { dispatchCrud } = useCrudContext();
  const { user } = useAppContext();

  const onHandleSubmit = (data) => {
    api
      .post("/Exams/examPost", data, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((data) => {
        setShow(false);
        reset({
          description: "",
          dateOfRetention: "",
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <Button variant="success" size="sm" onClick={() => setShow(true)}>
        Regjistro
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onHandleSubmit)}>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                {...register("description", { required: true, maxLength: 150 })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date Of Retention</Form.Label>
              <Form.Control
                type="text"
                placeholder="Date Of Retention"
                {...register("dateOfRetention", {
                  required: true,
                  maxLength: 150,
                })}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="success" type="submit">
                Save
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Exit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AddExam;
