import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useCrudContext } from "../../../providers/CrudProvider";
import api from "../../../AxiosCall";

import { useForm } from "react-hook-form";

function EditBirthplace({
  show,
  birthplaceName,
  birthplaceId,
  cityId,
  handleClose,
}) {
  const { dispatchCrud } = useCrudContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      birthplaceId: birthplaceId,
      birthplaceName: birthplaceName,
      cityId: cityId,
    },
  });

  const onHandleSubmit = (data) => {
    api
      .put("/Administration/birthplacePut/" + birthplaceId, data)
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
          <Modal.Title>Modifikimi i vendit te lindjes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onHandleSubmit)}>
            <Form.Group>
              <Form.Label>Birthplace name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Birthplace name"
                {...register("birthplaceName", {
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
          <Button variant="secondary" onClick={handleClose}>
            Exit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditBirthplace;
