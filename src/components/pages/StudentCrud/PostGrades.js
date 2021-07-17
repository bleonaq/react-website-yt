import React, { Component, useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import api from "../../../AxiosCall";
import { useCrudContext } from "../../../providers/CrudProvider";
function PostGrades() {
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const { dispatchCrud } = useCrudContext();
  const [grades, setGrades] = useState([]);
  const [gradeId, setGradeId] = useState(0);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState(0);
  const [professors, setProfessors] = useState([]);
  const [professorId, setProfessorId] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState(0);

  const onHandleSubmit = (data) => {
    api
      .post("/Student/studentGradePost", data)
      .then((data) => {
        setShow(false);
        dispatchCrud({ type: "insert", payload: data.data });
        reset({
          studentId: "",
          gradeId: "",
          professorId: "",
          subjectId: "",
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getStudents = async () => {
    await api
      .get("/Student/getAllStudents")
      .then((res) => {
        setStudents(res.data);
        setStudentId(res.data[0].studentId);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onHandleChangeStudent = (e) => {
    const value = e.target.value;
    setStudentId(value);
  };


  const getGrades = async () => {
    await api
      .get("/Grades")
      .then((res) => {
        setGrades(res.data);
        setGradeId(res.data[0].gradeId);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onHandleChangeGrade = (e) => {
    const value = e.target.value;
    setGradeId(value);
  };

  const getProfessors = async () => {
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
 
  const getSubjects = async () => {
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

  useEffect(() => {
    getStudents();
    getGrades();
    getProfessors();
    getSubjects();
  }, []);
  const onHandleChangeSubject = (e) => {
    const value = e.target.value;
    setSubjectId(value);
  };

  return (
    <>
      <Button variant="success" size="sm" onClick={() => setShow(true)}>
        Register
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register Grade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onHandleSubmit)}>
            <Form.Group>
              <Form.Group controllId="exampleForm.ControlSelect1">
                <Form.Label>Student</Form.Label>
                <Form.Control
                  as="select"
                  onChange={onHandleChangeStudent}
                  {...register("studentId")}
                >
                  {students.map((student) => {
                    return (
                      <option value={student.studentId} key={student.studentId}>
                        {student.firstName} {student.lastName}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Group controllId="exampleForm.ControlSelect1">
                <Form.Label>Grade</Form.Label>
                <Form.Control
                  as="select"
                  onChange={onHandleChangeGrade}
                  {...register("gradeId")}
                >
                  {grades.map((grade) => {
                    return (
                      <option value={grade.gradeId} key={grade.gradeId}>
                        {grade.value}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Group controllId="exampleForm.ControlSelect1">
                <Form.Label>Professor</Form.Label>
                <Form.Control
                  as="select"
                  onChange={onHandleChangeProfessor}
                  {...register("professorId")}
                >
                  {professors.map((professor) => {
                    return (
                      <option
                        value={professor.professorId}
                        key={professor.professorId}
                      >
                        {professor.firstName} {professor.lastName}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
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
              <Form.Group>
                <Button variant="success" type="submit">
                  Save
                </Button>
              </Form.Group>
            </Form.Group>
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
export default PostGrades;
