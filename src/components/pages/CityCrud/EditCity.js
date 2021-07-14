import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useCrudContext } from "../../../providers/CrudProvider";
import api from "../../../AxiosCall";

import { useForm } from 'react-hook-form';

function EditCity({ show, cityName, cityId, handleClose }) {
    const { dispatchCrud } = useCrudContext();
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                cityId: cityId,
                cityName: cityName
            },
        });

    const onHandleSubmit = (data) => {

        api
            .put("/Administration/cityPut/" + cityId, data)
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
                    <Modal.Title>Modifikimi i qyteteve</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onHandleSubmit)}>
                        <Form.Group>
                            <Form.Label>Emri i qytetit</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Emri i qytetit"
                                {...register("cityName", { required: true, maxLength: 150 })} />
                        </Form.Group>
                        <Form.Group>
                            <Button variant="success" type="submit">
                                Ruaj
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Mbyll
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}



export default EditCity;