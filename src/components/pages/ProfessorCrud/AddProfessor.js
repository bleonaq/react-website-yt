import React, { Component, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import api from "../../../AxiosCall";
import { useCrudContext } from '../../../providers/CrudProvider';

function AddProfessor() {

    const { register, handleSubmit, reset } = useForm();
    const [show, setShow] = useState(false);
    const { dispatchCrud } = useCrudContext();
    const onHandleSubmit = (data) => {

        api.post('/Professor/professorPost', data)
            .then((data) => {
                setShow(false);
                dispatchCrud({ type: 'insert', payload: data.data });
                reset({
                    firstName: "",
                    parentName: "",
                    lastName: "",
                    personalNo: "",
                    birthDate: "",
                   // genderId: "",
                   // cityId: "",
                   // birthplaceId: "",
                    phoneNumber: "",
                    email: ""
                })
            }).catch((error) => {
                console.log("error", error);

            })
    }

    return (
        <>
            < Button variant="success" size="sm" onClick={() => setShow(true)}>
                Regjistro
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Regjistro Profesorin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onHandleSubmit)}>
                        <Form.Group>
                            <Form.Label>Emri i Profesorit</Form.Label>
                            <Form.Control type="text" placeholder="Emri i Profesorit"
                                {...register("firstName", { required: true, maxLength: 150 })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Emri i Prindit</Form.Label>
                            <Form.Control type="text" placeholder="Emri i Prindit"
                                {...register("parentName", { required: true, maxLength: 150 })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mbiemri i Profesorit</Form.Label>
                            <Form.Control type="text" placeholder="Mbiemri"
                                {...register("lastName", { required: true, maxLength: 150 })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Numri Personal</Form.Label>
                            <Form.Control type="text" placeholder="Numri Personal"
                                {...register("personalNo", { required: true, maxLength: 150 })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Data Lindjes</Form.Label>
                            <Form.Control type="text" placeholder="Data Lindjes"
                                {...register("birthDate", { required: true, maxLength: 150 })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Numri telefonit</Form.Label>
                            <Form.Control type="text" placeholder="Numri telefonit"
                                {...register("phoneNumber", { required: true, maxLength: 150 })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email"
                                {...register("email", { required: true, maxLength: 150 })} />
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
    )
}
export default AddProfessor;





