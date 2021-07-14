import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import api from "../../../AxiosCall";
import EditProfessor from './EditProfessor';
import { useCrudContext } from "../../../providers/CrudProvider";
function ProfessorItem({ professorId, firstName, parentName, lastName, personalNo, birthDate, genderId, birthplaceId, cityId, phoneNumber, email }) {
    console.log(firstName, parentName, lastName, personalNo, birthDate, phoneNumber, email);
    const { data, dispatchCrud } = useCrudContext();
    const onDeleteHandle = () => {

        api
            .delete("/Professor/professorDelete/" + professorId)
            .then((info) => {
                dispatchCrud({ type: "delete", id: professorId });
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
        <Table striped bordered hover size="sm">
            
            <tr>
               
                <td style={{ width: "50%" }}>{firstName}</td>
                
                <td style={{ width: "50%" }}>{lastName}</td>
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
                    <EditProfessor {...{ show, professorId, firstName, lastName, personalNo, birthDate, genderId, birthplaceId, cityId, phoneNumber, email, handleClose }}> </EditProfessor>
                </td>
                
            </tr>
            
        </Table >
    );
}
export default ProfessorItem;
