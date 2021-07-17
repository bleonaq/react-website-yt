import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import api from "../../../AxiosCall";
import EditBirthplace from "./EditBirthplace";
import { useCrudContext } from "../../../providers/CrudProvider";
function BirthplaceItems({ birthplaceId, birthplaceName, cityId }) {
  const { data, dispatchCrud } = useCrudContext();
  const onDeleteHandle = () => {
    api
      .delete("/Administration/birthplaceDelete/" + birthplaceId)
      .then((info) => {
        dispatchCrud({ type: "delete", id: birthplaceId });
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
      <td>{birthplaceName}</td>
      <td>
        <Button
          className="mr-1"
          type="button"
          variant="info"
          size="sm"
          onClick={onEditHandle}
        >
          <i class="fas fa-edit"></i> Modify
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={onDeleteHandle}
          size="sm"
        >
          <i class="fas fa-edit"></i> Delete
        </Button>
        <EditBirthplace
          {...{ show, birthplaceId, birthplaceName, cityId, handleClose }}
        >
          {""}
        </EditBirthplace>
      </td>
    </tr>
  );
}
export default BirthplaceItems;
