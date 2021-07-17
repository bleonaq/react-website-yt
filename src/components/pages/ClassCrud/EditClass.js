import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useCrudContext } from "../../../providers/CrudProvider";
import api from "../../../AxiosCall";

import { useForm } from "react-hook-form";

function EditClass({ show, className, classId, handleClose }) {
  const { dispatchCrud } = useCrudContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      classId: classId,
      className: className,
    },
  });

  const onHandleSubmit = (data) => {
    api
      .put("/Classes" + classId, data)
      .then((data) => {
        dispatchCrud({ type: "edit", payload: data.data });
        handleClose();
      })
      .catch((error) => {
        console.log("error->", error);
      });
  };
  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Class Modify</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onHandleSubmit)}>
            <Form.Group>
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="text"
                placeholder="Class Name"
                {...register("className", { required: true, maxLength: 150 })}
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
          <Button variant="secondary" onClick={handleClose}>
            Exit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditClass;
