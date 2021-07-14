import React, { Component, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import api from "../../../AxiosCall";
import { useCrudContext } from '../../../providers/CrudProvider';

function AddSubject() {

    const { register, handleSubmit, reset } = useForm();
    const [show, setShow] = useState(false);
    const { dispatchCrud } = useCrudContext();
    const onHandleSubmit = (data) => {

        api.post('/Subject/subjectPost', data)
            .then((data) => {
            setShow(false);
            dispatchCrud({ type: 'insert', payload: data.data });
             reset({ subjectName: "" })
    }).catch((error) => {
        console.log("error", error);

    })
}

return(
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
                    <Modal.Title>Regjistro Lenden</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onHandleSubmit)}>
                        <Form.Group>
                            <Form.Label>Emri i Lendes</Form.Label>
                            <Form.Control type="text" placeholder="Emri i lendes"
                                {...register("subjectName", { required: true, maxLength: 150 })} />
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
export default AddSubject;





