import React, { Component, useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import api from "../../../AxiosCall";
import { useCrudContext } from "../../../providers/CrudProvider";

function AddProfessor() {
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const { dispatchCrud } = useCrudContext();
  const [birthplaces, setBirthplaces] = useState([]);
  const [birthplaceId, setBirthplaceId] = useState(0);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(0);
  const [genders, setGenders] = useState([]);
  const [genderId, setGenderId] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState([0]);
  const [paswordGenerate, setPasswordGenerate] = useState("");
  useEffect(() => {
    getItems();
  }, []);

  const onHandleSubmit = (data) => {
    api
      .post("/Professor/professorPost", data)
      .then((data) => {
        setShow(false);
        dispatchCrud({ type: "insert", payload: data.data });
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
          email: "",
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

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
  const getIteem = async () => {
    await api
      .get("/subject/getAllSubjects")
      .then((res) => {
        setSubjects(res.data);
        setSubjectId(res.data[0].subjectId);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onHandleChangeSubject = (e) => {
    const value = e.target.value;
    setSubjectId(value);
  };
  useEffect(() => {
    getIteem();
  }, []);

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
  const generatePass = () => {
    var generator = require("generate-password");

    var password = generator.generate({
      length: 16,
      numbers: true,
    });
    setPasswordGenerate(password);
  };
  return (
    <>
      <Button variant="success" size="sm" onClick={() => setShow(true)}>
        Register
      </Button>

      <Modal
        size="md"
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register Professor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="professorForm" onSubmit={handleSubmit(onHandleSubmit)}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                {...register("firstName", { required: true, maxLength: 150 })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Emri i Prindit</Form.Label>
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
              <Form.Group controllId="exampleForm.ControlSelect1">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  onChange={onHandleChangeGender}
                  {...register("genderId")}
                >
                  {genders.map((gender) => {
                    return (
                      <option value={gender.genderId} key={gender.genderId}>
                        {gender.genderName}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Group controllId="exampleForm.ControlSelect1">
                <Form.Label>Birthplace</Form.Label>
                <Form.Control
                  as="select"
                  onChange={onHandleChangeBirthplace}
                  {...register("birthplaceId")}
                >
                  {birthplaces.map((birthplace) => {
                    return (
                      <option
                        value={birthplace.birthplaceId}
                        key={birthplace.birthplaceId}
                      >
                        {birthplace.birthplaceName}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>City</Form.Label>
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
              <Form.Label>Phone Num</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Num"
                {...register("phoneNumber", { required: true, maxLength: 150 })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Group controllId="exampleForm.ControlSelect1">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  as="select"
                  onChange={onHandleChangeSubject}
                  {...register("subjectId")}
                >
                  {subjects.map((subject) => {
                    return (
                      <option value={subject.subjectId} key={subject.subjectId}>
                        {subject.subjectName}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
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
              <Form.Label>Password</Form.Label>
              <Button
                className="ml-3"
                size="sm"
                variant="success"
                type="button"
                onClick={() => generatePass()}
              >
                Generate Password
              </Button>
              <Form.Control
                value={paswordGenerate}
                type="text"
                placeholder="password"
                {...register("password", { required: true, maxLength: 150 })}
              />
            </Form.Group>
            <Button form="professorForm" variant="success" type="submit">
              Save
            </Button>
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
export default AddProfessor;
