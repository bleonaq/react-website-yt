import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import api from "../../../AxiosCall";
import EditSubject from "./EditSubject";
import { useCrudContext } from "../../../providers/CrudProvider";
function SubjectItem({ subjectId, subjectName }) {
  const { data, dispatchCrud } = useCrudContext();
  const onDeleteHandle = () => {
    api
      .delete("/Subject/subjectDelete/" + subjectId)
      .then((info) => {
        dispatchCrud({ type: "delete", id: subjectId });
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
      <td>{subjectName}</td>
      <td>
        <Button
          className="mr-1"
          type="button"
          variant="info"
          size="sm"
          onClick={onEditHandle}
        >
          <i className="feather-edit">Modify</i>
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={onDeleteHandle}
          size="sm"
        >
          <i className="feather-trash">Delete</i>
        </Button>
        <EditSubject
          {...{
            show,
            subjectId,
            subjectName,
            handleClose,
          }}
        >
          {" "}
        </EditSubject>
      </td>
    </tr>
  );
}
export default SubjectItem;
