import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import api from "../../../AxiosCall";
import EditStudent from "./EditStudent";
import { useCrudContext } from "../../../providers/CrudProvider";
function StudentItem({
  studentId,
  firstName,
  parentName,
  lastName,
  personalNo,
  birthDate,
  genderId,
  birthplaceId,
  cityId,
  phoneNumber,
  email,
}) {
  const { data, dispatchCrud } = useCrudContext();
  const onDeleteHandle = () => {
    api
      .delete("/Student/studentDelete/" + studentId)
      .then((info) => {
        dispatchCrud({ type: "delete", id: studentId });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const onEditHandle = () => {
    setShow(true);
  };
  return (
    <tr>
      <td>{firstName}</td>

      <td>{lastName}</td>
      <td>
        <Button
          className="mr-1"
          type="button"
          variant="info"
          size="sm"
          onClick={onEditHandle}
        >
          <i className="feather-edit">Modifiko</i>
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={onDeleteHandle}
          size="sm"
        >
          <i className="feather-trash">Fshij</i>
        </Button>
        <EditStudent
          {...{
            show,
            studentId,
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
          }}
        >
          {" "}
        </EditStudent>
      </td>
    </tr>
  );
}
export default StudentItem;
