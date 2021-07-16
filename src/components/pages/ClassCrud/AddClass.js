import React, { Component, useState,useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import api from "../../../AxiosCall";
import { useCrudContext } from '../../../providers/CrudProvider';

function AddClass() {

    const { register, handleSubmit, reset } = useForm();
    const [show, setShow] = useState(false);
    const { dispatchCrud } = useCrudContext();
    const [professors, setProfessors] = useState([]);
    const [professorId, setProfessorId] = useState(0);
    useEffect(() => {
        getItems();
    }, []);
    const onHandleSubmit = (data) => {


        api.post('/Classes/PostClass', data)
            .then((data) => {
                setShow(false);
                dispatchCrud({ type: 'insert', payload: data.data });
                //reset({ className: "" })
            }).catch((error) => {
                console.log("error ->", error);
            })
    }

    const getItems = async () => {
        await api
            .get("/Professor/getAllProfessors")
            .then((res) => {
                setProfessors(res.data);
                setProfessorId(res.data[0].professorId);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const onHandleChangeProfessor = (e) => {
        const value = e.target.value;
        setProfessorId(value);
      };
    
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
                    <Modal.Title>Regjistro klase te re</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onHandleSubmit)}>
                       {/* <Form.Group>
                            <Form.Label>Paralelja</Form.Label>
                            <Form.Control type="text" placeholder="Paralelja"
                                {...register("ClassName", { required: true, maxLength: 150 })} />
                       </Form.Group> */}
                        <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Professor</Form.Label>
                      <Form.Control as="select" onChange={onHandleChangeProfessor} {...register("professorId")} >
                        {professors.map((professor) => {
                          return (
                            <option value={professor.professorId} key={professor.professorId}>
                              {professor.professorName}
                            </option>
                          );
                        })}
                        </Form.Control>
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
export default AddClass;

