import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import api from "../../../AxiosCall";
import EditBirthplace from './EditBirthplace';
import { useCrudContext } from "../../../providers/CrudProvider";
function BirthplaceItems({ birthplaceId, birthplaceName,cityId }) {
    console.log(birthplaceName);
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
        <Table striped bordered hover size="sm">
            <tbody>
            <tr>
                
                <td style={{ width: "50%" }}>{birthplaceName}</td>
                
                
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
                    <EditBirthplace {...{ show, birthplaceId, birthplaceName,cityId, handleClose }}> </EditBirthplace>
                </td>
            </tr>
            </tbody>
        </Table>
    );
}
export default BirthplaceItems;
