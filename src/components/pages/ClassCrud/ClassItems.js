import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import api from "../../../AxiosCall";
//import EditClass from './EditClass';
import { useCrudContext } from "../../../providers/CrudProvider";
function ClassItems({ classId, professorId }) {
    console.log();
    const { data, dispatchCrud } = useCrudContext();
    const onDeleteHandle = () => {

        api
            .delete("/Classes/DeleteClass/" + classId)
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

            


            <td>
              {/*  <Button
                    className="mr-1"
                    type="button"
                    variant="info"
                    size="sm"
                    onClick={onEditHandle}
                >
                    <i className="feather-edit">Modifiko</i>
              </Button> */}
                <Button
                    type="button"
                    variant="danger"
                    onClick={onDeleteHandle}
                    size="sm"
                >
                    <i className="feather-trash">Fshij</i>
                </Button>
               {/*  <EditClass {...{ show, classId, className, professorId, handleClose }}
                >
                    {""}
                </EditClass> */}
            </td>
        </tr>


    );
}
export default ClassItems;
