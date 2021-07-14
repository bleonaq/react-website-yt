import React, { Component, useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import api from "../../../AxiosCall";
import { useCrudContext } from '../../../providers/CrudProvider';

function AddStudent() {

    const { register, handleSubmit, reset } = useForm();
    const [show, setShow] = useState(false);
    const { dispatchCrud } = useCrudContext();
    const [birthplaces, setBirthplaces] = useState([]);
    const [birthplaceId, setBirthplaceId] = useState(0);
    const [cities, setCities] = useState([]);
    const [cityId, setCityId] = useState(0);
    const [genders, setGenders] = useState([]);
    const [genderId, setGenderId] = useState(0);
    
    useEffect(() => {
        getItems();
    }, []);

    const onHandleSubmit = (data) => {

        api.post('/Student/studentPost', data)
            .then((data) => {
                setShow(false);
                dispatchCrud({ type: 'insert', payload: data.data });
                reset({
                    firstName: "",
                    parentName: "",
                    lastName: "",
                    personalNo: "",
                    birthDate: "",
                    genderId: "",
                    cityId: "",
                    birthplaceId: "",
                    phoneNumber: "",
                    email: ""
                })
            }).catch((error) => {
                console.log("error", error);

            })
    }

    const getItems = async () => {
        await api
            .get("/administration/getAllBirthPlaces")
            .then((res) => {
                setBirthplaces(res.data);
                setBirthplaceId(res.data[0].birthplaceId);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const onHandleChangeBirthplace = (e) => {
        const value = e.target.value;
        setBirthplaceId(value);
    };

    const getItem = async () => {
        await api
            .get("/administration/getAllCities")
            .then((res) => {
                setCities(res.data);
                setCityId(res.data[0].cityId);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getItem();
    }, []);
    const onHandleChangeCity = (e) => {
        const value = e.target.value;
        setCityId(value);
    };

    const getItemss = async () => {
        await api
            .get("/administration/getAllGenders")
            .then((res) => {
                setGenders(res.data);
                setGenderId(res.data[0].genderId);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getItemss();
    }, []);
    const onHandleChangeGender = (e) => {
        const value = e.target.value;
        setGenderId(value);
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
                    <Modal.Title>Regjistro Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onHandleSubmit)}>
                        <Form.Group>
                            <Form.Label>Emri i Studentit</Form.Label>
                            <Form.Control type="text" placeholder="Emri i Studentit"
                                {...register("firstName", { required: true, maxLength: 150 })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Emri i Prindit</Form.Label>
                            <Form.Control type="text" placeholder="Emri i Prindit"
                                {...register("parentName", { required: true, maxLength: 150 })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mbiemri i Studentit</Form.Label>
                            <Form.Control type="text" placeholder="Mbiemri i Studentit"
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
                            <Form.Group controllId="exampleForm.ControlSelect1">
                                <Form.Label>Gjinia</Form.Label>
                                <Form.Control as="select" onChange={onHandleChangeGender}{...register("genderId")}>
                                    {genders.map((gender) => {
                                        return (
                                            <option value={gender.genderId} key={gender.genderId}>
                                                {gender.genderId}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Form.Group>






                        <Form.Group>
                            <Form.Group controllId="exampleForm.ControlSelect1">
                                <Form.Label>Vendi Lindjes</Form.Label>
                                <Form.Control as="select" onChange={onHandleChangeBirthplace}{...register("birthplaceId")}>
                                    {birthplaces.map((birthplace) => {
                                        return (
                                            <option value={birthplace.birthplaceId} key={birthplace.birthplaceId}>
                                                {birthplace.birthplaceName}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Qyteti</Form.Label>
                            <Form.Control as="select" onChange={onHandleChangeCity} {...register("cityId")} >
                                {cities.map((city) => {
                                    return (
                                        <option value={city.cityId} key={city.cityId}>
                                            {city.cityName}
                                        </option>
                                    );
                                })}
                            </Form.Control>
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
export default AddStudent;







