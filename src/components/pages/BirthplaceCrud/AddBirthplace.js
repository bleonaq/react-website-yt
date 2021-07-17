import { LocationCityOutlined } from "@material-ui/icons";
import React, { Component, useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import api from "../../../AxiosCall";
import { useCrudContext } from "../../../providers/CrudProvider";

function AddBirthplace() {
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(0);
  const { dispatchCrud } = useCrudContext();
  useEffect(() => {
    getItems();
  }, []);

  const onHandleSubmit = (data) => {
    api
      .post("/administration/birthPlacePost", data)
      .then((data) => {
        setShow(false);
        dispatchCrud({ type: "insert", payload: data.data });
        reset({
          birthplaceName: "",
          cityId: "",
        });
      })
      .catch((error) => {
        console.log("error ->", error);
      });
  };
  const getItems = async () => {
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
  const onHandleChangeCity = (e) => {
    const value = e.target.value;
    setCityId(value);
  };
  return (
    <>
      <Button variant="success" size="xl" onClick={() => setShow(true)}>
        Register
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Regjistro vendin e lindjes </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onHandleSubmit)}>
            <Form.Group>
              <Form.Label>Emri i vendit te lindjes</Form.Label>
              <Form.Control
                type="text"
                placeholder="Emri i vendit te lindjes"
                {...register("birthplaceName", {
                  required: true,
                  maxLength: 150,
                })}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Qyteti</Form.Label>
              <Form.Control
                as="select"
                onChange={onHandleChangeCity}
                {...register("cityId")}
              >
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
export default AddBirthplace;
