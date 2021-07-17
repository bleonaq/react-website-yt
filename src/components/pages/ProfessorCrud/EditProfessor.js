import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useCrudContext } from "../../../providers/CrudProvider";
import api from "../../../AxiosCall";

import { useForm } from "react-hook-form";

function EditProfessor({
  show,
  professorId,
  firstName,
  lastName,
  personalNo,
  birthDate,
  genderId,
  birthplaceId,
  cityId,
  phoneNumber,
  email,
  handleClose,
}) {
  const { dispatchCrud } = useCrudContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      professorId: professorId,
      firstName: firstName,
      lastName: lastName,
      personalNo: personalNo,
      birthDate: birthDate,
      genderId: genderId,
      birthplaceId: birthplaceId,
      cityId: cityId,
      phoneNumber: phoneNumber,
      email: email,
    },
  });

  const onHandleSubmit = (data) => {
    api
      .put("/Professor/ProfessorPut/" + professorId, data)
      .then((data) => {
        dispatchCrud({ type: "edit", payload: data.data });
        handleClose();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Professor Modify</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onHandleSubmit)}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                {...register("firstName", { required: true, maxLength: 150 })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Parent Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Parent Name"
                {...register("parentName", { required: true, maxLength: 150 })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Surname"
                {...register("lastName", { required: true, maxLength: 150 })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Personal Num</Form.Label>
              <Form.Control
                type="text"
                placeholder="Personal Num"
                {...register("personalNo", { required: true, maxLength: 150 })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                type="text"
                placeholder="Birthdate"
                {...register("birthDate", { required: true, maxLength: 150 })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Num</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Num"
                {...register("phoneNumber", { required: true, maxLength: 150 })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                {...register("email", { required: true, maxLength: 150 })}
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

export default EditProfessor;
