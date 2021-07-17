import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import api from "../../../AxiosCall";
//import EditClass from './EditClass';
import { useCrudContext } from "../../../providers/CrudProvider";
function ClassItems({ classId, professor }) {
  console.log(classId);
  const { data, dispatchCrud } = useCrudContext();
  const onDeleteHandle = () => {
    api
      .delete("/Classes/" + classId)
      .then((info) => {
        dispatchCrud({ type: "delete", id: classId });
      })
      .catch((error) => {
        console.log("error->", error);
      });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const onEditHandle = () => {
    setShow(true);
  };
  return (
    <tr>
      <td>{professor.firstName} {professor.lastName}</td>
      <td>
        <Button
          type="button"
          variant="danger"
          onClick={onDeleteHandle}
          size="sm"
        >
          <i className="feather-trash">Fshij</i>
        </Button>
      </td>
    </tr>
  );
}
export default ClassItems;
