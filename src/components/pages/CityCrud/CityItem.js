import { useContext, useState } from "react";
import { Button, Table } from "react-bootstrap";
import api from "../../../AxiosCall";
import EditCity from "./EditCity";
import { useCrudContext } from "../../../providers/CrudProvider";

function CityItem({ cityId, cityName }) {
  const { data, dispatchCrud } = useCrudContext();
  const onDeleteHandle = () => {
    api
      .delete("/Administration/cityDelete/" + cityId)
      .then((info) => {
        dispatchCrud({ type: "delete", id: cityId });
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
      <td>{cityName}</td>
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
          <i className="fas fa-trash"></i> Delete
        </Button>
        <EditCity {...{ show, cityName, cityId, handleClose }}>{""}</EditCity>
      </td>
    </tr>
  );
}

export default CityItem;
